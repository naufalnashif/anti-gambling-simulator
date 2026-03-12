import React from 'react';
import { AlertCircle, XCircle } from 'lucide-react';
import '../index.css';

export const FACTS = [
  "Judi online hanya memberikan kemenangan semu (dopamin) di awal, di mana setelah itu hanya terdapat kekalahan yang telah direncanakan oleh sistem.",
  "Hasil 'Near Win' (dua gambar sama) adalah ilusi visual yang sengaja diciptakan agar Anda merasa 'sedikit lagi menang' dan terus memutar mesin.",
  "Bandar tidak pernah rugi. Setiap kemenangan kecil yang Anda rasakan hanyalah bagian dari rotasi saldo pemain lain untuk menjaga Anda tetap bermain.",
  "Algoritma judi online dirancang untuk mengeksploitasi psikologi manusia. Dorongan untuk kembali bermain adalah hasil manipulasi, bukan logika.",
  "RTP dalam judi online dapat diubah sewaktu-waktu oleh operator. Tidak ada keadilan dalam sistem yang dikendalikan penuh oleh pemilik situs.",
  "Fitur 'Auto-spin' mempercepat penguapan saldo Anda. Semakin cepat Anda bermain, semakin cepat algoritma penyedotan saldo bekerja.",
  "Setiap detik di situs judi, data perilaku Anda dipelajari oleh AI untuk menentukan kapan harus memberikan 'kemenangan pancingan'.",
  "Uang yang Anda kalahkan adalah keuntungan pasti bagi pengembang platform, sementara harapan Anda akan keberuntungan adalah variabel yang mereka kendalikan.",
  "Skema deposit yang mudah dan withdraw yang sulit adalah taktik psikologis agar Anda terus memutar saldo yang sudah dimenangkan.",
  "Kemenangan besar seorang pemain seringkali dipromosikan (endorse) untuk menciptakan ilusi bahwa kemenangan adalah hal yang umum, padahal itu pengecualian.",
  "Admin situs memiliki kontrol penuh untuk memblokir akun yang menang terlalu banyak, memastikan 'House Always Wins' bukan sekadar mitos.",
  "Ilusi kontrol: Anda merasa bisa membaca pola (pola gacor), padahal setiap putaran adalah hasil acak yang sudah dikalibrasi untuk kerugian jangka panjang.",
  "Suara dan cahaya yang meriah saat menang adalah teknik Pavlovian untuk melatih otak Anda mengharapkan hadiah dari aktivitas yang merusak.",
  "Banyak situs judi menggunakan bot untuk menciptakan suasana ramai dan memicu rasa kompetitif atau takut ketinggalan (FOMO) pada pemain asli.",
  "Kerugian finansial hanyalah awal; adiksi judi online merusak struktur saraf otak yang mengatur pengambilan keputusan dan kontrol emosi."
];

const RealityCheck = ({ onClose, gameOver, spinCount, lossAmount, fact }) => {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  // Use passed fact or fall back to a random one if not provided (for safety)
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
