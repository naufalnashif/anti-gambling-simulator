import React, { useState, useEffect, useLayoutEffect } from 'react';
import { X, ChevronRight, Sparkles } from 'lucide-react';
import '../index.css';

const TutorialOverlay = ({ steps, active, onFinish, currentStepIndex }) => {
  const [targetRect, setTargetRect] = useState(null);
  const currentStep = steps[currentStepIndex];

  useLayoutEffect(() => {
    if (!active || !currentStep || !currentStep.targetId) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const element = document.getElementById(currentStep.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [active, currentStepIndex, steps]);

  if (!active || !currentStep) return null;

  // Calculate overlay clip-path
  // If no targetId, we don't punch a hole (it's a fullscreen intro)
  const clipPath = targetRect 
    ? `polygon(0% 0%, 0% 100%, ${targetRect.left}px 100%, ${targetRect.left}px ${targetRect.top}px, ${targetRect.right}px ${targetRect.top}px, ${targetRect.right}px ${targetRect.bottom}px, ${targetRect.left}px ${targetRect.bottom}px, ${targetRect.left}px 100%, 100% 100%, 100% 0%)`
    : 'none';

  return (
    <div 
      className="tutorial-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    >
      {/* Dark Scrim */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)',
          clipPath: clipPath,
          pointerEvents: 'auto',
          transition: 'clip-path 0.4s cubic-bezier(0.19, 1, 0.22, 1)'
        }}
      />

      {/* Tooltip Content */}
      <div 
        className="glass-panel tutorial-tooltip"
        style={{
          position: 'absolute',
          bottom: targetRect ? 'auto' : '50%',
          top: targetRect ? `${targetRect.bottom + 20}px` : '50%',
          left: targetRect ? `${targetRect.left + targetRect.width / 2}px` : '50%',
          transform: targetRect ? 'translateX(-50%)' : 'translate(-50%, -50%)',
          width: 'min(400px, 90vw)',
          padding: '25px',
          pointerEvents: 'auto',
          border: '1px solid var(--accent-secondary)',
          boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)',
          zIndex: 10000,
          transition: 'all 0.4s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <div style={{ background: 'var(--accent-secondary)', padding: '5px', borderRadius: '8px' }}>
            <Sparkles size={18} color="#000" />
          </div>
          <span style={{ fontWeight: '800', fontSize: '0.8rem', color: 'var(--accent-secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>
            TUTORIAL: {currentStepIndex + 1}/{steps.length}
          </span>
          <button 
            onClick={onFinish}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        <h3 className="outfit" style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#fff' }}>
          {currentStep.title}
        </h3>
        
        <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
          {currentStep.message}
        </p>

        <button 
          onClick={currentStep.action || onFinish}
          className="btn-primary"
          style={{ 
            width: '100%', 
            padding: '12px', 
            fontSize: '1rem', 
            background: 'linear-gradient(135deg, var(--accent-secondary), #0099aa)',
            boxShadow: '0 4px 15px rgba(0, 229, 255, 0.3)'
          }}
        >
          {currentStepIndex === steps.length - 1 ? 'MENGERTI' : 'LANJUT'} <ChevronRight size={18} />
        </button>
      </div>

      {/* Target Focus Border (Subtle Glow) */}
      {targetRect && (
        <div 
          style={{
            position: 'absolute',
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
            border: '2px solid var(--accent-secondary)',
            borderRadius: '8px',
            boxShadow: '0 0 20px var(--accent-secondary)',
            pointerEvents: 'none',
            zIndex: 10001,
            transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)'
          }}
        />
      )}
    </div>
  );
};

export default TutorialOverlay;
