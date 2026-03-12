import React from 'react';
import '../index.css';

const SlotMachine = ({ reels, isSpinning }) => {
  return (
    <div className="slot-machine-container">
      {reels.map((symbol, index) => (
        <div key={index} className="slot-reel">
          <span className={isSpinning ? "slot-item-spinning" : ""}>
            {isSpinning ? '🎰' : symbol}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SlotMachine;
