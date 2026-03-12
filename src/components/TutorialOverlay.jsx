import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import '../index.css';

const TutorialOverlay = ({ steps, active, onFinish, currentStepIndex }) => {
  const [targetRect, setTargetRect] = useState(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const tooltipRef = useRef(null);
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    if (!active || !currentStep || !currentStep.targetId) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const element = document.getElementById(currentStep.targetId);
      if (element) {
        // Scroll into view if needed, but not for every step to avoid jumpiness
        if (currentStep.shouldScroll) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      } else {
        setTargetRect(null);
      }
    };

    // Delay a bit to allow for page transitions or renders
    const timer = setTimeout(updateRect, 100);
    
    window.addEventListener('scroll', updateRect, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', updateRect);
    };
  }, [active, currentStepIndex, steps, windowSize]);

  if (!active || !currentStep) return null;

  const isMobile = windowSize.width <= 768;

  // Calculate overlay style
  const scrimColor = 'rgba(0, 0, 0, 0.9)'; // Darker as requested
  
  // Using a simpler clip-path or box-shadow for the hole
  // Clip-path with hole logic
  const getClipPath = () => {
    if (!targetRect) return 'none';
    const { left, top, right, bottom } = targetRect;
    const padding = 5;
    const L = left - padding;
    const T = top - padding;
    const R = right + padding;
    const B = bottom + padding;
    return `polygon(0% 0%, 0% 100%, ${L}px 100%, ${L}px ${T}px, ${R}px ${T}px, ${R}px ${B}px, ${L}px ${B}px, ${L}px 100%, 100% 100%, 100% 0%)`;
  };

  // Tooltip positioning logic
  const getTooltipStyle = () => {
    if (!targetRect) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const spaceBelow = windowSize.height - targetRect.bottom;
    const spaceAbove = targetRect.top;
    const tooltipWidth = Math.min(400, windowSize.width * 0.9);
    
    let top, left, transform;

    if (spaceBelow > 250 || spaceBelow > spaceAbove) {
      // Show below
      top = `${targetRect.bottom + 20}px`;
      left = `${targetRect.left + targetRect.width / 2}px`;
      transform = 'translateX(-50%)';
    } else {
      // Show above
      top = `${targetRect.top - 20}px`;
      left = `${targetRect.left + targetRect.width / 2}px`;
      transform = 'translate(-50%, -100%)';
    }

    // Keep within horizontal bounds
    const halfWidth = tooltipWidth / 2;
    const leftPx = targetRect.left + targetRect.width / 2;
    if (leftPx - halfWidth < 10) {
      left = '10px';
      transform = transform.replace('translateX(-50%)', 'none').replace('translate(-50%,', 'translate(0px,');
    } else if (leftPx + halfWidth > windowSize.width - 10) {
      left = 'auto';
      right = '10px';
      transform = transform.replace('translateX(-50%)', 'none').replace('translate(-50%,', 'translate(0px,');
    }

    return { top, left, transform, width: `${tooltipWidth}px` };
  };

  const tooltipStyle = getTooltipStyle();

  return (
    <div className="tutorial-root" style={{ position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none' }}>
      {/* Background Scrim */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: scrimColor,
          clipPath: getClipPath(),
          pointerEvents: 'auto',
          transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Focus Box Glow */}
      {targetRect && (
        <div 
          style={{
            position: 'absolute',
            top: targetRect.top - 5,
            left: targetRect.left - 5,
            width: targetRect.width + 10,
            height: targetRect.height + 10,
            border: '2px solid var(--accent-secondary)',
            borderRadius: '12px',
            boxShadow: '0 0 30px var(--accent-secondary), inset 0 0 10px var(--accent-secondary)',
            transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Tooltip */}
      <div 
        ref={tooltipRef}
        className="glass-panel tutorial-bubble"
        style={{
          position: 'absolute',
          ...tooltipStyle,
          padding: isMobile ? '20px' : '28px',
          zIndex: 10001,
          pointerEvents: 'auto',
          border: '1px solid var(--accent-secondary)',
          background: 'rgba(15, 15, 25, 0.95)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(0, 229, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          transition: 'all 0.3s ease-out'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={18} className="text-accent" />
          <span style={{ 
            fontSize: '0.7rem', 
            fontWeight: '900', 
            letterSpacing: '2px', 
            color: 'var(--accent-secondary)',
            textTransform: 'uppercase'
          }}>
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <button 
            onClick={onFinish}
            style={{ 
              marginLeft: 'auto', 
              background: 'none', 
              border: 'none', 
              color: '#555', 
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <h3 className="outfit" style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', color: '#fff', margin: 0 }}>
          {currentStep.title}
        </h3>

        <p style={{ 
          fontSize: isMobile ? '0.9rem' : '1rem', 
          color: '#bbb', 
          lineHeight: '1.6', 
          margin: 0 
        }}>
          {currentStep.message}
        </p>

        <button 
          className="btn-primary"
          onClick={currentStep.action}
          style={{ 
            marginTop: '10px',
            padding: '12px', 
            fontSize: '1rem',
            background: 'linear-gradient(135deg, var(--accent-secondary), #00aacc)',
            boxShadow: '0 10px 20px rgba(0, 229, 255, 0.2)'
          }}
        >
          {currentStepIndex === steps.length - 1 ? 'SELESAI' : 'LANJUTKAN'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default TutorialOverlay;
