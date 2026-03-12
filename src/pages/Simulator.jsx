import React, { useState, useEffect, useRef } from 'react';
import SlotMachine from '../components/SlotMachine';
import BalanceChart from '../components/BalanceChart';
import { FACTS } from '../constants/facts';
import RealityCheck from '../components/RealityCheck';
import AlgorithmExposed from '../components/AlgorithmExposed';
import { AlertTriangle, TrendingDown, Info, ShieldAlert } from 'lucide-react';
import BandarControlToast from '../components/BandarControlToast';
import BandarDashboard from '../components/BandarDashboard';
import '../index.css';

const BET_OPTIONS = [10000, 50000, 100000, 500000, 1000000];

const PAYTABLE = {
  '🍒': 2,
  '🍋': 5,
  '🔔': 10,
  '💎': 20,
  '7️⃣': 50
};

function Simulator() {
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing'
  const [initialBalanceInput, setInitialBalanceInput] = useState(1000000);
  const [initialBalanceState, setInitialBalanceState] = useState(1000000);

  const [balance, setBalance] = useState(0);
  const [betAmount, setBetAmount] = useState(100000);
  const [history, setHistory] = useState([]);
  const [spinCount, setSpinCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [showRealityCheck, setShowRealityCheck] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [winStatus, setWinStatus] = useState(null);
  const [shownFactIndices, setShownFactIndices] = useState([]);
  const [currentFact, setCurrentFact] = useState('');
  const [bandarToast, setBandarToast] = useState({ visible: false, type: '', message: '' });
  const [hasShownNearMiss, setHasShownNearMiss] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  // Bandar Mode States
  const [isBandarMode, setIsBandarMode] = useState(false);
  const [bandarSettings, setBandarSettings] = useState({
    winChance: 0.15,
    nearMissChance: 0.65,
    activePhase: 'drain'
  });
  const [forcedOutcome, setForcedOutcome] = useState(null); // 'jackpot', 'win', 'lose', null
  const bandarRef = useRef(null);

  useEffect(() => {
    if (isBandarMode && bandarRef.current) {
      bandarRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isBandarMode]);

  const items = ['🍒', '🍋', '🔔', '💎', '7️⃣'];

  const startGame = (e) => {
    e.preventDefault();
    if (initialBalanceInput < 10000) {
      alert(`Modal awal minimal Rp 10.000 untuk bisa bermain.`);
      return;
    }
    setInitialBalanceState(initialBalanceInput);
    setBalance(initialBalanceInput);
    setHistory([{ spin: 0, balance: initialBalanceInput }]);
    setGameState('playing');

    // Scenario: High-Value Target
    if (initialBalanceInput >= 5000000) {
      triggerBandarToast('high-value', 'Saldo besar terdeteksi. Mengaktifkan algoritma "Whale Trap" untuk memastikan pemain ini tidak berhenti sampai saldo nol.');
    } else {
      triggerBandarToast('hook', 'Pemain baru terdeteksi. Memberikan kemenangan awal yang tinggi untuk memancing dopamin dan ketergantungan.');
    }
  };

  const triggerBandarToast = (type, message) => {
    setBandarToast({ visible: true, type, message });
    // Automatically hide after 5 seconds
    setTimeout(() => {
      setBandarToast(prev => ({ ...prev, visible: false }));
    }, 5000);
  };

  const getPhase = () => {
    if (isBandarMode) return bandarSettings.activePhase;
    if (balance < 10000 || gameOver) return 'crash';
    if (spinCount <= 2) return 'hook';
    return 'drain';
  };

  const determineOutcome = (currentSpinCount) => {
    // 1. Check for Forced Outcome (Bandar Intervention)
    if (isBandarMode && forcedOutcome) {
      const outcomeType = forcedOutcome;
      setForcedOutcome(null); // Reset after use

      if (outcomeType === 'jackpot') {
        return { isWin: true, payout: betAmount * PAYTABLE['7️⃣'], symbols: ['7️⃣', '7️⃣', '7️⃣'] };
      } else if (outcomeType === 'win') {
        const symbol = '🍒';
        return { isWin: true, payout: betAmount * PAYTABLE[symbol], symbols: [symbol, symbol, symbol] };
      } else if (outcomeType === 'lose') {
        return { isWin: false, payout: 0, symbols: generateLosingSymbols() };
      }
    }

    // 2. Regular Logic (Modified by Bandar Settings if active)
    let winChance;
    let nearMissChance;

    if (isBandarMode) {
      winChance = bandarSettings.winChance;
      nearMissChance = bandarSettings.nearMissChance;
    } else {
      const isHookPhase = currentSpinCount <= 2;
      winChance = isHookPhase ? (currentSpinCount === 1 ? 0.98 : 0.90) : 0.15;
      nearMissChance = 0.65;
    }

    const rand = Math.random();

    if (rand < winChance) {
      // WIN LOGIC
      const winRand = Math.random();
      let symbol;
      
      const phase = getPhase();
      const isHook = phase === 'hook';

      if (isHook) {
        if (winRand < 0.75) symbol = '🍒';
        else if (winRand < 0.90) symbol = '🍋';
        else if (winRand < 0.97) symbol = '🔔';
        else if (winRand < 0.99) symbol = '💎';
        else symbol = '7️⃣';
      } else {
        if (winRand < 0.90) symbol = '🍒';
        else if (winRand < 0.98) symbol = '🍋';
        else if (winRand < 0.995) symbol = '🔔';
        else if (winRand < 0.999) symbol = '💎';
        else symbol = '7️⃣';
      }

      const multiplier = PAYTABLE[symbol];
      const payout = betAmount * multiplier;

      return { isWin: true, payout, symbols: [symbol, symbol, symbol] };
    } else {
      // LOSS LOGIC
      const isNearMiss = Math.random() < (isBandarMode ? bandarSettings.nearMissChance : 0.65);

      if (isNearMiss) {
        const symbol1 = items[Math.floor(Math.random() * items.length)];
        let symbol3;
        do {
          symbol3 = items[Math.floor(Math.random() * items.length)];
        } while (symbol3 === symbol1);

        return { isWin: false, payout: 0, symbols: [symbol1, symbol1, symbol3], isNearMiss: true };
      } else {
        return { isWin: false, payout: 0, symbols: generateLosingSymbols() };
      }
    }
  };

  const generateLosingSymbols = () => {
    const s1 = items[Math.floor(Math.random() * items.length)];
    const s2 = items[Math.floor(Math.random() * items.length)];
    const s3 = items[Math.floor(Math.random() * items.length)];
    // Ensure not all three are same
    if (s1 === s2 && s2 === s3) {
      const otherSymbols = items.filter(i => i !== s1);
      return [s1, s2, otherSymbols[Math.floor(Math.random() * otherSymbols.length)]];
    }
    return [s1, s2, s3];
  };

  const spin = () => {
    if (balance < betAmount || isSpinning || gameOver) return;

    setIsSpinning(true);
    setWinStatus(null);
    let currentBalance = balance - betAmount;
    const newSpinCount = spinCount + 1;

    setTimeout(() => {
      const outcome = determineOutcome(newSpinCount);
      setReels(outcome.symbols);

      if (outcome.isWin && outcome.payout > 0) {
        setWinStatus('win');
        currentBalance += outcome.payout;
      } else {
        setWinStatus('lose');
      }

      setBalance(currentBalance);
      setHistory(prev => [...prev, { spin: newSpinCount, balance: currentBalance }]);
      setSpinCount(newSpinCount);
      setIsSpinning(false);

      // Determine if a Reality Check modal will be shown
      const willShowRealityCheck = currentBalance < 10000 || newSpinCount % 3 === 0;

      // Trigger Scenario Notifications
      if (!willShowRealityCheck) {
        if (newSpinCount === 2) {
          triggerBandarToast('drain', 'Fase edukasi (Hook) selesai. Mengurangi RTP secara drastis untuk mulai menyedot saldo pemain secara perlahan.');
        } else if (outcome.isNearMiss && !hasShownNearMiss) {
          triggerBandarToast('near-miss', 'Memicu "Hampir Menang". Secara statistik, ini membuat pemain merasa kemenangan sudah dekat dan terus bermain.');
          setHasShownNearMiss(true);
        } else if (currentBalance < 50000 && currentBalance >= 10000) {
          triggerBandarToast('crash', 'Saldo kritis terdeteksi. Mengunci sistem untuk memastikan pemain tidak bisa melakukan "comeback".');
        }
      }

      if (currentBalance < 10000) {
        setGameOver(true);
        setShowRealityCheck(true);
      } else if (newSpinCount % 3 === 0) {
        let selectedIndex;

        if (shownFactIndices.length === 0) {
          selectedIndex = 0;
        } else if (shownFactIndices.length === 1) {
          selectedIndex = 1;
        } else {
          let availableIndices = FACTS.map((_, i) => i).filter(i => !shownFactIndices.includes(i));

          if (availableIndices.length === 0) {
            availableIndices = FACTS.map((_, i) => i);
            setShownFactIndices([]);
          }
          selectedIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
        }

        setCurrentFact(FACTS[selectedIndex]);
        setShownFactIndices(prev => [...prev, selectedIndex]);
        setShowRealityCheck(true);
      }
    }, 1500);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const handleRestart = () => {
    if (window.confirm('Apakah Anda yakin ingin mengulang simulasi dari awal? Semua riwayat permainan akan dihapus.')) {
      setGameState('setup');
      setSpinCount(0);
      setGameOver(false);
      setWinStatus(null);
      setHistory([]);
      setBalance(0);
      setShownFactIndices([]);
      setCurrentFact('');
      setHasShownNearMiss(false);
    }
  };

  if (gameState === 'setup') {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div className="glass-panel setup-panel" style={{ marginTop: 'auto', marginBottom: 'auto' }}>
          <div className="header" style={{ marginBottom: '30px' }}>
            <h1><span className="text-gradient">Zeus</span> <span className="text-accent">Casino</span></h1>
            <p style={{ fontSize: '0.95rem', opacity: 0.8 }}>Persiapkan mental Anda. Tentukan modal awal permainan.</p>
          </div>

          <form onSubmit={startGame}>
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <label style={{ color: '#ccc', fontWeight: 'bold' }}>Modal Awal (Rupiah)</label>
              <input
                type="number"
                className="setup-input"
                value={initialBalanceInput}
                onChange={(e) => setInitialBalanceInput(Number(e.target.value))}
                min={0}
                step={100000}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>
              MULAI BERMAIN
            </button>
          </form>

          <p style={{ marginTop: '20px', fontSize: '0.85rem', color: '#666', fontStyle: 'italic' }}>
            *Ini adalah simulasi edukasi. Anda tidak membelanjakan uang sungguhan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="header" style={{ position: 'relative' }}>
        <div style={{ 
          position: 'fixed', 
          top: '20px', 
          right: controlsVisible ? '20px' : '-350px', 
          display: 'flex', 
          gap: '10px', 
          zIndex: 1000,
          background: 'none', 
          padding: '0',
          borderRadius: '0',
          backdropFilter: 'none',
          border: 'none',
          boxShadow: 'none',
          transition: 'right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {/* Toggle Button */}
          <button
            onClick={() => setControlsVisible(!controlsVisible)}
            style={{
              position: 'absolute',
              left: '-40px',
              top: '10px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50% 0 0 50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              backdropFilter: 'blur(10px)'
            }}
          >
            {controlsVisible ? '→' : '←'}
          </button>

          <button
            onClick={() => setIsBandarMode(!isBandarMode)}
            className="glass-panel"
            style={{
              padding: '10px 20px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              color: isBandarMode ? 'var(--accent-color)' : '#fff',
              border: `1px solid ${isBandarMode ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)'}`,
              transition: 'all 0.2s',
              background: isBandarMode ? 'rgba(255, 60, 100, 0.1)' : 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 'bold',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
            }}
          >
            <ShieldAlert size={16} /> {isBandarMode ? 'MODE: BANDAR' : 'BECOME BANDAR'}
          </button>

          <button
            onClick={handleRestart}
            className="glass-panel"
            style={{
              padding: '10px 20px',
              fontSize: '0.9rem',
              cursor: 'pointer',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s',
              background: 'rgba(255,255,255,0.05)',
              boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
              fontWeight: 'bold'
            }}
          >
            RESET
          </button>
        </div>
        <h1><span className="text-gradient">Zeus</span> <span className="text-accent">Casino</span></h1>
        <p>The Illusion of Winning</p>
      </div>

      <div className="simulator-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>

            <div className="tooltip-container" style={{ marginBottom: '10px' }}>
              <h2 className="outfit text-secondary">YOUR BALANCE</h2>
              <Info size={16} className="text-secondary" />
              <span className="tooltip-text">
                Total saldo (uang) Anda saat ini. Setiap 'Spin' akan mengurangi saldo sebesar {formatCurrency(betAmount)}.
              </span>
            </div>

            <div className={`balance-display ${winStatus === 'win' ? 'text-win pulsate-win' : winStatus === 'lose' ? 'text-lose pulsate-lose' : ''}`}>
              {formatCurrency(balance)}
            </div>

            <div style={{ margin: '20px 0' }}>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '10px', fontWeight: 'bold' }}>PILIH TARUHAN (BET)</p>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {BET_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setBetAmount(opt)}
                    disabled={isSpinning || balance < opt}
                    className={`bet-btn ${betAmount === opt ? 'active' : ''}`}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: betAmount === opt ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                      color: betAmount === opt ? '#000' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      opacity: balance < opt ? 0.3 : 1
                    }}
                  >
                    {opt >= 1000000 ? `${opt / 1000000}JT` : `${opt / 1000}K`}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: '30px', margin: '5px 0' }}>
              {winStatus === 'win' && <p className="text-win" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+ WIN!</p>}
              {winStatus === 'lose' && <p className="text-lose" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>LOSER</p>}
            </div>

            <SlotMachine reels={reels} isSpinning={isSpinning} />

            <button
              className="btn-primary"
              onClick={spin}
              disabled={isSpinning || balance < betAmount || gameOver}
              style={{ width: '100%', maxWidth: '300px', margin: '20px auto 0' }}
            >
              {isSpinning ? 'SPINNING...' : `SPIN (${formatCurrency(betAmount)})`}
            </button>
          </div>

          {/* Paytable Section */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 className="outfit text-secondary" style={{ fontSize: '1rem', marginBottom: '15px', textAlign: 'center' }}>PAYTABLE (KALI TARUHAN)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
              {Object.entries(PAYTABLE).map(([sym, mult]) => (
                <div key={sym} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{sym}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>{mult}x</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '30px', display: 'flex', gap: '20px', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            <div className="stat-card" style={{ flex: 1, minWidth: '150px' }}>
              <div className="tooltip-container" style={{ marginBottom: '10px' }}>
                <h3 className="text-secondary">Total Spins</h3>
                <Info size={14} className="text-secondary" />
                <span className="tooltip-text">
                  Berapa kali Anda telah menekan tombol putar. Semakin sering diputar, semakin pasti uang Anda habis ke Admin (Bandar).
                </span>
              </div>
              <p className="stat-value">{spinCount}</p>
            </div>

            <div className="stat-card" style={{ flex: 1, minWidth: '150px' }}>
              <div className="tooltip-container" style={{ marginBottom: '10px' }}>
                <h3 className="text-secondary">Net Profit/Loss</h3>
                <Info size={14} className="text-secondary" />
                <span className="tooltip-text">
                  Selisih antara uang Anda sekarang dibandingkan saat pertama kali memulai. Merah artinya Anda MERUGI.
                </span>
              </div>
              <p className={`stat-value ${balance >= initialBalanceState ? 'text-win' : 'text-lose'}`}>
                {formatCurrency(balance - initialBalanceState)}
              </p>
            </div>
          </div>

          <AlgorithmExposed spinCount={spinCount} currentPhase={getPhase()} />

        </div>

        <div className="sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="glass-panel" style={{ padding: '30px', height: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
              <TrendingDown className="text-lose" size={28} />
              <h2 className="outfit text-gradient" style={{ fontSize: '1.8rem' }}>Balance History</h2>
            </div>

            <BalanceChart data={history} />

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255, 60, 100, 0.05)', borderRadius: '16px', border: '1px solid rgba(255, 60, 100, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <AlertTriangle className="text-lose" size={24} />
                <h3 className="text-lose" style={{ fontSize: '1.2rem' }}>Reality Note</h3>
              </div>
              <p className="fact-text" style={{ margin: 0, fontSize: '0.95rem', borderLeftColor: 'var(--lose-color)' }}>
                Notice how your balance trends downwards over time. Occasional small wins are designed to give you false hope, keeping you playing until your balance reaches zero.
              </p>
            </div>
          </div>

          {isBandarMode && (
            <div ref={bandarRef}>
              <BandarDashboard 
                settings={bandarSettings}
                activePhase={bandarSettings.activePhase}
                forcedOutcome={forcedOutcome}
                onSettingsChange={(s) => setBandarSettings(prev => ({ ...prev, ...s }))}
                onPhaseChange={(p) => setBandarSettings(prev => ({ ...prev, activePhase: p }))}
                onForceNextOutcome={setForcedOutcome}
              />
            </div>
          )}
        </div>

        {/* Membungkus simulator-grid */}
      </div>

      {showRealityCheck && (
        <RealityCheck
          onClose={() => setShowRealityCheck(false)}
          gameOver={gameOver}
          spinCount={spinCount}
          lossAmount={initialBalanceState - balance}
          fact={currentFact}
        />
      )}

      <BandarControlToast
        type={bandarToast.type}
        message={bandarToast.message}
        visible={bandarToast.visible}
        onClose={() => setBandarToast(prev => ({ ...prev, visible: false }))}
      />
    </div>
  );
}

export default Simulator;
