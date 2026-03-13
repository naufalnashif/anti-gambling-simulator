import React, { useState, useEffect } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import Strategy from './pages/Strategy';
import Education from './pages/Education';
import TutorialOverlay from './components/TutorialOverlay';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [gamePhaseStarted, setGamePhaseStarted] = useState(false);

  const isMobile = window.innerWidth <= 768;

  const tutorialSteps = [
    // ── HOME PAGE STEPS ──────────────────────────────────────────
    {
      title: '👋 Selamat Datang!',
      content: 'Selamat datang di Zeus Casino — platform edukasi anti-judi online. Tutorial singkat ini akan memandu Anda menjelajahi fitur-fiturnya.',
      targetId: 'tutor-nav-home',
    },
    // Mobile: show burger menu step first
    ...(isMobile ? [{
      title: '📱 Menu Navigasi',
      content: 'Di perangkat mobile, klik ikon menu burger ini untuk membuka navigasi antar halaman.',
      targetId: 'tutor-burger',
      actionType: 'click',
    }] : []),
    {
      title: '🏠 Beranda',
      content: 'Halaman utama yang memperkenalkan tujuan platform ini: membongkar cara kerja algorithmic gambling.',
      targetId: 'tutor-nav-home',
    },
    {
      title: '🎰 Simulasi Game',
      content: 'Fitur inti: simulasi mesin slot yang memperlihatkan bagaimana uang Anda dikuras secara sistematis oleh algoritma bandar.',
      targetId: 'tutor-nav-simulator',
    },
    {
      title: '🧠 Strategi Bandar',
      content: 'Halaman ini membongkar taktik psikologis dan matematis yang digunakan bandar untuk memastikan Anda selalu kalah.',
      targetId: 'tutor-nav-strategy',
    },
    {
      title: '📚 Artikel Edukasi',
      content: 'Kumpulan artikel informatif tentang dampak nyata judi online — dari sisi neurologis, finansial, hukum, hingga sosial.',
      targetId: 'tutor-nav-education',
    },
    {
      title: '▶️ Mulai Simulasi',
      content: 'Klik tombol ini untuk langsung memulai simulasi mesin slot. Ingat: semua uang di sini adalah virtual, tidak ada uang nyata!',
      targetId: 'tutor-start-sim',
      scroll: true,
    },
    // ── SIMULATOR SETUP STEPS ──────────────────────────────────────
    {
      title: '💰 Tentukan Modal Awal',
      content: 'Masukkan jumlah modal awal yang ingin Anda simulasikan. Coba gunakan angka yang terasa nyata bagi Anda — misalnya Rp 1.000.000 — agar pengalaman lebih terasa.',
      targetId: 'tutor-setup-input',
    },
    {
      title: '🎮 Masuk ke Permainan',
      content: 'Klik tombol "MULAI BERMAIN" untuk memulai simulasi. Perhatikan notifikasi dari "Sistem Bandar" yang muncul di sudut layar!',
      targetId: 'tutor-setup-start',
      actionType: 'click',
    },
    // ── IN-GAME STEPS (appear after game starts) ──────────────────
    {
      title: '📊 Saldo Anda',
      content: 'Ini adalah saldo virtual Anda. Di awal game, sistem bandar sengaja memberikan kemenangan untuk membuat Anda percaya game ini "gacor". Perhatikan bagaimana saldo berfluktuasi.',
      targetId: 'tutor-game-balance',
      delay: 600,
    },
    {
      title: '🎯 Pilih Besaran Taruhan',
      content: 'Pilih nominal taruhan per spin. Semakin besar taruhan, semakin cepat saldo habis. Bandar nyata sering mendorong pemain untuk "naik taruhan" saat merasa beruntung.',
      targetId: 'tutor-bet-panel',
    },
    {
      title: '🔄 Putar Mesin Slot',
      content: 'Klik tombol SPIN untuk bermain. Perhatikan bagaimana 2 spin pertama selalu cenderung menang (Fase Hook) — ini adalah manipulasi algoritma untuk menciptakan ketergantungan.',
      targetId: 'tutor-game-spin',
      actionType: 'click',
    },
    {
      title: '📋 Paytable Simbol',
      content: 'Tabel pembayaran menunjukkan multiplier tiap simbol. Di slot nyata, peluang mendapat simbol tinggi (💎 atau 7️⃣) sangat kecil — dimanipulasi oleh server bandar.',
      targetId: 'tutor-paytable',
      scroll: true,
    },
    {
      title: '🔍 Algoritma Terbongkar',
      content: 'Panel ini menampilkan "server logic" bandar yang biasanya tersembunyi. Klik untuk melihat fase aktif saat ini dan mekanik manipulasi yang sedang berjalan.',
      targetId: 'tutor-algo-panel',
      scroll: true,
    },
    {
      title: '🛡️ Mode Bandar (Fitur Unik!)',
      content: 'Coba klik "BECOME BANDAR" di sudut kanan atas! Anda bisa merasakan perspektif bandar — mengontrol win-rate, memicu fase, dan memaksa hasil spin pemain.',
      targetId: 'tutor-bandar-btn',
    },
    {
      title: '✅ Tutorial Selesai!',
      content: 'Anda sudah memahami cara kerja platform ini. Sekarang coba mainkan simulasinya sampai saldo habis — rasakan sendiri bagaimana algoritma menguras uang. Lalu kunjungi halaman Strategi & Edukasi untuk info lebih lengkap.',
      targetId: 'tutor-nav-home',
    },
  ];

  const handleTutorialStepChange = (index) => {
    setTutorialStep(index);
    const step = tutorialSteps[index];

    // Mobile: manage menu open/close
    if (isMobile) {
      if (step.targetId?.startsWith('tutor-nav') && step.actionType !== 'click') {
        setMobileMenuOpen(true);
      } else if (step.targetId !== 'tutor-burger') {
        setMobileMenuOpen(false);
      }
    }

    // Auto-navigate to correct page based on step target
    if (step.targetId) {
      if (
        step.targetId === 'tutor-nav-home' ||
        step.targetId === 'tutor-nav-strategy' ||
        step.targetId === 'tutor-nav-simulator' ||
        step.targetId === 'tutor-nav-education' ||
        step.targetId === 'tutor-start-sim' ||
        step.targetId === 'tutor-burger'
      ) {
        setActiveTab('home');
      } else if (
        step.targetId.startsWith('tutor-setup') ||
        step.targetId.startsWith('tutor-game') ||
        step.targetId.startsWith('tutor-bet') ||
        step.targetId.startsWith('tutor-paytable') ||
        step.targetId.startsWith('tutor-algo') ||
        step.targetId.startsWith('tutor-bandar')
      ) {
        setActiveTab('simulator');
      }
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onStart={() => setActiveTab('simulator')} />;
      case 'simulator':
        return <Simulator onGameStart={() => setGamePhaseStarted(true)} />;
      case 'strategy':
        return <Strategy />;
      case 'education':
        return <Education />;
      default:
        return <Simulator />;
    }
  };

  return (
    <>
      <MainLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      >
        {renderContent()}
      </MainLayout>

      {showTutorial && (
        <TutorialOverlay
          steps={tutorialSteps}
          onComplete={handleTutorialComplete}
          onStepChange={handleTutorialStepChange}
        />
      )}
    </>
  );
}

export default App;
