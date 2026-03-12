import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, AlertTriangle, Heart, Scale, Wallet } from 'lucide-react';
import '../index.css';

const ArticleItem = ({ icon: Icon, title, content }) => {
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
          <Icon className="text-secondary" size={24} />
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
          {content}
        </div>
      )}
    </div>
  );
};

const Education = () => {
  const articles = [
    {
      icon: Wallet,
      title: "Lingkaran Setan Finansial",
      content: "Judi online seringkali menjadi gerbang menuju jeratan utang yang lebih besar. Banyak pemain yang awalnya kalah kemudian mencari pinjaman online (Pinjol) dengan harapan bisa 'mengembalikan modal' (chasing losses). Hal ini menciptakan efek domino yang menghancurkan struktur keuangan pribadi bahkan keluarga secara permanen."
    },
    {
      icon: Heart,
      title: "Dampak Neurobiologi & Adiksi",
      content: "Aktivitas judi memicu pelepasan dopamin secara berlebihan, mirip dengan efek penggunaan narkotika. Otak pemain perlahan akan mengalami desensitisasi, di mana mereka tidak lagi mengejar kemenangan, melainkan mengejar sensasi 'putaran mesin' itu sendiri. Ini menjelaskan mengapa orang tetap bermain meski saldo mereka sudah nol."
    },
    {
      icon: Scale,
      title: "Konsekuensi Hukum di Indonesia",
      content: "Di Indonesia, aktivitas perjudian online dilarang secara tegas oleh UU ITE. Selain risiko finansial, pelaku dan penyelenggara judi online terancam hukuman pidana penjara dan denda yang sangat besar. Privasi data Anda juga terancam karena banyak situs judi ilegal dikelola oleh sindikat kejahatan siber."
    },
    {
      icon: AlertTriangle,
      title: "Tanda-tanda Kecanduan",
      content: "Merasa gelisah saat tidak bermain, menggunakan uang kebutuhan pokok untuk berjudi, hingga berbohong kepada keluarga adalah tanda awal kecanduan. Jika Anda atau orang terdekat mengalami hal ini, segera cari bantuan profesional atau komunitas pendukung sebelum dampak sosial dan mental semakin parah."
    }
  ];

  return (
    <div className="page-container" style={{ paddingBottom: '30px' }}>
      <div className="header" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
          <BookOpen className="text-secondary" size={32} />
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', margin: 0 }}>Artikel <span className="text-secondary">Edukasi</span></h1>
        </div>
        <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Kumpulan informasi faktual untuk membantu Anda memahami dampak buruk perjudian terhadap kehidupan nyata.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {articles.map((article, index) => (
          <ArticleItem key={index} {...article} />
        ))}
      </div>

      <div className="glass-panel" style={{ marginTop: '40px', padding: '25px', textAlign: 'center', maxWidth: '800px', margin: '40px auto 0' }}>
        <h3 className="outfit" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Butuh Bantuan?</h3>
        <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '20px' }}>
          Jangan hadapi sendirian. Banyak layanan konseling gratis yang tersedia untuk membantu Anda lepas dari jeratan adiksi judi online.
        </p>
        <button className="btn-primary" style={{ fontSize: '0.9rem', padding: '10px 25px' }}>
          HUBUNGI LAYANAN BANTUAN
        </button>
      </div>
    </div>
  );
};

export default Education;
