import { useState } from 'react';
import '../App.css';

function Counter() {
  // 1. Initialize the count state
  const [count, setCount] = useState(0);

  // 2. Functions to handle button clicks
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter-container">
      <h1>React Counter</h1>
      
      {/* 3. Display the current count */}
      <div className="count-display">{count}</div>

      {/* 4. Conditional messaging */}
      {count < 0 && <p className="alert-message warning">⚠️ Count is below zero!</p>}
      {count > 10 && <p className="alert-message danger">🚨 Count is above 10!</p>}

      {/* 5. The action buttons */}
      <div className="button-group">
        <button onClick={decrement}>- Decrease</button>
        <button onClick={reset}>🔄 Reset to 0</button>
        <button onClick={increment}>+ Increase</button>
      </div>
    </div>
  );
}

export default Counter;