import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import Strategy from './pages/Strategy';
import Education from './pages/Education';
import TutorialOverlay from './components/TutorialOverlay';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  // Auto-start tutorial on first visit
  React.useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenZeusTutorialV3');
    if (!hasSeenTutorial) {
      setTimeout(() => setIsTutorialActive(true), 2000);
    }
  }, []);

  const tutorialSteps = [
    // PHASE 1: HOME & SIDEBAR
    {
      title: "Selamat Datang di Zeus Casino",
      message: "Mari belajar bagaimana sistem judi online sebenarnya bekerja. Kami akan membimbing Anda langkah demi langkah dalam simulasi edukasi ini.",
      targetId: null,
      action: () => setTutorialStep(1)
    },
    {
      title: "Navigasi Konten",
      message: window.innerWidth <= 768 
        ? "Klik icon menu (burger) untuk membuka navigasi utama." 
        : "Anda dapat berpindah antar halaman melalui sidebar ini.",
      targetId: window.innerWidth <= 768 ? 'mobile-burger' : 'nav-home',
      action: () => setTutorialStep(2)
    },
    {
      title: "Menu Simulasi",
      message: "Dari sini Anda bisa mengakses simulasi game, strategi bandar, dan artikel edukasi penting.",
      targetId: 'nav-simulator',
      action: () => setTutorialStep(3)
    },
    {
      title: "Siap Untuk Mencoba?",
      message: "Klik tombol 'MULAI SIMULASI' untuk masuk ke dalam pusat kendali algoritma.",
      targetId: 'home-start-btn',
      action: () => {
        setActiveTab('simulator');
        setTimeout(() => setTutorialStep(4), 1000); // Wait for page to render
      }
    },
    // PHASE 2: SIMULATOR SETUP
    {
      title: "Inisialisasi Modal",
      message: "Tunggu sebentar... Kita masuk ke tahap persiapan. Perhatikan saldo awal Anda.",
      targetId: 'setup-panel',
      action: () => setTutorialStep(5),
      shouldScroll: true
    },
    {
      title: "Saldo Virtual Anda",
      message: "Masukkan nominal modal yang ingin Anda simulasikan. Ingat, ini adalah saldo virtual untuk tujuan edukasi.",
      targetId: 'setup-panel',
      action: () => setTutorialStep(6)
    },
    {
      title: "Konfirmasi Bermain",
      message: "Klik 'MULAI BERMAIN' untuk mengaktifkan mesin slot. Setelah ini, kita akan menunggu sistem menyiapkan ribuan algoritma jebakan untuk Anda.",
      targetId: 'start-game-btn',
      action: () => {
        // The user manually clicks or it happens via submit
        // We wait for the game to start and the UI to settle
        setTimeout(() => setTutorialStep(7), 2000); 
      }
    },
    // PHASE 3: GAMEPLAY
    {
      title: "Sistem Siap!",
      message: "Selamat datang di meja judi. Perhatikan sekeliling Anda sebelum mulai memutar keberuntungan.",
      targetId: 'balance-container',
      action: () => setTutorialStep(8),
      shouldScroll: true
    },
    {
      title: "Monitor Saldo",
      message: "Ini adalah saldo Anda. Perhatikan bagaimana ia akan 'menari' naik turun, namun secara matematis akan terus tergerus.",
      targetId: 'balance-container',
      action: () => setTutorialStep(9)
    },
    {
      title: "Pilih Taruhan (Bet)",
      message: "Pilihlah besaran taruhan yang Anda inginkan (misal 100K). Besaran bet yang tinggi akan mempercepat fase kebangkrutan.",
      targetId: 'bet-selection',
      action: () => setTutorialStep(10)
    },
    {
      title: "Mesin Slot",
      message: "Visual ini hanyalah kosmetik. Semua hasil putaran sudah ditentukan oleh RNG (Random Number Generator) yang dimanipulasi bandar.",
      targetId: 'slot-machine-container',
      action: () => setTutorialStep(11)
    },
    {
      title: "Putar Mesin (Spin)",
      message: "Klik SPIN untuk memulai. Ingat, setiap klik adalah langkah menuju kerugian nyata jika ini terjadi di dunia asli.",
      targetId: 'spin-btn',
      action: () => setTutorialStep(12)
    },
    {
      title: "Statistik & Riwayat",
      message: "Pantau statistik kekalahan Anda di sini. Riwayat saldo akan menunjukkan grafik penurunan yang tajam.",
      targetId: 'stats-container',
      action: () => setTutorialStep(13)
    },
    {
      title: "Menjadi Bandar",
      message: "Jika Anda ingin tahu rahasia di balik kemenangan bandar, silakan buka panel kendali ini.",
      targetId: 'become-bandar-btn',
      action: () => setTutorialStep(14)
    },
    // PHASE 4: STRATEGY & EDUCATION
    {
      title: "Pahami Strategi Mereka",
      message: "Sekarang mari kita pindah ke halaman Strategi Bandar untuk membongkar trik yang mereka gunakan.",
      targetId: 'nav-strategy',
      action: () => {
        setActiveTab('strategy');
        setTimeout(() => setTutorialStep(15), 1000);
      }
    },
    {
      title: "Kamus Taktik Bandar",
      message: "Di sini Anda bisa membaca detail tentang Hook Phase, Near Miss, dan teknik manipulasi lainnya.",
      targetId: 'strategy-header',
      action: () => setTutorialStep(16),
      shouldScroll: true
    },
    {
      title: "Daftar Strategi",
      message: "Klik pada setiap item untuk memperdalam pemahaman Anda tentang bagaimana Anda dijebak secara matematis.",
      targetId: 'strategy-list',
      action: () => {
        setActiveTab('education');
        setTimeout(() => setTutorialStep(17), 1000);
      }
    },
    {
      title: "Edukasi & Dampak Nyata",
      message: "Terakhir, halaman Edukasi akan memberikan gambaran dampak sosial dan hukum dari perjudian online.",
      targetId: 'education-header',
      action: () => setTutorialStep(18),
      shouldScroll: true
    },
    {
      title: "Artikel Penting",
      message: "Baca artikel-artikel ini untuk memahami bahwa judi online bukan sekadar permainan, tapi ancaman nyata bagi masa depan.",
      targetId: 'education-list',
      action: () => {
        setIsTutorialActive(false);
        localStorage.setItem('hasSeenZeusTutorialV3', 'true');
        setActiveTab('home'); // Send back home after completion
      }
    }
  ];

  const handleFinishTutorial = () => {
    setIsTutorialActive(false);
    localStorage.setItem('hasSeenZeusTutorialV3', 'true');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onStart={() => setActiveTab('simulator')} />;
      case 'simulator':
        return <Simulator />;
      case 'strategy':
        return <Strategy />;
      case 'education':
        return <Education />;
      default:
        return <Simulator />;
    }
  };

  return (
    <div className="app-root">
      <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </MainLayout>

      <TutorialOverlay 
        active={isTutorialActive}
        steps={tutorialSteps}
        currentStepIndex={tutorialStep}
        onFinish={handleFinishTutorial}
      />
    </div>
  );
}

export default App;
