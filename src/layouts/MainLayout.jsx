import React, { useState } from 'react';
import { Gamepad2, BrainCircuit, BookOpen, Menu, X, Play } from 'lucide-react';
import '../index.css';

const MainLayout = ({ activeTab, setActiveTab, children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Play size={20} /> },
    { id: 'simulator', label: 'Simulasi Game', icon: <Gamepad2 size={20} /> },
    { id: 'strategy', label: 'Strategi Bandar', icon: <BrainCircuit size={20} /> },
    { id: 'education', label: 'Artikel Edukasi', icon: <BookOpen size={20} /> },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="layout-wrapper">
      {/* Mobile Topbar */}
      <div className="mobile-topbar" style={{ display: window.innerWidth <= 768 ? 'flex' : 'none' }}>
        <h2 className="outfit" style={{ margin: 0, fontSize: '1.2rem' }}>
          <span className="text-gradient">Zeus</span> <span className="text-accent">Casino</span>
        </h2>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`sidebar-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-brand" style={{ display: window.innerWidth > 768 ? 'block' : 'none' }}>
          <h1 className="outfit" style={{ fontSize: '1.8rem', margin: 0 }}>
            <span className="text-gradient">Zeus</span> <span className="text-accent">Casino</span>
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>The Simulator Project</p>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map((item) => (
            <div 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div style={{ padding: '20px', fontSize: '0.75rem', color: '#666', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          Simulation & Educational Purposes Only.<br/>
          Say NO to Online Gambling.
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        {children}
      </main>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 90 }} 
        />
      )}
    </div>
  );
};

export default MainLayout;
