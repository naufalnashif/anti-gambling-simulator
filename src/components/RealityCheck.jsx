import React from 'react';
import { AlertCircle, XCircle } from 'lucide-react';
import '../index.css';

export const FACTS = [
  "Sadar nggak? Judol itu cuma kasih lu 'kemenangan semu' di awal buat mancing dopamin, biar lu ngerasa hoki padahal setelah itu uang lu bakal dikuras habis.",
  "Ngerasa 'dikit lagi menang' karena ada 2 gambar yang sama? Itu namanya Near Win. Cuma ilusi bang biar lu penasaran dan terus-terusan mutar mesin.",
  "Saldo lu dikuras pelan-pelan sama bandar. Menang dikit itu cuma pancingan biar lu nggak berhenti pasang.",
  "Jangan ketipu 'pola gacor'. Itu semua settingan admin biar lu ngerasa bisa nebak arah main, padahal ujungnya ludes.",
  "Admin situs bisa ngelihat semua data lu. Mereka tau kapan lu lagi 'panas' dan kapan harus narik saldo lu sampe abis.",
  "Depo gampang, WD dipersulit. Itu taktik biar lu mainin lagi saldo menang lu sampe akhirnya balik ke kantong bandar.",
  "Lu nggak lagi main lawan mesin adil, lu lagi main lawan algoritma yang udah disetting harus untung gede buat yang punya situs.",
  "Visual yang rame sama suara 'jackpot' itu trik psikologi biar otak lu nagih terus, padahal dompet lu makin tipis.",
  "Pernah ngerasa 'dikit lagi dapet'? Itu namanya Near Miss. Emang sengaja dibuat gitu biar lu penasaran dan depo lagi.",
  "Udah banyak yang hancur karena mikir judi itu jalan pintas cari duit. Faktanya, jalan pintas buat miskin ya cuma judi.",
  "RTP (Return to Player) itu cuma angka formalitas. Di lapangan, admin bisa mutus scatter kapan aja mereka mau.",
  "Situs judi itu bukan tempat nyari cuan, itu tempat hiburan berbayar yang harganya mahal banget: masa depan lu sendiri.",
  "Kalau emang bisa kaya dari judi, nggak bakal ada iklan judi di mana-mana. Iklan itu ada karena mereka butuh duit lu buat mereka kaya.",
  "Stop mumpung belum abis semua. Uang yang hilang nggak bakal balik lewat judi, malah bakal makin nambah utang.",
  "Ingat keluarga di rumah. Duit buat jajan anak atau beli beras jangan dikasih ke bandar yang udah kaya raya."
];

const RealityCheck = ({ onClose, gameOver, spinCount, lossAmount, fact }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const displayFact = fact || FACTS[Math.floor(Math.random() * FACTS.length)];

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

            <button 
              className="btn-primary" 
              onClick={() => window.location.reload()}
              style={{ width: '100%', padding: '15px', fontSize: '1.1rem', background: 'linear-gradient(135deg, #333, #555)' }}
            >
              Coba Lagi (Reset)
            </button>
          </>
        ) : (
          <>
            <AlertCircle size={50} className="text-accent" style={{ margin: '0 auto 15px', display: 'block' }} />
            <h2 className="outfit text-accent" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Paham Risikonya?</h2>
            
            <p className="fact-text" style={{ fontSize: '0.95rem', background: 'rgba(0, 229, 255, 0.05)', padding: '15px', borderRadius: '12px', borderLeftColor: 'var(--accent-secondary)' }}>
              {displayFact}
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
