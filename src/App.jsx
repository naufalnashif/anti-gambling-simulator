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
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  useEffect(() => {
    const isTutorialDone = localStorage.getItem('tutorial_done');
    if (!isTutorialDone) {
      setShowTutorial(true);
    }
  }, []);

  const tutorialSteps = [
    {
      title: 'Selamat Datang!',
      content: 'Selamat datang di Zeus Casino. Mari kita jelajahi platform edukasi anti-judi online ini agar Anda memahami risikonya.',
      targetId: 'tutor-nav-home',
    },
    // Conditionally added burger step for mobile
    ...(window.innerWidth <= 768 ? [{
      title: 'Buka Menu',
      content: 'Klik burger menu untuk melihat navigasi website kami.',
      targetId: 'tutor-burger',
    }] : []),
    {
      title: 'Menu Navigasi',
      content: 'Di sini Anda dapat berpindah antara Beranda, Simulasi, Strategi, dan Artikel Edukasi.',
      targetId: 'tutor-nav-home',
    },
    {
      title: 'Simulasi Game',
      content: 'Fitur utama kami untuk mendemonstrasikan bagaimana uang Anda habis oleh algoritma.',
      targetId: 'tutor-nav-simulator',
    },
    {
      title: 'Strategi Bandar',
      content: 'Pelajari taktik kotor yang digunakan bandar untuk memancing emosi pemain.',
      targetId: 'tutor-nav-strategy',
    },
    {
      title: 'Artikel Edukasi',
      content: 'Informasi mendalam tentang dampak buruk dan cara berhenti dari judi online.',
      targetId: 'tutor-nav-education',
    },
    {
      title: 'Mulai Simulasi',
      content: 'Klik tombol ini untuk langsung masuk ke halaman simulasi mesin slot.',
      targetId: 'tutor-start-sim',
    },
    // The following steps appear only when entering simulator
    {
      title: 'Persiapkan Modal',
      content: 'Masukkan jumlah modal awal yang ingin Anda simulasikan (uang virtual).',
      targetId: 'tutor-setup-input',
    },
    {
      title: 'Konfirmasi Bermain',
      content: 'Jika sudah siap, klik Mulai Bermain untuk masuk ke dalam permainan.',
      targetId: 'tutor-setup-start',
    },
    // The final steps appear after game starts
    {
      title: 'Pantau Saldo',
      content: 'Perhatikan saldo Anda. Biasanya akan naik sedikit di awal sebelum akhirnya dikuras habis.',
      targetId: 'tutor-game-balance',
    },
    {
      title: 'Putar Mesin',
      content: 'Klik Spin untuk memulai permainan. Rasakan bagaimana algoritma mulai bekerja.',
      targetId: 'tutor-game-spin',
    }
  ];

  const handleTutorialStepChange = (index) => {
    setTutorialStep(index);
    const step = tutorialSteps[index];

    // Mobile specific: Open/Close menu based on step
    if (window.innerWidth <= 768) {
      if (step.targetId.startsWith('tutor-nav')) {
        setMobileMenuOpen(true);
      } else {
        setMobileMenuOpen(false);
      }
    }

    // Auto-navigate to correct page
    if (step.targetId === 'tutor-start-sim' || step.targetId === 'tutor-nav-home') {
      setActiveTab('home');
    } else if (step.targetId.startsWith('tutor-setup') || step.targetId.startsWith('tutor-game')) {
      setActiveTab('simulator');
    }
  };

  const handleTutorialComplete = () => {
    localStorage.setItem('tutorial_done', 'true');
    setShowTutorial(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onStart={() => setActiveTab('simulator')} />;
      case 'simulator':
        return <Simulator onGameStart={() => {
            // If in tutorial and started the game, we might want to skip to the game steps
            // This is handled by current step progression usually
        }} />;
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
