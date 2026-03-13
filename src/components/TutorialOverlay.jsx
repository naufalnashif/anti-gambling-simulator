import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

/* ─── Layout constants ─────────────────────────────────────────── */
const TOOLTIP_W = 340;   // tooltip max-width (px)
const TOOLTIP_H = 280;   // generous height estimate
const EDGE_PAD  = 12;    // minimum gap from any viewport edge
const GAP       = 12;    // spotlight padding around element
const SCROLL_MS = 440;   // ms to wait after scrollIntoView

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

/* ─── Component ────────────────────────────────────────────────── */
const TutorialOverlay = ({ steps, onComplete, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect]   = useState(null);
  const [isVisible, setIsVisible]     = useState(false);
  const posTimer = useRef(null);
  const step = steps[currentStep];

  /* show overlay after 1.2 s */
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  /* measure target, always scroll first then wait */
  const measure = useCallback(() => {
    if (!step?.targetId) { setTargetRect(null); return; }
    const el = document.getElementById(step.targetId);
    if (!el) { setTargetRect(null); return; }
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearTimeout(posTimer.current);
    posTimer.current = setTimeout(() => {
      const e2 = document.getElementById(step.targetId);
      if (!e2) return;
      const r = e2.getBoundingClientRect();
      setTargetRect({ top: r.top, left: r.left, right: r.right, bottom: r.bottom, width: r.width, height: r.height });
    }, SCROLL_MS);
  }, [step?.targetId]);

  useEffect(() => {
    if (!isVisible) return;
    const t = setTimeout(measure, 100);
    return () => { clearTimeout(t); clearTimeout(posTimer.current); };
  }, [currentStep, isVisible, measure]);

  /* live recalc on scroll/resize */
  useEffect(() => {
    if (!isVisible || !step?.targetId) return;
    const snap = () => {
      const el = document.getElementById(step.targetId);
      if (!el) return;
      const r = el.getBoundingClientRect();
      setTargetRect({ top: r.top, left: r.left, right: r.right, bottom: r.bottom, width: r.width, height: r.height });
    };
    window.addEventListener('scroll', snap, { passive: true });
    window.addEventListener('resize', snap);
    return () => { window.removeEventListener('scroll', snap); window.removeEventListener('resize', snap); };
  }, [isVisible, step?.targetId]);

  /* click-through listener */
  useEffect(() => {
    if (!isVisible || step?.actionType !== 'click') return;
    const el = document.getElementById(step.targetId);
    if (!el) return;
    const cb = () => setTimeout(handleNext, 300);
    el.addEventListener('click', cb);
    return () => el.removeEventListener('click', cb);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, isVisible, step?.actionType, step?.targetId]);

  /* navigation */
  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      if (onStepChange) onStepChange(currentStep + 1);
      setCurrentStep(p => p + 1);
    } else {
      setIsVisible(false);
      onComplete();
    }
  }, [currentStep, steps.length, onStepChange, onComplete]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      if (onStepChange) onStepChange(currentStep - 1);
      setCurrentStep(p => p - 1);
    }
  }, [currentStep, onStepChange]);

  const handleSkip = useCallback(() => { setIsVisible(false); onComplete(); }, [onComplete]);

  if (!isVisible || !step) return null;

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  /* ── Spotlight highlight — uses massive box-shadow trick ──
     The element itself shows through; everything else darkens.
     Just a very soft white edge glow, no colored border.          */
  const spotlightStyle = targetRect ? {
    position:      'fixed',
    top:           `${clamp(targetRect.top  - GAP, 0, vh)}px`,
    left:          `${clamp(targetRect.left - GAP, 0, vw)}px`,
    width:         `${clamp(targetRect.width  + GAP * 2, 0, vw)}px`,
    height:        `${clamp(targetRect.height + GAP * 2, 0, vh)}px`,
    borderRadius:  '14px',
    pointerEvents: 'none',
    zIndex:        10001,
    /* Outer dark overlay + subtle white luminance glow at edge */
    boxShadow: [
      '0 0 0 9999px rgba(0, 0, 0, 0.76)',           // full-screen dimmer
      '0 0 0 2px rgba(255, 255, 255, 0.18)',          // thin bright rim
      '0 0 24px 6px rgba(255, 255, 255, 0.10)',        // soft halo
    ].join(', '),
    transition: 'top 0.32s ease, left 0.32s ease, width 0.32s ease, height 0.32s ease',
  } : null;

  /* ── Tooltip positioning — strictly clamped ──────────────── */
  const tooltipStyle = (() => {
    if (!targetRect) {
      return {
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: `min(${TOOLTIP_W}px, calc(100vw - ${EDGE_PAD * 2}px))`,
      };
    }

    const arrow    = 14;
    const isClick  = step?.actionType === 'click';
    const spaceBel = vh - targetRect.bottom;
    const spaceAbo = targetRect.top;
    const spaceRgt = vw - targetRect.right;
    const spaceLft = targetRect.left;

    /* For click-steps: place tooltip entirely on the side with most room */
    if (isClick) {
      const roomAbove = spaceAbo >= TOOLTIP_H + arrow + EDGE_PAD;
      const top = roomAbove
        ? clamp(targetRect.top - TOOLTIP_H - arrow, EDGE_PAD, vh - TOOLTIP_H - EDGE_PAD)
        : clamp(targetRect.bottom + arrow, EDGE_PAD, vh - TOOLTIP_H - EDGE_PAD);
      const idealL = spaceRgt >= spaceLft
        ? targetRect.right + arrow
        : targetRect.left - TOOLTIP_W - arrow;
      const left = clamp(idealL, EDGE_PAD, vw - TOOLTIP_W - EDGE_PAD);
      return {
        position: 'fixed',
        top: `${top}px`, left: `${left}px`,
        width: `min(${TOOLTIP_W}px, calc(100vw - ${EDGE_PAD * 2}px))`,
      };
    }

    /* Normal steps: below → above → vertically centred */
    const idealL = targetRect.left + targetRect.width / 2 - TOOLTIP_W / 2;
    const left   = clamp(idealL, EDGE_PAD, vw - TOOLTIP_W - EDGE_PAD);
    let top;
    if (spaceBel >= TOOLTIP_H + arrow + EDGE_PAD)
      top = clamp(targetRect.bottom + arrow, EDGE_PAD, vh - TOOLTIP_H - EDGE_PAD);
    else if (spaceAbo >= TOOLTIP_H + arrow + EDGE_PAD)
      top = clamp(targetRect.top - TOOLTIP_H - arrow, EDGE_PAD, vh - TOOLTIP_H - EDGE_PAD);
    else
      top = clamp((vh - TOOLTIP_H) / 2, EDGE_PAD, vh - TOOLTIP_H - EDGE_PAD);

    return {
      position: 'fixed',
      top: `${top}px`, left: `${left}px`,
      width: `min(${TOOLTIP_W}px, calc(100vw - ${EDGE_PAD * 2}px))`,
    };
  })();

  const isLast = currentStep === steps.length - 1;
  const pct    = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      <style>{`
        @keyframes tFadeUp {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        @keyframes tShimmer {
          from { left:-120%; }
          to   { left: 220%; }
        }
      `}</style>

      {/* Root — pointer-events:none so spotlight hole is clickable */}
      <div style={{ position:'fixed', inset:0, zIndex:10000, pointerEvents:'none' }}>

        {/* Spotlight element (box-shadow dimmer + white rim) */}
        {spotlightStyle && <div style={spotlightStyle} />}

        {/* ── Glass tooltip card ──────────────────────────── */}
        <div
          style={{
            ...tooltipStyle,
            /* Dark glass — like the reference screenshot */
            background: 'rgba(6, 6, 12, 0.90)',
            backdropFilter: 'blur(48px) saturate(160%) brightness(0.75)',
            WebkitBackdropFilter: 'blur(48px) saturate(160%) brightness(0.75)',
            border: '0.5px solid rgba(255, 255, 255, 0.10)',
            borderRadius: '20px',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.06)',   // top sheen
              '0 16px 56px rgba(0,0,0,0.75)',            // deep shadow
              '0 0 0 0.5px rgba(255,255,255,0.03)',      // outer rim
            ].join(', '),
            padding: '22px 22px 18px',
            zIndex: 10002,
            pointerEvents: 'auto',
            animation: 'tFadeUp 0.22s ease both',
            boxSizing: 'border-box',
          }}
        >
          {/* ── Top row ── */}
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px' }}>
            <span style={{
              fontSize: '0.67rem', fontWeight: '800',
              letterSpacing: '1.8px', textTransform: 'uppercase',
              color: 'var(--accent-color)',
            }}>
              Tutorial &nbsp;{currentStep + 1}/{steps.length}
            </span>
            <button
              onClick={handleSkip}
              style={{
                background:'none', border:'none', padding:'4px',
                cursor:'pointer', color:'rgba(255,255,255,0.28)',
                borderRadius:'6px', lineHeight:1,
                transition:'color 0.18s',
              }}
              onMouseEnter={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}
              onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.28)'}
              title="Lewati tutorial"
            >
              <X size={16} />
            </button>
          </div>

          {/* ── Progress bar — neutral white ── */}
          <div style={{
            height:'2px', borderRadius:'2px',
            background: 'rgba(255,255,255,0.07)',
            marginBottom:'16px', overflow:'hidden',
          }}>
            <div style={{
              height:'100%', borderRadius:'2px',
              width: `${pct}%`,
              background: 'linear-gradient(90deg, var(--accent-color), #ff6b8a)',
              transition: 'width 0.32s ease',
            }} />
          </div>

          {/* ── Title ── */}
          <h3 style={{
            fontSize: 'clamp(1rem, 3.5vw, 1.18rem)',
            fontFamily: "'Outfit', sans-serif",
            fontWeight: '700',
            margin: '0 0 9px',
            color: '#ffffff',
            lineHeight: 1.25,
          }}>
            {step.title}
          </h3>

          {/* ── Body ── */}
          <p style={{
            fontSize: 'clamp(0.82rem, 2.3vw, 0.91rem)',
            color: 'rgba(255,255,255,0.62)',
            margin: '0 0 18px',
            lineHeight: 1.65,
          }}>
            {step.content}
          </p>

          {/* ── Click hint ── */}
          {step.actionType === 'click' && (
            <div style={{
              display:'flex', alignItems:'center', gap:'7px',
              padding:'9px 13px', marginBottom:'14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius:'10px',
            }}>
              <span style={{ fontSize:'14px' }}>👆</span>
              <span style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.55)', fontWeight:'600', lineHeight:1.4 }}>
                Klik elemen yang di-highlight untuk lanjut
              </span>
            </div>
          )}

          {/* ── Buttons ── */}
          <div style={{ display:'flex', gap:'10px', justifyContent:'space-between', alignItems:'center' }}>
            {/* Back */}
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              style={{
                display:'flex', alignItems:'center', gap:'4px',
                padding:'8px 15px', borderRadius:'50px',
                fontSize: 'clamp(0.78rem, 2vw, 0.85rem)',
                fontWeight:'600',
                background: currentStep === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: currentStep === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.65)',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.18s ease',
                flexShrink: 0,
              }}
            >
              <ChevronLeft size={14} /> Back
            </button>

            {/* Next / Finish — keeps the red pill from reference */}
            {!step.actionType && (
              <button
                onClick={handleNext}
                style={{
                  position:'relative', overflow:'hidden',
                  display:'flex', alignItems:'center', gap:'5px',
                  padding:'9px 22px', borderRadius:'50px',
                  fontSize: 'clamp(0.82rem, 2.3vw, 0.88rem)',
                  fontWeight:'800', letterSpacing:'0.5px',
                  fontFamily:"'Outfit', sans-serif",
                  background: 'linear-gradient(135deg, var(--accent-color) 0%, #d90036 100%)',
                  border: 'none', color:'#fff', cursor:'pointer',
                  boxShadow: '0 4px 18px rgba(255,60,100,0.42), inset 0 1px 0 rgba(255,255,255,0.2)',
                  transition: 'transform 0.16s ease, box-shadow 0.16s ease',
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform    = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow    = '0 8px 24px rgba(255,60,100,0.52), inset 0 1px 0 rgba(255,255,255,0.25)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform    = '';
                  e.currentTarget.style.boxShadow    = '0 4px 18px rgba(255,60,100,0.42), inset 0 1px 0 rgba(255,255,255,0.2)';
                }}
              >
                {/* shimmer sweep */}
                <span style={{
                  position:'absolute', top:0, left:'-120%',
                  width:'55%', height:'100%',
                  background:'linear-gradient(to right,transparent,rgba(255,255,255,0.26),transparent)',
                  transform:'skewX(-20deg)',
                  animation:'tShimmer 2.6s ease-in-out infinite',
                  pointerEvents:'none',
                }} />
                {isLast ? 'Selesai' : 'NEXT'} <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorialOverlay;
