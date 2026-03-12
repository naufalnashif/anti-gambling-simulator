import React from 'react';
import { Play, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import '../index.css';

const Home = ({ onStart }) => {
  return (
    <div className="page-container" style={{ paddingBottom: '30px' }}>
      <div className="header" style={{ marginBottom: '2.5rem', marginTop: '1rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 7vw, 4rem)', lineHeight: '1.2', marginBottom: '15px' }}>
          <span className="text-gradient">ZEUS</span> <span className="text-accent">CASINO</span>
        </h1>
        <p style={{ 
          fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', 
          maxWidth: '700px', 
          margin: '0 auto',
          textAlign: 'justify',
          color: 'var(--text-secondary)',
          lineHeight: '1.6'
        }}>
          Platform Edukasi & Simulasi Anti-Judi Online. Kami hadir untuk membongkar cara kerja algoritma bandar yang dirancang secara sistematis untuk menguras finansial pemain. Rasakan simulasinya, pahami risikonya, dan berhenti sekarang juga.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '20px', 
        marginBottom: '40px' 
      }}>
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
            <ShieldCheck className="text-accent" size={28} />
            <h3 className="outfit" style={{ fontSize: '1.25rem', margin: 0 }}>Edukasi Murni</h3>
          </div>
          <p style={{ color: '#ccc', fontSize: '0.9rem', textAlign: 'justify', margin: 0, lineHeight: '1.5' }}>
            Simulasi ini 100% menggunakan uang virtual. Tidak ada transaksi nyata, murni untuk memberikan gambaran logis tentang kekalahan pasti di dunia judi online.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
            <Zap className="text-lose" size={28} />
            <h3 className="outfit" style={{ fontSize: '1.25rem', margin: 0 }}>Taktik Bandar</h3>
          </div>
          <p style={{ color: '#ccc', fontSize: '0.9rem', textAlign: 'justify', margin: 0, lineHeight: '1.5' }}>
            Pelajari bagaimana fase Hook, Drain, dan Crash bekerja secara otomatis untuk menjebak psikologi dan menghancurkan kontrol diri pemain.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
            <AlertCircle className="text-secondary" size={28} />
            <h3 className="outfit" style={{ fontSize: '1.25rem', margin: 0 }}>Analisis Real-Time</h3>
          </div>
          <p style={{ color: '#ccc', fontSize: '0.9rem', textAlign: 'justify', margin: 0, lineHeight: '1.5' }}>
            Pantau grafik penurunan saldo yang meyakinkan secara visual bahwa setiap putaran mesin hanyalah langkah menuju kebangkrutan total.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          className="btn-primary" 
          onClick={onStart}
          style={{ 
            padding: '18px 45px', 
            fontSize: '1.3rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            margin: '0 auto' 
          }}
        >
          <Play size={22} fill="currentColor" />
          MULAI SIMULASI
        </button>
        <p style={{ marginTop: '20px', color: '#666', fontSize: '0.8rem', fontStyle: 'italic' }}>
          *Platform ini dirancang untuk tujuan preventif dan kesadaran publik.
        </p>
      </div>
    </div>
  );
};

export default Home;
