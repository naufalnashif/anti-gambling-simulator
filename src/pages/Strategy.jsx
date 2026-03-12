import React from 'react';
import { Target, Magnet, Zap, TrendingUp, HandCoins } from 'lucide-react';
import '../index.css';

const Strategy = () => {
  return (
    <div className="page-container" style={{ paddingBottom: '50px' }}>
      <div className="header" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Strategi <span className="text-accent">Bandar</span> Judol</h1>
        <p>Bagaimana mereka memanipulasi psikologi Anda untuk meraup untung sebesar-besarnya.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* Card 1 */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <Magnet className="text-accent" size={32} style={{ marginBottom: '15px' }} />
          <h3 className="outfit" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Fase 'Hook' (Pancingan)</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '1rem' }}>
            Saat Anda baru pertama kali mendaftar atau deposit, algoritma secara sengaja diatur untuk memberikan Anda "kemenangan besar" (Jackpot palsu). Tujuannya murni untuk melepaskan hormon dopamin di otak Anda sehingga Anda merasa "hari ini adalah hari keberuntungan saya", yang membuat Anda ketagihan.
          </p>
        </div>

        {/* Card 2 */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <Target className="text-lose" size={32} style={{ marginBottom: '15px' }} />
          <h3 className="outfit" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Ilusi 'Hampir Menang' (Near Miss)</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '1rem' }}>
            Sering melihat dua gambar Scatter keluar dan gambar ketiga meleset sedikit? Itu BUKAN kebetulan dan BUKAN berarti Anda akan segera menang. Secara visual, sistem diprogram untuk memunculkan kombinasi "hampir menang" sesering mungkin untuk membuat Anda berpikir "sedikit lagi pasti JP", padahal peluang kemenangan Anda sudah ditutup oleh bandar.
          </p>
        </div>

        {/* Card 3 */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <TrendingUp className="text-accent" size={32} style={{ marginBottom: '15px' }} />
          <h3 className="outfit" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Kemenangan yang Merugikan</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '1rem' }}>
            Terkadang Anda "menang" Rp 2.000, padahal taruhan Anda per putaran adalah Rp 5.000. Sistem membunyikan lonceng dan animasi seolah Anda menang, menutupi fakta bahwa secara matematis, uang Anda sedang perlahan-lahan disedot (Bleeding) tanpa Anda sadari karena efek lampu dan suara yang meriah.
          </p>
        </div>

        {/* Card 4 */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <HandCoins className="text-lose" size={32} style={{ marginBottom: '15px' }} />
          <h3 className="outfit" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>House Edge (Keuntungan Pasti Bandar)</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '1rem' }}>
            Tidak ada situs judi yang mau rugi. RTP (Return to Player) yang ditulis 98% artinya dari setiap Rp 100.000.000 yang masuk, Rp 2.000.000 PASTI menjadi milik bandar. Sisa uangnya hanya dirotasi antar pemain. Anda tidak bermain melawan bandar, Anda bermain melawan algoritma yang sudah diatur pasti menang untuk pemilik situs.
          </p>
        </div>

        {/* Card 5 */}
        <div className="glass-panel" style={{ padding: '30px', gridColumn: '1 / -1', border: '1px solid rgba(255, 60, 100, 0.3)', background: 'rgba(255, 60, 100, 0.05)' }}>
          <Zap className="text-lose" size={32} style={{ marginBottom: '15px' }} />
          <h3 className="outfit text-lose" style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Sistem RTP Live Adalah Manipulasi Tanda Tanya</h3>
          <p style={{ color: '#ddd', lineHeight: '1.6', fontSize: '1.1rem' }}>
            Jangan pernah tertipu dengan "Bocoran RTP Live / Pola Gacor" yang disebarkan oleh admin grup Telegram atau afiliator. RTP (Return to Player) tersebut dapat diubah kapan saja secara manual oleh operator situs dari dashboard admin mereka. Mereka mengeksploitasi keputusasaan Anda.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Strategy;
