import React, { useState, useEffect } from 'react';
import SlotMachine from '../components/SlotMachine';
import BalanceChart from '../components/BalanceChart';
import { FACTS } from '../constants/facts';
import RealityCheck from '../components/RealityCheck';
import AlgorithmExposed from '../components/AlgorithmExposed';
import { AlertTriangle, TrendingDown, Info, ShieldAlert } from 'lucide-react';
import BandarControlToast from '../components/BandarControlToast';
import '../index.css';

const BET_AMOUNT = 100000;

function Simulator() {
  const [gameState, setGameState] = useState('setup'); // 'setup', 'playing'
  const [initialBalanceInput, setInitialBalanceInput] = useState(1000000);
  const [initialBalanceState, setInitialBalanceState] = useState(1000000);
  
  const [balance, setBalance] = useState(0);
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

  const items = ['🍒', '🍋', '🔔', '💎', '7️⃣'];

  const startGame = (e) => {
    e.preventDefault();
    if (initialBalanceInput < BET_AMOUNT) {
      alert(`Modal awal minimal Rp ${BET_AMOUNT.toLocaleString('id-ID')} untuk bisa bermain.`);
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
    if (balance < BET_AMOUNT || gameOver) return 'crash';
    if (spinCount <= 2) return 'hook';
    return 'drain';
  };

  const determineOutcome = (currentSpinCount) => {
    if (currentSpinCount <= 2) {
      // Hook phase: high win probability
      const isWin = Math.random() < 0.8;
      if (isWin) {
        const symbol = items[Math.floor(Math.random() * items.length)];
        return { isWin: true, payout: 250000 + Math.floor(Math.random() * 200000), symbols: [symbol, symbol, symbol] };
      }
      return { isWin: false, payout: 0, symbols: generateLosingSymbols() };
    }
    
    const rand = Math.random();
    
    if (rand < 0.12) {
      // Break-even win: Sync symbols to 3 same
      const symbol = items[Math.floor(Math.random() * items.length)];
      return { isWin: true, payout: 100000, symbols: [symbol, symbol, symbol] };
    } else if (rand < 0.25) {
      // Small profit win: Sync symbols to 3 same
      const symbol = items[Math.floor(Math.random() * items.length)];
      return { isWin: true, payout: 150000, symbols: [symbol, symbol, symbol] };
    } else if (rand < 0.65) {
      // Near miss (2 the same): NEVER 3 same
      const symbol1 = items[Math.floor(Math.random() * items.length)];
      let symbol2 = symbol1;
      let symbol3;
      do {
        symbol3 = items[Math.floor(Math.random() * items.length)];
      } while (symbol3 === symbol1);
      
      return { isWin: false, payout: 0, symbols: [symbol1, symbol2, symbol3], isNearMiss: true };
    } else {
      // Total loss: NEVER 3 same
      return { isWin: false, payout: 0, symbols: generateLosingSymbols() };
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
    if (balance < BET_AMOUNT || isSpinning || gameOver) return;

    setIsSpinning(true);
    setWinStatus(null);
    let currentBalance = balance - BET_AMOUNT;
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

      // Trigger Scenario Notifications
      if (newSpinCount === 2) {
        triggerBandarToast('drain', 'Fase edukasi (Hook) selesai. Mengurangi RTP secara drastis untuk mulai menyedot saldo pemain secara perlahan.');
      } else if (outcome.isNearMiss) {
        triggerBandarToast('near-miss', 'Memicu "Hampir Menang". Secara statistik, ini membuat pemain merasa kemenangan sudah dekat dan terus bermain.');
      } else if (currentBalance < BET_AMOUNT * 2 && currentBalance >= BET_AMOUNT) {
        triggerBandarToast('crash', 'Saldo kritis terdeteksi. Mengunci sistem untuk memastikan pemain tidak bisa melakukan "comeback".');
      }

      if (currentBalance < BET_AMOUNT) {
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
                min={BET_AMOUNT}
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
        <button 
          onClick={handleRestart}
          className="glass-panel"
          style={{ 
            position: 'absolute', 
            top: '0', 
            right: '0', 
            padding: '10px 20px', 
            fontSize: '0.9rem', 
            cursor: 'pointer',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.2s',
            background: 'rgba(255,255,255,0.05)'
          }}
        >
          RESET SESSION
        </button>
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
                Total saldo (uang) Anda saat ini. Setiap 'Spin' akan mengurangi saldo sebesar {formatCurrency(BET_AMOUNT)}.
              </span>
            </div>

            <div className={`balance-display ${winStatus === 'win' ? 'text-win pulsate-win' : winStatus === 'lose' ? 'text-lose pulsate-lose' : ''}`}>
              {formatCurrency(balance)}
            </div>
            <div style={{ height: '30px', margin: '5px 0' }}>
              {winStatus === 'win' && <p className="text-win" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+ WIN!</p>}
              {winStatus === 'lose' && <p className="text-lose" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>LOSER</p>}
            </div>

            <SlotMachine reels={reels} isSpinning={isSpinning} />
            
            <button 
              className="btn-primary" 
              onClick={spin} 
              disabled={isSpinning || balance < BET_AMOUNT || gameOver}
              style={{ width: '100%', maxWidth: '300px', margin: '20px auto 0' }}
            >
              {isSpinning ? 'SPINNING...' : `SPIN (${formatCurrency(BET_AMOUNT)})`}
            </button>
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
