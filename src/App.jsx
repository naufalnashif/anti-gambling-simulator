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

  const [dismissedPhases, setDismissedPhases] = useState([]);

  useEffect(() => {
    // Tutorial will always show on refresh as state is initialized to true
  }, []);

  const tutorialSteps = [
    {
      title: 'Selamat Datang!',
      content: 'Selamat datang di Zeus Casino. Mari kita jelajahi platform edukasi anti-judi online ini agar Anda memahami risikonya.',
      targetId: 'tutor-title',
      phase: 'home'
    },
    // Conditionally added burger step for mobile
    ...(window.innerWidth <= 768 ? [{
      title: 'Buka Menu',
      content: 'Klik burger menu untuk melihat navigasi website kami.',
      targetId: 'tutor-burger',
      phase: 'home'
    }] : []),
    {
      title: 'Menu Navigasi',
      content: 'Di sini Anda dapat berpindah antara Beranda, Simulasi, Strategi, dan Artikel Edukasi.',
      targetId: 'tutor-nav-home',
      phase: 'home'
    },
    {
      title: 'Simulasi Game',
      content: 'Fitur utama kami untuk mendemonstrasikan bagaimana uang Anda habis oleh algoritma.',
      targetId: 'tutor-nav-simulator',
      phase: 'home'
    },
    {
      title: 'Strategi Bandar',
      content: 'Pelajari taktik kotor yang digunakan bandar untuk memancing emosi pemain.',
      targetId: 'tutor-nav-strategy',
      phase: 'home'
    },
    {
      title: 'Artikel Edukasi',
      content: 'Informasi mendalam tentang dampak buruk dan cara berhenti dari judi online.',
      targetId: 'tutor-nav-education',
      phase: 'home'
    },
    {
      title: 'Mulai Simulasi',
      content: 'Klik tombol ini untuk langsung masuk ke halaman simulasi mesin slot.',
      targetId: 'tutor-start-sim',
      scroll: true,
      phase: 'home'
    },
    // The following steps appear only when entering simulator
    {
      title: 'Persiapkan Modal',
      content: 'Masukkan jumlah modal awal yang ingin Anda simulasikan (uang virtual).',
      targetId: 'tutor-setup-input',
      phase: 'setup'
    },
    {
      title: 'Konfirmasi Bermain',
      content: 'Jika sudah siap, klik Mulai Bermain untuk masuk ke dalam permainan.',
      targetId: 'tutor-setup-start',
      actionType: 'click',
      phase: 'setup'
    },
    // The final steps appear after game starts
    {
      title: 'Pantau Saldo',
      content: 'Perhatikan saldo Anda. Biasanya akan naik sedikit di awal sebelum akhirnya dikuras habis.',
      targetId: 'tutor-game-balance',
      delay: 1000,
      phase: 'game'
    },
    {
      title: 'Putar Mesin',
      content: 'Klik Spin untuk memulai permainan. Rasakan bagaimana algoritma mulai bekerja.',
      targetId: 'tutor-game-spin',
      phase: 'game'
    }
  ];

  // Filter steps based on active phases
  const activeSteps = tutorialSteps.filter(s => !dismissedPhases.includes(s.phase));

  const handleTutorialStepChange = (index) => {
    setTutorialStep(index);
    const step = activeSteps[index];

    if (!step) return;

    // Mobile specific: Open/Close menu based on step
    if (window.innerWidth <= 768) {
      if (step.targetId && step.targetId.startsWith('tutor-nav')) {
        setMobileMenuOpen(true);
      } else {
        setMobileMenuOpen(false);
      }
    }

    // Auto-navigate to correct page
    if (step.targetId) {
        if (step.targetId === 'tutor-title' || step.targetId === 'tutor-start-sim' || step.targetId === 'tutor-nav-home') {
            setActiveTab('home');
        } else if (step.targetId.startsWith('tutor-setup') || step.targetId.startsWith('tutor-game')) {
            setActiveTab('simulator');
        }
    }
  };

  const handleDismissPhase = (phase) => {
    const newDismissed = [...dismissedPhases, phase];
    setDismissedPhases(newDismissed);
    
    const nextActiveSteps = tutorialSteps.filter(s => !newDismissed.includes(s.phase));
    if (nextActiveSteps.length > 0) {
        // When dismissing a phase, we jump to the beginning of the next available phase
        setTutorialStep(0);
    } else {
        setShowTutorial(false);
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onStart={() => setActiveTab('simulator')} />;
      case 'simulator':
        return <Simulator onGameStart={() => {
            // No need to manually advance if we used actionType: 'click' on the button
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

      {showTutorial && activeSteps.length > 0 && (
        <TutorialOverlay 
          steps={activeSteps} 
          onComplete={handleTutorialComplete}
          onStepChange={handleTutorialStepChange}
          onDismiss={handleDismissPhase}
        />
      )}
    </>
  );
}

export default App;
