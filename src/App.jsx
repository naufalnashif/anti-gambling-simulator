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
    const hasSeenTutorial = localStorage.getItem('hasSeenZeusTutorialV2');
    if (!hasSeenTutorial) {
      setTimeout(() => setIsTutorialActive(true), 1500);
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
      message: "Masukkan nominal modal yang ingin Anda simulasikan. Ingat, ini adalah saldo virtual (gratis) untuk tujuan edukasi.",
      targetId: 'setup-panel', // Focusing the input area
      action: () => setTutorialStep(6)
    },
    {
      title: "Konfirmasi Bermain",
      message: "Klik 'MULAI BERMAIN' untuk mengaktifkan mesin slot dan melihat bagaimana uang Anda diolah sistem.",
      targetId: 'start-game-btn',
      action: () => setTutorialStep(7)
    },
    // PHASE 3: GAMEPLAY (This assumes they already clicked start, usually we'd need more logic but for tutorial flow we can just explain)
    {
      title: "Monitor Saldo Real-Time",
      message: "Di sini Anda dapat melihat saldo Anda yang akan terus berubah. Perhatikan bagaimana saldo cenderung menurun seiring waktu.",
      targetId: 'balance-container',
      action: () => setTutorialStep(8)
    },
    {
      title: "Pilih Taruhan (Bet)",
      message: "Pilihlah besaran taruhan yang Anda inginkan (misal 100K). Besaran bet akan sangat mempengaruhi seberapa cepat modal Anda habis.",
      targetId: 'bet-selection',
      action: () => setTutorialStep(9)
    },
    {
      title: "Mesin Slot Algoritma",
      message: "Ini adalah visualisasi mesin slot. Ingat, gambar yang muncul sudah ditentukan sedetik sebelum mesin berhenti berputar.",
      targetId: 'slot-machine-container',
      action: () => setTutorialStep(10)
    },
    {
      title: "Putar Mesin (Spin)",
      message: "Klik tombol SPIN untuk memulai keberuntungan semu Anda. Dalam beberapa putaran awal, kami akan memberi Anda 'Hook' (kemenangan awal).",
      targetId: 'spin-btn',
      action: () => setTutorialStep(11)
    },
    {
      title: "Aturan Main (Paytable)",
      message: "Lihat multiplier kemenangan di sini. Kemenangan besar biasanya diletakkan di awal untuk memicu dopamin Anda.",
      targetId: 'paytable-container',
      action: () => setTutorialStep(12)
    },
    {
      title: "Statistik Kebangkrutan",
      message: "Pantau total spin dan profit/loss Anda. Statistik ini tidak akan pernah berbohong tentang kerugian Anda.",
      targetId: 'stats-container',
      action: () => setTutorialStep(13)
    },
    {
      title: "Grafik Penurunan",
      message: "Lihat riwayat saldo Anda di sini. Grafik yang konsisten menurun adalah bukti nyata bahwa sistem tidak dirancang untuk pemain menang.",
      targetId: 'balance-history-container',
      action: () => setTutorialStep(14)
    },
    {
      title: "Menjadi Sang Penguasa",
      message: "Terlalu sering kalah? Klik 'BECOME BANDAR' untuk membongkar dan mengontrol mesin ini dari balik layar.",
      targetId: 'become-bandar-btn',
      action: () => setTutorialStep(15)
    },
    {
      title: "Kontrol Penuh Admin",
      message: "Sekarang Anda berada di kendali. Dashboard ini memungkinkan Anda mengatur RTP, Near-Miss, hingga Force Jackpot.",
      targetId: 'bandar-dashboard-container',
      action: () => setTutorialStep(16),
      shouldScroll: true
    },
    {
      title: "Gunakan Reset Secara Bijak",
      message: "Jika saldo habis atau ingin mencoba skenario baru, gunakan tombol RESET ini.",
      targetId: 'reset-btn',
      action: () => {
        setIsTutorialActive(false);
        localStorage.setItem('hasSeenZeusTutorialV2', 'true');
      }
    }
  ];

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
        onFinish={() => {
          setIsTutorialActive(false);
          localStorage.setItem('hasSeenZeusTutorialV2', 'true');
        }}
      />
    </div>
  );
}

export default App;
