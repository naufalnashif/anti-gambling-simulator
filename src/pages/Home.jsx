import React from 'react';
import { Play, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import '../index.css';

const Home = ({ onStart }) => {
  return (
    <div className="page-container" style={{ paddingBottom: '50px' }}>
      <div className="header" style={{ marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: '1', marginBottom: '20px' }}>
          <span className="text-gradient">ZEUS</span> <span className="text-accent">CASINO</span>
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', maxWidth: '800px', margin: '0 auto' }}>
          Platform Edukasi & Simulasi Anti-Judi Online. Rasakan sendiri bagaimana algoritma bandar bekerja untuk menguras habis uang Anda.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '50px' }}>
        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <ShieldCheck className="text-accent" size={48} style={{ margin: '0 auto 20px' }} />
          <h3 className="outfit" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>100% Aman & Gratis</h3>
          <p style={{ color: '#ccc' }}>Simulasi ini menggunakan uang virtual. Tidak ada deposit, tidak ada penarikan, murni untuk tujuan pendidikan.</p>
        </div>

        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <Zap className="text-lose" size={48} style={{ margin: '0 auto 20px' }} />
          <h3 className="outfit" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Algoritma Rigged</h3>
          <p style={{ color: '#ccc' }}>Pelajari fase-fase jebakan bandar: Hook (Pancingan), Drain (Penyedotan), hingga Crash (Habis Total).</p>
        </div>

        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
          <AlertCircle className="text-secondary" size={48} style={{ margin: '0 auto 20px' }} />
          <h3 className="outfit" style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Kesadaran Finansial</h3>
          <p style={{ color: '#ccc' }}>Lihat tren grafik kekayaan Anda yang pasti akan menurun drastis seiring berjalannya waktu permainan.</p>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <button 
          className="btn-primary" 
          onClick={onStart}
          style={{ padding: '25px 60px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '15px', margin: '0 auto' }}
        >
          <Play size={28} fill="currentColor" />
          MULAI SIMULASI
        </button>
        <p style={{ marginTop: '25px', color: '#666', fontSize: '0.9rem' }}>
          *Dengan menekan tombol di atas, Anda setuju untuk belajar dan berhenti dari judi online.
        </p>
      </div>
    </div>
  );
};

export default Home;
