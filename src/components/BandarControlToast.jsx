import React, { useEffect, useState } from 'react';
import { ShieldAlert, Zap, TrendingDown, Target, Skull } from 'lucide-react';

const BandarControlToast = ({ type, message, visible, onClose }) => {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) setShouldRender(true);
  }, [visible]);

  if (!shouldRender) return null;

  const getIcon = () => {
    switch (type) {
      case 'hook': return <Zap className="text-win" size={24} />;
      case 'drain': return <TrendingDown className="text-lose" size={24} />;
      case 'near-miss': return <Target className="text-accent" size={24} />;
      case 'high-value': return <ShieldAlert className="text-accent" size={24} />;
      case 'crash': return <Skull className="text-lose" size={24} />;
      default: return <ShieldAlert size={24} />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'hook': return 'BANDAR: HOOK MODE ACTIVATED';
      case 'drain': return 'BANDAR: DRAIN MODE (RTP REDUCED)';
      case 'near-miss': return 'BANDAR: NEAR-MISS ILLUSION';
      case 'high-value': return 'BANDAR: TARGETING HIGH-VALUE PLAYER';
      case 'crash': return 'BANDAR: KILL SWITCH';
      default: return 'BANDAR CONTROL ALERT';
    }
  };

  return (
    <div 
      className={`bandar-toast ${visible ? 'show' : 'hide'}`}
      onAnimationEnd={() => { if (!visible) setShouldRender(false); }}
    >
      <div className="bandar-toast-icon">
        {getIcon()}
      </div>
      <div className="bandar-toast-content">
        <h4 className="outfit">{getTitle()}</h4>
        <p>{message}</p>
      </div>
      <button className="bandar-toast-close" onClick={onClose}>×</button>
    </div>
  );
};

export default BandarControlToast;
