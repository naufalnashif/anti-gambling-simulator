import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

const TutorialOverlay = ({ steps, onComplete, onStepChange, onDismiss }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDelayed, setIsDelayed] = useState(false);
  const tooltipRef = useRef(null);

  const step = steps[currentStep];

  useEffect(() => {
    // Initial delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Handle step delays
    if (step.delay) {
      setIsDelayed(true);
      const timer = setTimeout(() => {
        setIsDelayed(false);
      }, step.delay);
      return () => clearTimeout(timer);
    } else {
      setIsDelayed(false);
    }
  }, [currentStep, isVisible, step.delay]);

  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      const element = document.getElementById(step.targetId);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
        if (step.scroll) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setTargetRect(null);
      }
    };

    updatePosition();
    const timer = setTimeout(updatePosition, 100);
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    // Add click listener if step requires action to proceed
    let elementToListen = null;
    if (step.actionType === 'click') {
        const element = document.getElementById(step.targetId);
        if (element) {
            elementToListen = element;
            element.addEventListener('click', handleNext);
        }
    }
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      if (elementToListen) {
          elementToListen.removeEventListener('click', handleNext);
      }
      clearTimeout(timer);
    };
  }, [currentStep, step.targetId, isVisible, step.scroll, step.actionType]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (onStepChange) onStepChange(currentStep + 1);
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      if (onStepChange) onStepChange(currentStep - 1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onDismiss) {
        onDismiss(step.phase);
    } else {
        onComplete();
    }
  };

  if (!isVisible || !step || isDelayed) return null;

  const tooltipPosition = () => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    
    const tooltipWidth = 300;
    const padding = 20;
    let left = targetRect.left + targetRect.width / 2;
    let transform = 'translateX(-50%)';

    // Prevent overflow on left/right
    const minLeft = tooltipWidth / 2 + padding;
    const maxLeft = window.innerWidth - (tooltipWidth / 2 + padding);
    
    if (left < minLeft) {
      left = padding;
      transform = 'none';
    } else if (left > maxLeft) {
      left = window.innerWidth - tooltipWidth - padding;
      transform = 'none';
    }

    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;
    
    if (spaceBelow > 250) {
      return { top: `${targetRect.bottom + 20}px`, left: `${left}px`, transform };
    } else if (spaceAbove > 250) {
      return { bottom: `${window.innerHeight - targetRect.top + 20}px`, left: `${left}px`, transform };
    } else {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  // Professional Backdrop with Hole using clip-path
  // This allows clicks to pass through to the element in the hole
  const backdropStyle = targetRect ? {
    clipPath: `polygon(
      0% 0%, 
      100% 0%, 
      100% 100%, 
      0% 100%, 
      0% 0%,
      ${targetRect.left - 8}px ${targetRect.top - 8}px, 
      ${targetRect.right + 8}px ${targetRect.top - 8}px, 
      ${targetRect.right + 8}px ${targetRect.bottom + 8}px, 
      ${targetRect.left - 8}px ${targetRect.bottom + 8}px, 
      ${targetRect.left - 8}px ${targetRect.top - 8}px
    )`
  } : {};

  return (
    <div className="tutorial-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000, pointerEvents: 'none' }}>
      {/* Backdrop */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.75)',
        transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
        pointerEvents: 'auto',
        ...backdropStyle
      }} onClick={(e) => e.stopPropagation()} />

      {/* Tooltip */}
      <div 
        ref={tooltipRef}
        style={{
          position: 'absolute',
          width: 'min(300px, 90vw)',
          padding: '20px',
          background: 'var(--bg-card)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          color: '#fff',
          zIndex: 10001,
          transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
          backdropFilter: 'blur(10px)',
          pointerEvents: 'auto',
          ...tooltipPosition()
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Tutorial ({currentStep + 1}/{steps.length})
          </span>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>
        
        <h3 className="outfit" style={{ fontSize: '1.2rem', margin: '0 0 8px 0' }}>{step.title}</h3>
        <p style={{ fontSize: '0.9rem', color: '#ccc', margin: '0 0 20px 0', lineHeight: '1.5' }}>{step.content}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={handlePrev} 
            disabled={currentStep === 0}
            style={{ 
               padding: '8px 12px', 
               fontSize: '0.8rem', 
               background: 'rgba(255,255,255,0.05)', 
               border: '1px solid rgba(255,255,255,0.1)',
               borderRadius: '8px',
               color: (currentStep === 0) ? '#444' : '#fff',
               cursor: (currentStep === 0) ? 'default' : 'pointer',
               display: 'flex',
               alignItems: 'center',
               gap: '4px'
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          
          {!step.actionType && (
            <button 
                onClick={handleNext} 
                className="btn-primary"
                style={{ 
                padding: '8px 20px', 
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
                }}
            >
                {currentStep === steps.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={16} />
            </button>
          )}

          {step.actionType === 'click' && (
              <span style={{ fontSize: '0.85rem', color: '#888', fontStyle: 'italic', display: 'flex', alignItems: 'center' }}>
                  Silakan Klik Element
              </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
