import { useState } from "react";
import "../index.css";

function Temperature() {
  // Stores the current counter value
  const [count, setCount] = useState(0);

  // Stores the step value
  const [step, setStep] = useState(1);

  // Minimum allowed count
  const minimum = 0;

  // Increase counter
  const increment = () => {
    setCount(count + step);
  };

  // Decrease counter
  const decrement = () => {
    // Prevent going below minimum
    if (count - step >= minimum) {
      setCount(count - step);
    } else {
      setCount(minimum);
    }
  };

  // Reset counter
  const reset = () => {
    setCount(0);
  };

  // Dynamic color
  let countColor = "black";

  if (count > 10) {
    countColor = "green";
  } else if (count > 0) {
    countColor = "blue";
  } else {
    countColor = "red";
  }

  return (
    <div className="container">
      <h1>Temperature App</h1>

      <h2 style={{ color: countColor }}>
        Count: {count}
      </h2>

      <div className="input-group">
        <label>Step Size:</label>

        <input
          type="number"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
      </div>

      <div className="button-group">
        <button onClick={increment}>
          Increment
        </button>

        <button onClick={decrement}>
          Decrement
        </button>

        <button onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Temperature;