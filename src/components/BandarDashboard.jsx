import React, { useState } from 'react';
import { Settings, ShieldAlert, Zap, TrendingDown, Target, Skull, RefreshCcw, Save } from 'lucide-react';

const BandarDashboard = ({ settings, onSettingsChange, activePhase, onPhaseChange, forcedOutcome, onForceNextOutcome }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    const newSettings = { ...localSettings, [name]: parseFloat(value) };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className="glass-panel" style={{ padding: '25px', border: '2px solid var(--accent-color)', background: 'rgba(20, 0, 10, 0.8)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', borderBottom: '1px solid rgba(255, 60, 100, 0.2)', paddingBottom: '15px' }}>
        <ShieldAlert className="text-lose" size={28} />
        <div>
          <h2 className="outfit" style={{ margin: 0, color: 'var(--accent-color)', fontSize: '1.5rem', letterSpacing: '1px' }}>BANDAR ADMIN CONSOLE</h2>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>MANIPULATION ENGINE v4.2 - LOGGED IN AS ADMIN</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Probability Controls */}
        <section>
          <h3 className="outfit" style={{ fontSize: '1rem', color: '#fff', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={18} /> GLOBAL PARAMETERS
          </h3>
          
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Win Probability (RTP Override)</label>
              <span className="text-win" style={{ fontWeight: 'bold' }}>{(localSettings.winChance * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" 
              name="winChance"
              min="0" 
              max="1" 
              step="0.01" 
              value={localSettings.winChance}
              onChange={handleSliderChange}
              style={{ width: '100%', accentColor: 'var(--win-color)' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Near-Miss Chance (Pseudo-Win)</label>
              <span className="text-accent" style={{ fontWeight: 'bold' }}>{(localSettings.nearMissChance * 100).toFixed(0)}%</span>
            </div>
            <input 
              type="range" 
              name="nearMissChance"
              min="0" 
              max="1" 
              step="0.01" 
              value={localSettings.nearMissChance}
              onChange={handleSliderChange}
              style={{ width: '100%', accentColor: 'var(--accent-secondary)' }}
            />
          </div>
        </section>

        {/* Phase Overrides */}
        <section>
          <h3 className="outfit" style={{ fontSize: '1rem', color: '#fff', marginBottom: '15px' }}>QUICK PHASE TRIGGER</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <button 
              onClick={() => onPhaseChange('hook')}
              className={`btn-admin ${activePhase === 'hook' ? 'active-hook' : ''}`}
            >
              <Zap size={14} /> HOOK
            </button>
            <button 
              onClick={() => onPhaseChange('drain')}
              className={`btn-admin ${activePhase === 'drain' ? 'active-drain' : ''}`}
            >
              <TrendingDown size={14} /> DRAIN
            </button>
            <button 
              onClick={() => onPhaseChange('crash')}
              className={`btn-admin ${activePhase === 'crash' ? 'active-crash' : ''}`}
            >
              <Skull size={14} /> CRASH
            </button>
          </div>
        </section>

        {/* Force Outcome */}
        <section style={{ background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 className="outfit" style={{ fontSize: '0.9rem', color: '#888', marginBottom: '12px', textAlign: 'center' }}>MANUAL INTERVENTION (NEXT SPIN ONLY)</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => onForceNextOutcome('jackpot')}
              className={`btn-force ${forcedOutcome === 'jackpot' ? 'active-jackpot' : ''}`}
            >
              JACKPOT
            </button>
            <button 
              onClick={() => onForceNextOutcome('win')}
              className={`btn-force ${forcedOutcome === 'win' ? 'active-win' : ''}`}
            >
              WIN
            </button>
            <button 
              onClick={() => onForceNextOutcome('lose')}
              className={`btn-force ${forcedOutcome === 'lose' ? 'active-lose' : ''}`}
            >
              LOSE
            </button>
          </div>
        </section>

        <div style={{ fontSize: '0.75rem', color: '#666', fontStyle: 'italic', textAlign: 'center', marginTop: '10px' }}>
          *Note: Changes are applied instantly to the server-side logic.*
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .btn-admin {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #aaa;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: all 0.2s;
        }
        .btn-admin:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        .active-hook { background: rgba(0, 255, 136, 0.2) !important; color: var(--win-color) !important; border-color: var(--win-color) !important; }
        .active-drain { background: rgba(0, 229, 255, 0.2) !important; color: var(--accent-secondary) !important; border-color: var(--accent-secondary) !important; }
        .active-crash { background: rgba(255, 51, 102, 0.2) !important; color: var(--lose-color) !important; border-color: var(--lose-color) !important; }
        
        .btn-force {
          flex: 1;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: #888;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          font-size: 0.75rem;
          transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .btn-force:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }
        .active-jackpot { 
          background: linear-gradient(to bottom, #FFD700, #DAA520) !important; 
          color: #000 !important; 
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(218, 165, 32, 0.5);
          border: none !important;
        }
        .active-win { 
          background: var(--win-color) !important; 
          color: #000 !important; 
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(0, 255, 136, 0.4);
          border: none !important;
        }
        .active-lose { 
          background: var(--lose-color) !important; 
          color: #fff !important; 
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(255, 51, 102, 0.4);
          border: none !important;
        }
      `}} />
    </div>
  );
};

export default BandarDashboard;
