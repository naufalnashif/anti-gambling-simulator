import React, { useState } from 'react';
import {
  BookOpen, ChevronDown, AlertTriangle, Heart, Scale, Wallet,
  Users, RefreshCw, CreditCard, Flag, Phone, ExternalLink, CheckCircle, XCircle
} from 'lucide-react';
import '../index.css';

const ArticleItem = ({ icon: Icon, title, tag, content, tagColor = '#00e5ff' }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="glass-panel"
      style={{
        marginBottom: '14px', overflow: 'hidden',
        border: isOpen ? `1px solid ${tagColor}44` : '1px solid rgba(255,255,255,0.06)',
        transition: 'border 0.3s',
      }}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '18px 22px', display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', cursor: 'pointer',
          background: isOpen ? `rgba(255,255,255,0.03)` : 'transparent',
          transition: 'background 0.3s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
            background: `${tagColor}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={22} color={tagColor} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: '0.63rem', fontWeight: '700', color: tagColor, textTransform: 'uppercase', letterSpacing: '1px', background: `${tagColor}18`, padding: '2px 8px', borderRadius: '20px', display: 'inline-block', marginBottom: '4px' }}>
              {tag}
            </span>
            <h3 className="outfit" style={{ fontSize: '1.05rem', margin: 0, fontWeight: '700' }}>{title}</h3>
          </div>
        </div>
        <div style={{ color: '#555', marginLeft: '12px', flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
          <ChevronDown size={20} />
        </div>
      </div>
      {isOpen && (
        <div style={{
          padding: '18px 22px 22px',
          fontSize: '0.93rem', lineHeight: '1.75', color: '#ccc',
          borderTop: `1px solid ${tagColor}22`,
        }}>
          {content}
        </div>
      )}
    </div>
  );
};

const QuizQuestion = ({ question, options, correctIndex, explanation }) => {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ marginBottom: '20px', padding: '18px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
      <p style={{ fontWeight: '600', margin: '0 0 14px', color: '#fff', lineHeight: '1.5' }}>{question}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === correctIndex;
          let bg = 'rgba(255,255,255,0.04)';
          let border = '1px solid rgba(255,255,255,0.08)';
          let color = '#ccc';
          if (isSelected) {
            bg = isCorrect ? 'rgba(74,222,128,0.12)' : 'rgba(244,63,94,0.12)';
            border = `1px solid ${isCorrect ? '#4ade80' : '#f43f5e'}`;
            color = isCorrect ? '#4ade80' : '#f43f5e';
          }
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              disabled={selected !== null}
              style={{
                padding: '10px 14px', background: bg, border, borderRadius: '8px',
                color, fontSize: '0.88rem', cursor: selected !== null ? 'default' : 'pointer',
                textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s',
              }}
            >
              {selected !== null && isSelected && (isCorrect
                ? <CheckCircle size={16} color="#4ade80" style={{ flexShrink: 0 }} />
                : <XCircle size={16} color="#f43f5e" style={{ flexShrink: 0 }} />
              )}
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', fontSize: '0.85rem', color: '#aaa', lineHeight: '1.5' }}>
          💡 {explanation}
        </div>
      )}
    </div>
  );
};

const Hotline = ({ name, number, desc, color = '#00e5ff' }) => (
  <div style={{
    display: 'flex', alignItems: 'flex-start', gap: '14px',
    padding: '16px 18px', background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px', border: '1px solid rgba(255,255,255,0.07)',
    marginBottom: '10px',
  }}>
    <div style={{
      width: '42px', height: '42px', borderRadius: '10px', background: `${color}18`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <Phone size={20} color={color} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>{name}</div>
      <div style={{ fontWeight: '800', color, fontSize: '1.05rem', fontFamily: "'Outfit', sans-serif", marginBottom: '2px' }}>{number}</div>
      <div style={{ fontSize: '0.8rem', color: '#777' }}>{desc}</div>
    </div>
  </div>
);

const StatCard = ({ value, label, color = '#f43f5e' }) => (
  <div style={{ textAlign: 'center', padding: '18px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: '800', color, fontFamily: "'Outfit', sans-serif" }}>{value}</div>
    <div style={{ fontSize: '0.78rem', color: '#999', marginTop: '5px', lineHeight: '1.4' }}>{label}</div>
  </div>
);

const Education = () => {
  const articles = [
    {
      icon: Wallet,
      title: 'Lingkaran Setan Finansial',
      tag: 'Finansial',
      tagColor: '#f43f5e',
      content: (
        <div>
          <p>Judi online adalah akselerator kemiskinan yang paling efektif. Pola yang terjadi hampir selalu sama: kalah → pinjol → judi lagi → kalah lagi → makin dalam utang.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', margin: '14px 0' }}>
            <StatCard value="68%" label="Korban judi online memiliki utang pinjol bersamaan" />
            <StatCard value="3-5x" label="Rata-rata utang meningkat setelah kecanduan judi" color="#f59e0b" />
            <StatCard value="12%" label="Berhasil melunasi utang tanpa bantuan profesional" color="#4ade80" />
          </div>
          <p><strong style={{color:'#fff'}}>Siklus Spiral Maut:</strong></p>
          <ol style={{ paddingLeft: '20px', margin: '8px 0', lineHeight: '2' }}>
            <li>Kalah di slot → tekad "balik modal" → taruhan lebih besar</li>
            <li>Saldo habis → ajukan pinjol dengan bunga tinggi (0.4–2.5%/hari)</li>
            <li>Gunakan dana pinjol untuk judi → kalah kembali dengan modal lebih besar</li>
            <li>Pinjol mengejar → ajukan pinjol baru untuk bayar pinjol lama</li>
            <li>Relasi keluarga, pekerjaan, dan kesehatan mental hancur secara bersamaan</li>
          </ol>
          <div style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '10px', padding: '12px 14px', marginTop: '12px' }}>
            <strong style={{color:'#f43f5e'}}>📊 Data OJK 2023:</strong> Lebih dari 40% kasus pinjaman online bermasalah yang ditangani OJK memiliki korelasi dengan aktivitas perjudian online.
          </div>
        </div>
      ),
    },
    {
      icon: Heart,
      title: 'Dampak Neurobiologi & Adiksi',
      tag: 'Kesehatan',
      tagColor: '#f43f5e',
      content: (
        <div>
          <p>Dari sudut pandang ilmu saraf, kecanduan judi adalah gangguan neurologis yang nyata — bukan sekadar masalah moral atau kelemahan karakter.</p>
          <p><strong style={{color:'#fff'}}>Apa yang Terjadi di Otak Anda:</strong></p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0', lineHeight: '1.9' }}>
            <li><strong>Dopamine Rush:</strong> Setiap spin mengantisipasi "mungkin menang" memicu lonjakan dopamin yang mirip efek kokain dosis rendah.</li>
            <li><strong>Desensitisasi:</strong> Otak beradaptasi dan membutuhkan stimulus lebih besar untuk respons yang sama — mendorong kenaikan taruhan.</li>
            <li><strong>Prefrontal Cortex Shutdown:</strong> Area pengambilan keputusan rasional melemah — inilah mengapa pemain terus bermain meski tahu akan kalah.</li>
            <li><strong>Cortisol Elevation:</strong> Levels stres kronis meningkat, menyebabkan kecemasan, insomnia, dan depresi bahkan di luar sesi bermain.</li>
          </ul>
          <div style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '10px', padding: '12px 14px', marginTop: '12px' }}>
            <strong style={{color:'#f43f5e'}}>🔬 Riset:</strong> WHO (World Health Organization) secara resmi mengklasifikasikan gangguan perjudian (<em>Gambling Disorder</em>) sebagai penyakit mental dalam ICD-11 sejak 2019, setara dengan ketergantungan pada zat adiktif.
          </div>
        </div>
      ),
    },
    {
      icon: Scale,
      title: 'Konsekuensi Hukum di Indonesia',
      tag: 'Hukum',
      tagColor: '#a78bfa',
      content: (
        <div>
          <p>Indonesia adalah negara dengan regulasi perjudian paling ketat di Asia Tenggara. Tidak ada satu pun bentuk perjudian yang legal (kecuali untuk WNA di kepulauan tertentu yang kini juga sudah dihapus).</p>
          <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '10px', padding: '14px 16px', margin: '12px 0' }}>
            <p style={{ margin: '0 0 8px', fontWeight: '700', color: '#a78bfa' }}>⚖️ Dasar Hukum yang Berlaku:</p>
            <ul style={{ paddingLeft: '20px', margin: 0, lineHeight: '2' }}>
              <li><strong>KUHP Pasal 303:</strong> Pelaku perjudian dipidana penjara maksimal <strong>10 tahun</strong> atau denda Rp25 juta.</li>
              <li><strong>KUHP Pasal 303 bis:</strong> Pemain perjudian dipidana penjara maksimal <strong>4 tahun</strong> atau denda Rp10 juta.</li>
              <li><strong>UU No. 11/2008 (UU ITE) Pasal 27 ayat (2):</strong> Transmisi konten perjudian secara elektronik dipidana penjara <strong>6 tahun</strong> dan denda Rp1 miliar.</li>
              <li><strong>UU No. 8/2010 tentang TPPU:</strong> Pencucian uang hasil judi dipidana penjara <strong>5–15 tahun</strong>.</li>
            </ul>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#999', fontStyle: 'italic' }}>Catatan: Hukum berlaku baik untuk penyelenggara maupun pemain. Penegakan aktif terus dilakukan oleh Satgas Judol bersama Polri dan Kominfo.</p>
        </div>
      ),
    },
    {
      icon: AlertTriangle,
      title: 'Tanda-Tanda Kecanduan Judi',
      tag: 'Self-Check',
      tagColor: '#f59e0b',
      content: (
        <div>
          <p>Kecanduan judi seringkali tidak disadari oleh pelakunya sendiri. Berikut tanda-tanda yang perlu diwaspadai:</p>
          {[
            'Berpikir tentang judi sepanjang hari, merencanakan kapan akan main lagi.',
            'Perlu bertaruh dengan jumlah yang semakin besar untuk mendapat sensasi yang sama.',
            'Merasa gelisah, mudah marah, atau cemas saat mencoba berhenti.',
            'Berbohong kepada keluarga atau teman tentang aktivitas judi.',
            'Menggunakan uang kebutuhan pokok (makan, kontrakan, sekolah anak) untuk berjudi.',
            'Pernah mencoba berhenti berkali-kali tapi selalu kembali.',
            '"Chasing losses" — terus bermain untuk mencoba mengembalikan uang yang sudah kalah.',
            'Kehilangan minat pada hobi, pekerjaan, atau hubungan sosial lainnya.',
          ].map((sign, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', padding: '10px 12px', background: 'rgba(245,158,11,0.05)', borderRadius: '8px', border: '1px solid rgba(245,158,11,0.1)' }}>
              <AlertTriangle size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{sign}</span>
            </div>
          ))}
          <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '10px', padding: '12px 14px', marginTop: '6px' }}>
            <strong style={{color:'#f59e0b'}}>Jika Anda mengalami 3 atau lebih tanda di atas, segera cari bantuan profesional. Ini bukan kelemahan — ini adalah kondisi medis yang bisa ditangani.</strong>
          </div>
        </div>
      ),
    },
    {
      icon: Users,
      title: 'Dampak Sosial & Keluarga',
      tag: 'Sosial',
      tagColor: '#00e5ff',
      content: (
        <div>
          <p>Kecanduan judi bukan hanya menghancurkan individu — ia menyerang seluruh ekosistem keluarga dan sosial sekitarnya.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', margin: '14px 0' }}>
            <StatCard value="73%" label="Korban mengalami keretakan rumah tangga serius" color="#00e5ff" />
            <StatCard value="2.5x" label="Risiko bunuh diri lebih tinggi pada pecandu judi" color="#f43f5e" />
            <StatCard value="5-7" label="Anggota keluarga terdampak untuk setiap 1 pecandu" color="#f59e0b" />
          </div>
          <p><strong style={{color:'#fff'}}>Pola Dampak yang Umum Terjadi:</strong></p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0', lineHeight: '2' }}>
            <li>Konflik rumah tangga meningkat seiring habisnya dana keluarga untuk judi.</li>
            <li>Anak-anak kekurangan perhatian dan dukungan finansial untuk pendidikan.</li>
            <li>Pemain sering menjual barang berharga keluarga tanpa sepengetahuan pasangan.</li>
            <li>Isolasi sosial: menarik diri dari teman dan keluarga karena malu atau untuk menyembunyikan kecanduan.</li>
            <li>Produktivitas kerja menurun drastis — sering absen, tidak fokus, performance buruk.</li>
          </ul>
        </div>
      ),
    },
    {
      icon: RefreshCw,
      title: 'Cara Pemulihan — 7 Langkah Recovery',
      tag: 'Pemulihan',
      tagColor: '#4ade80',
      content: (
        <div>
          <p>Pemulihan dari kecanduan judi adalah perjalanan, bukan tujuan tunggal. Namun dengan pendekatan yang tepat, ribuan orang telah berhasil keluar dari jerat ini.</p>
          {[
            { step: 1, title: 'Akui & Sadari', desc: 'Langkah terpenting: akui kepada diri sendiri bahwa Anda memiliki masalah. Tanpa pengakuan, pemulihan tidak bisa dimulai.' },
            { step: 2, title: 'Blokir Akses', desc: 'Hapus semua aplikasi judi, blokir situs via DNS, berikan kontrol keuangan sementara kepada orang yang dipercaya.' },
            { step: 3, title: 'Cari Dukungan Profesional', desc: 'Hubungi psikolog atau konselor adiksi. Terapi Cognitive Behavioral (CBT) terbukti efektif untuk kecanduan judi.' },
            { step: 4, title: 'Bergabung Komunitas Support', desc: 'Gamblers Anonymous (GA) tersedia di beberapa kota besar Indonesia. Berbicara dengan sesama yang juga berjuang sangat membantu.' },
            { step: 5, title: 'Restrukturisasi Keuangan', desc: 'Konsultasikan utang dengan OJK atau lembaga bantuan hukum. Buat rencana pembayaran yang realistis.' },
            { step: 6, title: 'Bangun Rutinitas Baru', desc: 'Isi waktu dengan aktivitas positif: olahraga, hobi, belajar skill baru. Kebosanan adalah pemicu kekambuhan.' },
            { step: 7, title: 'Pantau & Jaga Jangka Panjang', desc: 'Pemulihan adalah proses seumur hidup. Waspadai trigger (stres, FOMO, lingkungan lama) dan punya rencana jika kambuh.' },
          ].map(({ step, title, desc }) => (
            <div key={step} style={{ display: 'flex', gap: '14px', marginBottom: '12px', padding: '12px 14px', background: 'rgba(74,222,128,0.05)', borderRadius: '10px', border: '1px solid rgba(74,222,128,0.1)' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(74,222,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: '800', color: '#4ade80', fontFamily: "'Outfit'" }}>
                {step}
              </div>
              <div>
                <div style={{ fontWeight: '700', color: '#fff', marginBottom: '4px' }}>{title}</div>
                <div style={{ fontSize: '0.87rem', color: '#bbb', lineHeight: '1.5' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: CreditCard,
      title: 'Pinjol & Judi Online: Spiral Maut Indonesia',
      tag: 'Finansial',
      tagColor: '#f43f5e',
      content: (
        <div>
          <p>Indonesia menghadapi fenomena unik: ekosistem judi online dan pinjaman online ilegal yang saling memperkuat dalam siklus menghancurkan.</p>
          <p><strong style={{color:'#fff'}}>Mengapa Keduanya Saling Mengunci Korban:</strong></p>
          <ul style={{ paddingLeft: '20px', margin: '8px 0', lineHeight: '2' }}>
            <li>Pinjol ilegal menawarkan pinjaman instan tanpa syarat → mudah diakses saat saldo habis.</li>
            <li>Bunga harian 0.8–2.5% artinya pinjaman Rp1jt menjadi Rp2.5–3jt dalam 30 hari.</li>
            <li>Debt collector pinjol ilegal menggunakan intimidasi yang memaksa korban cari "cara cepat" — kembali ke judi.</li>
            <li>Bandar judi sering berafiliasi atau bahkan dimiliki oleh operator pinjol ilegal yang sama.</li>
          </ul>
          <div style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: '10px', padding: '12px 14px', marginTop: '12px' }}>
            <strong style={{color:'#f43f5e'}}>📊 PPATK 2023:</strong> Transaksi mencurigakan yang terkait judi online mencapai Rp <strong>139 triliun</strong> pada H1 2023 — hampir setengah dari perputaran tahunan, dan meningkat 90% dari tahun sebelumnya.
          </div>
        </div>
      ),
    },
    {
      icon: Flag,
      title: 'Cara Melaporkan & Memblokir Situs Judi',
      tag: 'Tindakan',
      tagColor: '#4ade80',
      content: (
        <div>
          <p>Anda bisa berkontribusi dalam pemberantasan judi online dengan melaporkan situs yang Anda temukan. Berikut langkah-langkahnya:</p>
          {[
            { title: 'Kominfo (Kementerian Komunikasi)', url: 'aduankonten.id', desc: 'Laporkan URL situs judi. Rata-rata pemblokiran dalam 1×24 jam.' },
            { title: 'Bareskrim Polri', url: 'patrolisiber.id', desc: 'Lapor tindak pidana penyelenggaraan judi online beserta bukti.' },
            { title: 'OJK (Otoritas Jasa Keuangan)', url: 'kontak.ojk.go.id', desc: 'Lapor pinjol dan layanan keuangan ilegal yang berkaitan dengan judi.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px', padding: '12px 14px', background: 'rgba(74,222,128,0.05)', borderRadius: '10px', border: '1px solid rgba(74,222,128,0.1)' }}>
              <ExternalLink size={18} color="#4ade80" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: '700', color: '#fff' }}>{item.title}</div>
                <div style={{ fontSize: '0.82rem', color: '#4ade80', marginBottom: '2px' }}>{item.url}</div>
                <div style={{ fontSize: '0.82rem', color: '#888' }}>{item.desc}</div>
              </div>
            </div>
          ))}
          <p style={{ fontSize: '0.85rem', color: '#777', fontStyle: 'italic', marginTop: '10px' }}>Setiap laporan membantu melindungi orang lain dari jerat yang sama. Satu laporan bisa menyelamatkan ratusan korban baru.</p>
        </div>
      ),
    },
  ];

  const quizQuestions = [
    {
      question: '1. Anda kalah Rp500.000. Reaksi pertama Anda adalah...',
      options: ['Berhenti dan terima kenyataan', 'Deposit lagi untuk "balik modal"', 'Istirahat sebentar lalu coba lagi', 'Marah pada sistem dan berhenti'],
      correctIndex: 0,
      explanation: 'Menerima kerugian dan berhenti adalah satu-satunya respons sehat. "Balik modal" adalah pemikiran yang mendorong spiral kerugian lebih dalam.',
    },
    {
      question: '2. Tanda paling awal kecanduan judi adalah...',
      options: ['Sudah tidak punya uang sama sekali', 'Selalu memikirkan kapan bisa main lagi', 'Kalah lebih dari 5 kali berturut-turut', 'Berbohong kepada semua anggota keluarga'],
      correctIndex: 1,
      explanation: 'Preokupasi mental terhadap judi (selalu memikirikannya) adalah tanda awal yang paling kritis dan sering diabaikan.',
    },
    {
      question: '3. Bonus "New Member 100%" dari situs judi...',
      options: ['Kesempatan emas yang sayang dilewatkan', 'Strategi marketing dengan syarat rollover yang merugikan', 'Bukti situs tersebut fair dan terpercaya', 'Hanya untuk pemain baru yang belum tahu cara main'],
      correctIndex: 1,
      explanation: 'Bonus selalu datang dengan syarat rollover (turnover) yang jauh lebih besar dari nilai bonus. Secara matematika, hampir mustahil menguntungkan pemain.',
    },
    {
      question: '4. "Pola gacor jam 3 pagi" yang beredar di media sosial adalah...',
      options: ['Informasi valid berdasarkan algoritma slot', 'Mitos yang diciptakan untuk mendorong lebih banyak deposit', 'Strategi Pro yang hanya diketahui pemain tertentu', 'Fitur resmi yang bisa diakses dengan modal besar'],
      correctIndex: 1,
      explanation: 'Algoritma slot tidak peduli jam atau hari. "Pola gacor" adalah konten viral yang justru menguntungkan bandar karena mendorong orang untuk deposit dan main.',
    },
    {
      question: '5. Jika teman Anda mulai sering bicara soal judi online, langkah terbaik adalah...',
      options: ['Ikut bermain agar bisa "menemaninya"', 'Diam saja karena itu urusan pribadi', 'Ajak bicara dengan empati dan tawarkan bantuan profesional', 'Laporkan ke polisi langsung'],
      correctIndex: 2,
      explanation: 'Pendekatan empatik non-judgmental adalah yang paling efektif. Referensikan ke layanan profesional atau hotline yang tersedia.',
    },
  ];

  return (
    <div className="page-container" style={{ paddingBottom: '40px' }}>
      {/* Header */}
      <div className="header" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '12px' }}>
          <BookOpen style={{ color: 'var(--accent-secondary)' }} size={34} />
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', margin: 0 }}>
            Artikel <span style={{ color: 'var(--accent-secondary)' }}>Edukasi</span>
          </h1>
        </div>
        <p style={{ maxWidth: '620px', margin: '0 auto 24px', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          Informasi faktual, berbasis riset, dan mendalam tentang dampak nyata perjudian online terhadap kehidupan — dari aspek neurologis hingga hukum, finansial, dan sosial.
        </p>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', maxWidth: '700px', margin: '0 auto' }}>
          <StatCard value="2.7 Juta" label="Remaja usia 10–17 tahun terlibat judi online" />
          <StatCard value="Rp87jt" label="Rata-rata kerugian per korban per tahun" color="#f59e0b" />
          <StatCard value="90%" label="Korban tidak pernah mendapat kemenangan bersih" color="#a78bfa" />
        </div>
      </div>

      {/* Articles */}
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        {articles.map((article, index) => (
          <ArticleItem key={index} {...article} />
        ))}
      </div>

      {/* Divider */}
      <div style={{ maxWidth: '820px', margin: '36px auto 0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '36px' }}>
        {/* Quiz Section */}
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '24px', border: '1px solid rgba(245,158,11,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <div style={{ padding: '10px', background: 'rgba(245,158,11,0.12)', borderRadius: '12px' }}>
              <AlertTriangle size={22} color="#f59e0b" />
            </div>
            <div>
              <h2 className="outfit" style={{ margin: 0, fontSize: '1.3rem', color: '#f59e0b' }}>Self-Assessment Quiz</h2>
              <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#777' }}>Uji pemahaman Anda tentang judi online • 5 pertanyaan</p>
            </div>
          </div>
          <p style={{ color: '#aaa', fontSize: '0.9rem', margin: '14px 0 20px', lineHeight: '1.6' }}>
            Quiz ini dirancang untuk menguji pemahaman dan refleksi diri. Tidak ada jawaban yang "sempurna" — yang terpenting adalah kejujuran kepada diri sendiri.
          </p>
          {quizQuestions.map((q, i) => (
            <QuizQuestion key={i} {...q} />
          ))}
        </div>

        {/* Hotline Section */}
        <div className="glass-panel" style={{ padding: '28px', border: '1px solid rgba(74,222,128,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '10px', background: 'rgba(74,222,128,0.12)', borderRadius: '12px' }}>
              <Phone size={22} color="#4ade80" />
            </div>
            <div>
              <h2 className="outfit" style={{ margin: 0, fontSize: '1.3rem', color: '#4ade80' }}>Butuh Bantuan? Hubungi Sekarang</h2>
              <p style={{ margin: '2px 0 0', fontSize: '0.82rem', color: '#777' }}>Semua layanan bersifat rahasia dan sebagian besar gratis</p>
            </div>
          </div>
          <Hotline name="Into The Light Indonesia (Kesehatan Mental)" number="119 ext 8" desc="Hotline nasional, 24 jam. Konseling gratis untuk krisis mental, termasuk adiksi." color="#4ade80" />
          <Hotline name="Yayasan Pulih (Konseling Adiksi)" number="(021) 788-42580" desc="Layanan psikologis profesional, termasuk asesmen dan terapi adiksi perilaku." color="#00e5ff" />
          <Hotline name="Kemensos (Crisis Center)" number="1500-229" desc="Layanan Kementerian Sosial untuk krisis sosial dan ekonomi, termasuk dampak judi." color="#a78bfa" />
          <Hotline name="Aduan Judi Online - Kominfo" number="aduan.id" desc="Laporkan situs judi online. Kunjungi aduankonten.id untuk pelaporan resmi." color="#f59e0b" />
          <div style={{ marginTop: '16px', padding: '14px 16px', background: 'rgba(74,222,128,0.05)', borderRadius: '10px', border: '1px solid rgba(74,222,128,0.15)', fontSize: '0.85rem', color: '#aaa', lineHeight: '1.6' }}>
            💬 <strong style={{color:'#fff'}}>Ingat:</strong> Meminta bantuan adalah tanda kekuatan, bukan kelemahan. Setiap hari Anda memilih untuk tidak berjudi adalah kemenangan nyata yang tidak bisa dicuri oleh algoritma bandar manapun.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
