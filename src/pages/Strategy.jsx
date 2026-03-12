import React, { useState } from 'react';
import { BrainCircuit, ChevronDown, ChevronUp, Target, TrendingDown, ShieldAlert, Zap } from 'lucide-react';
import '../index.css';

const StrategyItem = ({ icon: Icon, title, description, colorClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-panel" style={{ marginBottom: '15px', overflow: 'hidden' }}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          padding: '15px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: isOpen ? 'rgba(255,255,255,0.03)' : 'transparent',
          transition: 'background 0.3s'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Icon className={colorClass} size={24} />
          <h3 className="outfit" style={{ fontSize: '1.1rem', margin: 0 }}>{title}</h3>
        </div>
        {isOpen ? <ChevronUp size={20} color="#666" /> : <ChevronDown size={20} color="#666" />}
      </div>
      
      {isOpen && (
        <div style={{ 
          padding: '0 20px 20px 20px', 
          fontSize: '0.95rem', 
          lineHeight: '1.6', 
          color: '#ccc',
          textAlign: 'justify' 
        }}>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '15px' }} />
          {description}
        </div>
      )}
    </div>
  );
};

const Strategy = () => {
  const strategies = [
    {
      icon: Zap,
      title: "Hook Phase (Pancingan)",
      colorClass: "text-win",
      description: "Pada awal permainan, algoritma bandar sengaja meningkatkan probabilitas kemenangan hingga 80-90%. Tujuannya adalah memancing dopamin di otak Anda, menciptakan kepercayaan diri palsu, dan membuat Anda merasa bahwa situs ini 'gacor'. Ini adalah jebakan pertama untuk memastikan Anda melakukan depo lebih besar nantinya."
    },
    {
      icon: Target,
      title: "Near Miss (Nyaris Menang)",
      colorClass: "text-accent",
      description: "Pernahkah Anda melihat dua simbol jackpot muncul dan yang ketiga hanya meleset satu baris? Itu bukan kebetulan. Ini adalah teknik psikologis 'Near Miss' yang dirancang agar Anda merasa kemenangan sudah sangat dekat, memicu rasa penasaran untuk terus memutar mesin meskipun saldo terus berkurang."
    },
    {
      icon: TrendingDown,
      title: "Drain Phase (Penyedotan)",
      colorClass: "text-lose",
      description: "Setelah Anda 'terikat', sistem masuk ke fase penyedotan. Algoritma akan memberikan kemenangan-kemenangan kecil yang nilainya seringkali lebih rendah dari nilai taruhan Anda (Loss Disguised as Win). Saldo Anda akan turun secara perlahan namun pasti ke kantong bandar tanpa Anda sadari."
    },
    {
      icon: ShieldAlert,
      title: "House Edge & RTP Manipulation",
      colorClass: "text-secondary",
      description: "Berbeda dengan kasino legal yang diawasi ketat, situs judi online ilegal tidak memiliki standar keadilan. Operator memiliki 'backdoor' untuk mengubah nilai Return to Player (RTP) secara real-time. Mereka bisa mematikan fitur kemenangan kapan saja, terutama saat banyak pemain sedang aktif atau melakukan taruhan besar."
    }
  ];

  return (
    <div className="page-container" style={{ paddingBottom: '30px' }}>
      <div className="header" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
          <BrainCircuit className="text-accent" size={32} />
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', margin: 0 }}>Strategi <span className="text-accent">Bandar</span></h1>
        </div>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Pahami bagaimana sistem dirancang secara matematis untuk memastikan Anda selalu kalah. Kesadaran adalah pertahanan terbaik Anda.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {strategies.map((strat, index) => (
          <StrategyItem key={index} {...strat} />
        ))}
      </div>
      
      <div className="glass-panel" style={{ marginTop: '30px', padding: '20px', borderLeft: '4px solid var(--lose-color)', maxWidth: '800px', margin: '30px auto 0' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'justify' }}>
          <strong>Penting:</strong> Dalam dunia perjudian online, satu-satunya cara untuk menang adalah dengan tidak memulainya. Bandar memiliki semua kendali atas uang yang Anda setor.
        </p>
      </div>
    </div>
  );
};

export default Strategy;
