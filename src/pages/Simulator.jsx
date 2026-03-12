import React, { useState, useEffect } from 'react';
import SlotMachine from '../components/SlotMachine';
import BalanceChart from '../components/BalanceChart';
import RealityCheck from '../components/RealityCheck';
import AlgorithmExposed from '../components/AlgorithmExposed';
import { AlertTriangle, TrendingDown, Info } from 'lucide-react';
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
  };

  const getPhase = () => {
    if (balance < BET_AMOUNT || gameOver) return 'crash';
    if (spinCount <= 2) return 'hook';
    return 'drain';
  };

  const determineOutcome = (currentSpinCount) => {
    if (currentSpinCount <= 2) {
      const isWin = Math.random() < 0.8;
      if (isWin) {
        return { isWin: true, payout: 250000 + Math.floor(Math.random() * 200000), symbols: ['💎', '💎', '💎'] };
      }
      return { isWin: false, payout: 0, symbols: ['🍒', '🍋', '🔔'] };
    }
    
    const rand = Math.random();
    
    if (rand < 0.15) {
      return { isWin: true, payout: 50000, symbols: ['🍒', '🍒', '🍋'] };
    } else if (rand < 0.4) {
      return { isWin: false, payout: 0, symbols: ['7️⃣', '7️⃣', '🔔'] };
    } else {
      return { isWin: false, payout: 0, symbols: [
        items[Math.floor(Math.random() * items.length)],
        items[Math.floor(Math.random() * items.length)],
        items[Math.floor(Math.random() * items.length)]
      ]};
    }
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

      if (currentBalance < BET_AMOUNT) {
        setGameOver(true);
        setShowRealityCheck(true);
      } else if (newSpinCount % 5 === 0) {
        setShowRealityCheck(true);
      }
    }, 1500);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  if (gameState === 'setup') {
    return (
      <div className="page-container setup-container">
        <div className="glass-panel setup-panel">
          <h1 style={{ marginBottom: '10px' }}><span className="text-gradient">Zeus</span> <span className="text-accent">Casino</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Persiapkan mental Anda. Tentukan modal awal permainan.</p>
          
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
      <div className="header">
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

            <div className={`balance-display ${winStatus === 'win' ? 'text-win' : winStatus === 'lose' ? 'text-lose' : ''} ${winStatus !== null ? 'pulsate' : ''}`}>
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
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff' }}>{spinCount}</p>
              </div>

              <div className="stat-card" style={{ flex: 1, minWidth: '150px' }}>
                <div className="tooltip-container" style={{ marginBottom: '10px' }}>
                  <h3 className="text-secondary">Net Profit/Loss</h3>
                  <Info size={14} className="text-secondary" />
                  <span className="tooltip-text">
                    Selisih antara uang Anda sekarang dibandingkan saat pertama kali memulai. Merah artinya Anda MERUGI.
                  </span>
                </div>
                <p className={balance >= initialBalanceState ? 'text-win' : 'text-lose'} style={{ fontSize: '2rem', fontWeight: 'bold' }}>
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
        />
      )}
    </div>
  );
}

export default Simulator;
