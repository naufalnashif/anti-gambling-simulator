import React from 'react';
import { AlertCircle, XCircle } from 'lucide-react';
import '../index.css';

const RealityCheck = ({ onClose, gameOver, spinCount, lossAmount, fact }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{
        border: gameOver ? '1px solid var(--lose-color)' : '1px solid var(--accent-secondary)',
        padding: '30px 20px',
        maxWidth: '450px'
      }}>

        {gameOver ? (
          <>
            <XCircle size={60} className="text-lose" style={{ margin: '0 auto 15px', display: 'block' }} />
            <h1 className="outfit text-lose" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.22rem)', marginBottom: '5px' }}>SESI BERAKHIR</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>Realitas di balik layar terungkap.</p>

            <div style={{ background: 'rgba(255, 51, 102, 0.05)', padding: '15px', borderRadius: '12px', marginBottom: '20px', border: '1px solid rgba(255, 51, 102, 0.1)' }}>
              <p style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.5', margin: 0 }}>
                Dalam <strong className="text-lose">{spinCount} putaran</strong>, modal Anda habis. Ini bukan sekadar nasib buruk, melainkan hasil akhir yang sudah dipastikan oleh algoritma sistem.
              </p>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '25px', fontSize: '0.9rem', color: '#aaa' }}>
              <p>Total Kerugian Virtual: <span className="text-lose" style={{ fontWeight: 'bold' }}>{formatCurrency(lossAmount)}</span></p>
              <p>Status: <span className="text-lose">Sistem Menang Mutlak</span></p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                className="btn-primary"
                onClick={() => window.location.reload()}
                style={{ flex: 1, padding: '12px', fontSize: '1rem', background: 'linear-gradient(135deg, #333, #555)' }}
              >
                Coba Lagi
              </button>
              <button
                className="btn-primary"
                onClick={onClose}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  fontSize: '1rem', 
                  background: 'rgba(255,255,255,0.05)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: 'none'
                }}
              >
                Lihat Riwayat
              </button>
            </div>
          </>
        ) : (
          <>
            <AlertCircle size={50} className="text-accent" style={{ margin: '0 auto 15px', display: 'block' }} />
            <h2 className="outfit text-accent" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Paham Risikonya?</h2>

            <p className="fact-text" style={{ fontSize: '0.95rem', background: 'rgba(0, 229, 255, 0.05)', padding: '15px', borderRadius: '12px', borderLeftColor: 'var(--accent-secondary)' }}>
              {fact}
            </p>

            <div style={{ margin: '20px 0', fontSize: '0.85rem', color: '#888' }}>
              Tren Kerugian Saat Ini: <span className="text-lose">{formatCurrency(lossAmount)}</span>
            </div>

            <button className="btn-primary" onClick={onClose} style={{ width: '100%', padding: '12px', fontSize: '1rem' }}>
              Saya Paham & Lanjut
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default RealityCheck;
