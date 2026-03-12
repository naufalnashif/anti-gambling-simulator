import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import Simulator from './pages/Simulator';
import Strategy from './pages/Strategy';
import Education from './pages/Education';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('simulator');

  const renderContent = () => {
    switch (activeTab) {
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
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;
