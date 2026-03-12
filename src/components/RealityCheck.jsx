import React from 'react';
import { AlertCircle, XCircle } from 'lucide-react';
import '../index.css';

const FACTS = [
  "Tahukah Anda? Sistem judi online diprogram agar bandar selalu menang (House Edge). Kemenangan di awal hanyalah trik untuk membuat Anda kecanduan.",
  "Kecanduan judi merusak dopamin otak Anda. Anda tidak lagi bermain untuk menang, tapi bermain untuk sensasi, meski tahu akan kalah.",
  "Setiap kali Anda merasa 'hampir menang' (near miss), itu adalah manipulasi visual agar Anda terus memasang taruhan.",
  "Ratusan ribu orang telah kehilangan harta, keluarga, dan masa depan karena terjebak janji palsu judi online.",
  "Judi online bukanlah cara cepat kaya, melainkan cara paling pasti untuk jatuh miskin."
];

const RealityCheck = ({ onClose, gameOver, spinCount, lossAmount }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const randomFact = FACTS[Math.floor(Math.random() * FACTS.length)];

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ border: gameOver ? '1px solid var(--lose-color)' : '1px solid var(--accent-secondary)' }}>
        
        {gameOver ? (
          <>
            <XCircle size={80} className="text-lose pulsate" style={{ margin: '0 auto 20px', display: 'block' }} />
            <h1 className="outfit text-lose" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>BANKRUPT</h1>
            <h2 style={{ color: '#fff', marginBottom: '20px' }}>You lost {formatCurrency(lossAmount)}.</h2>
            
            <p className="fact-text" style={{ fontSize: '1.2rem', borderColor: 'var(--lose-color)', background: 'rgba(255, 51, 102, 0.1)', padding: '20px', borderRadius: '12px' }}>
              In just <strong className="text-lose">{spinCount}</strong> spins, the system took all your money. 
              <br/><br/>
              This is the reality of online gambling (Judol). It is not definitively fair, you will always eventually lose, and the algorithms are designed to bleed you dry.
            </p>

            <button 
              className="btn-primary" 
              onClick={() => window.location.reload()}
              style={{ marginTop: '20px', background: 'linear-gradient(135deg, #333, #555)' }}
            >
              Restart Simulation
            </button>
          </>
        ) : (
          <>
            <AlertCircle size={60} className="text-accent pulsate" style={{ margin: '0 auto 20px', display: 'block' }} />
            <h2 className="outfit text-accent" style={{ fontSize: '2rem', marginBottom: '20px' }}>REALITY CHECK</h2>
            
            <p className="fact-text" style={{ fontSize: '1.1rem', background: 'rgba(0, 229, 255, 0.05)', padding: '20px', borderRadius: '12px' }}>
              {randomFact}
            </p>

            <p style={{ color: '#888', marginBottom: '30px', fontSize: '0.9rem' }}>
              Current loss trend: {lossAmount > 0 ? formatCurrency(lossAmount) : 'Rp 0'}
            </p>
            
            <button className="btn-primary" onClick={onClose} style={{ width: '100%' }}>
              I Understand
            </button>
          </>
        )}
        
      </div>
    </div>
  );
};

export default RealityCheck;
