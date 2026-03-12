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
    logicDescription = "Sistem secara sengaja memberikan kemenangan besar di awal untuk mengikat pemain secara emosional.";
    winChance = "80% Peluang Menang Buatan";
    hiddenMechanic = "Jackpot dipaksa keluar (Forced Win) terlepas dari putaran RNG alami.";
  } else if (currentPhase === 'drain') {
    phaseName = "Fase Drain (Bleeding Phase)";
    logicDescription = "Sistem mulai menyedot uang pemain. Kemenangan besar dimatikan. Hanya ada kemenangan palsu (Loss disguised as win) dan kekalahan besar.";
    winChance = "15% Menang Sebagian / 85% Kalah";
    hiddenMechanic = "Memberikan sensasi 'Hampir Menang' (Near Miss, misal: 7-7-Cherry) sebanyak 40% waktu untuk memanipulasi psikologi agar pemain merasa kemenangan sudah dekat.";
  } else if (currentPhase === 'crash') {
    phaseName = "Fase Crash (Kebangkrutan)";
    logicDescription = "Saldo sudah kritis atau habis. Sistem mengunci kemenangan sama sekali.";
    winChance = "0% (Sistem Terkunci)";
    hiddenMechanic = "Pengaturan house-edge mencapai 100%. Pemain tidak akan pernah bisa mengembalikan modal awal.";
  }

  return (
    <div className="algo-panel">
      <div 
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Eye className="text-accent" size={24} />
          <h3 className="outfit" style={{ margin: 0 }}>Di Balik Layar (Sistem Judol)</h3>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #333', paddingTop: '20px', animation: 'fade-in 0.3s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
            <Cpu size={18} color="#888" />
            <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 'bold' }}>Status Algoritma Berjalan:</span>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
            <h4 className="text-accent" style={{ marginBottom: '8px' }}>Phase: {phaseName}</h4>
            <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: '1.5', margin: '0 0 10px 0' }}>
              {logicDescription}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.9rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '5px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Win Rate Aktif:</strong>
                <span className="text-lose">{winChance}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '5px' }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Trik Psikologi Aktif:</strong>
                <span style={{ color: '#ddd' }}>{hiddenMechanic}</span>
              </div>
            </div>
          </div>
          
          <p style={{ fontSize: '0.85rem', color: '#666', fontStyle: 'italic', margin: 0 }}>
            *Ini adalah demonstrasi bagaimana admin situs judi online dapat memanipulasi algoritma di belakang layar kapan saja. Tidak ada yang namanya keberuntungan, semuanya adalah persentase yang diatur.*
          </p>
        </div>
      )}
    </div>
  );
};

export default AlgorithmExposed;
