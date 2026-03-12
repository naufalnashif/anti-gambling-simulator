import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

const TutorialOverlay = ({ steps, onComplete, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
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

    const updatePosition = () => {
      const element = document.getElementById(step.targetId);
      if (element) {
        setTargetRect(element.getBoundingClientRect());
        // Scroll into view if needed
        if (step.scroll) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setTargetRect(null);
      }
    };

    updatePosition();
    // Re-check after a small delay in case of layout shifts or animations
    const timer = setTimeout(updatePosition, 100);
    
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
      clearTimeout(timer);
    };
  }, [currentStep, step.targetId, isVisible, step.scroll]);

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

  if (!isVisible || !step) return null;

  const spotlightStyle = targetRect ? {
    top: `${targetRect.top - 8}px`,
    left: `${targetRect.left - 8}px`,
    width: `${targetRect.width + 16}px`,
    height: `${targetRect.height + 16}px`,
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
    borderRadius: '8px',
  } : {
    top: '50%',
    left: '50%',
    width: '0',
    height: '0',
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
  };

  const tooltipPosition = () => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    
    const spaceBelow = window.innerHeight - targetRect.bottom;
    const spaceAbove = targetRect.top;
    
    if (spaceBelow > 200) {
      return { top: `${targetRect.bottom + 20}px`, left: `${targetRect.left + targetRect.width / 2}px`, transform: 'translateX(-50%)' };
    } else if (spaceAbove > 200) {
      return { bottom: `${window.innerHeight - targetRect.top + 20}px`, left: `${targetRect.left + targetRect.width / 2}px`, transform: 'translateX(-50%)' };
    } else {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <div className="tutorial-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000, pointerEvents: 'none' }}>
      {/* Spotlight */}
      <div style={{
        position: 'absolute',
        transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
        pointerEvents: 'auto',
        ...spotlightStyle
      }} />

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
          pointerEvents: 'auto',
          transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
          backdropFilter: 'blur(10px)',
          ...tooltipPosition()
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-color)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Tutorial ({currentStep + 1}/{steps.length})
          </span>
          <button onClick={() => { setIsVisible(false); onComplete(); }} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}>
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
               color: currentStep === 0 ? '#444' : '#fff',
               cursor: currentStep === 0 ? 'default' : 'pointer',
               display: 'flex',
               alignItems: 'center',
               gap: '4px'
            }}
          >
            <ChevronLeft size={16} /> Back
          </button>
          
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
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
