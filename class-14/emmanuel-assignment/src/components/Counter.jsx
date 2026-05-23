import { useState } from "react";

function CounterApp() {
  // State for counter value
  const [count, setCount] = useState(0);

  // State for step size
  const [step, setStep] = useState(1);

  // Increase count
  function increment() {
    setCount(count + step);
  }

  // Decrease count but never below 0
  function decrement() {
    setCount(count - step, 0);
  }

  // Reset both count and step
  function reset() {
    setCount(0);
    setStep(1);
  }

  // Handle step input
  function handleStepChange(event) {
    const value = Number(event.target.value);

    // Prevent values below 1
    if (value >= 1) {
      setStep(value);
    }
  }

  return (
    <div>
      <h1
        style={{
          color: count > 0 ? "green" : "red",
        }}
      >
        Counter: {count}
      </h1>

      <div>
        <label>Set Counter Step: </label>

        <input type="number" min="1" value={step} onChange={handleStepChange} />
      </div>

      <div>
        <button onClick={increment}>Increment</button>

        <button onClick={decrement}>Decrement</button>

        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default CounterApp;
