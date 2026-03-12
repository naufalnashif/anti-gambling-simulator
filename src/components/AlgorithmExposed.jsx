import React, { useState } from 'react';
import { Settings, Eye, ChevronDown, ChevronUp, Cpu } from 'lucide-react';

const AlgorithmExposed = ({ spinCount, currentPhase }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Derive logic texts based on the current phase
  let phaseName = "";
  let logicDescription = "";
  let winChance = "";
  let hiddenMechanic = "";

  if (currentPhase === 'hook') {
    phaseName = "Fase Hook (Dopamine Rush)";
    logicDescription = "Bandar memberikan kemenangan beruntun di awal (90-98%) untuk menciptakan ilusi bahwa game ini sangat mudah dimenangkan.";
    winChance = "95% (Global Win Rate)";
    hiddenMechanic = "Menyesuaikan bobot simbol jackpot (777) agar lebih sering keluar sebagai pancingan deposit.";
  } else if (currentPhase === 'drain') {
    phaseName = "Fase Drain (Penyedotan)";
    logicDescription = "Sistem menurunkan peluang menang secara drastis (15%). Kemenangan besar diganti dengan 'kemenangan palsu' atau simbol bernilai rendah.";
    winChance = "15% (Global Win Rate)";
    hiddenMechanic = "Memicu 'Near Miss' (2 simbol jackpot + 1 simbol sampah) untuk memicu adrenalin dan rasa penasaran.";
  } else if (currentPhase === 'crash') {
    phaseName = "Fase Crash (Bankruptcy)";
    logicDescription = "Sistem mengunci kemenangan. Algoritma 'Anti-Comeback' aktif untuk memastikan saldo pemain habis sepenuhnya.";
    winChance = "0.1% (Sistem Terkunci)";
    hiddenMechanic = "Pengaturan House Edge diatur ke maksimal. Segala bentuk pola atau 'strategi' pemain tidak akan berpengaruh.";
  }

  return (
    <div className="algo-panel" style={{ border: '1px solid rgba(255, 0, 0, 0.2)', background: 'rgba(20, 10, 10, 0.6)' }}>
      <div 
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Eye className="text-lose" size={24} />
          <h3 className="outfit" style={{ margin: 0, color: 'var(--lose-color)' }}>BANDAR CONTROL PANEL (EXPOSED)</h3>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255, 0, 0, 0.2)', paddingTop: '20px', animation: 'fade-in 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
            <Cpu size={18} color="var(--lose-color)" />
            <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 'bold' }}>Server Logic: RIGGED / ACTIVE</span>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.6)', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ marginBottom: '8px', color: '#ff4444', letterSpacing: '1px' }}>{phaseName}</h4>
            <p style={{ fontSize: '0.95rem', color: '#aaa', lineHeight: '1.5', margin: '0 0 10px 0' }}>
              {logicDescription}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem' }}>
              <div style={{ background: 'rgba(255,0,0,0.05)', padding: '10px', borderRadius: '5px', border: '1px solid rgba(255,0,0,0.1)' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Current RTP Mapping:</strong>
                <span className="text-lose" style={{ fontWeight: 'bold' }}>{winChance}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '5px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Manipulation Logic:</strong>
                <span style={{ color: '#ddd' }}>{hiddenMechanic}</span>
              </div>
            </div>
          </div>
          
          <p style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic', margin: 0 }}>
            *Ini adalah representasi sistem kontrol yang dimiliki admin situs judi. Mereka dapat melihat saldo Anda dan mengatur 'win-rate' secara real-time untuk memastikan mereka selalu untung.*
          </p>
        </div>
      )}
    </div>
  );
};

export default AlgorithmExposed;
