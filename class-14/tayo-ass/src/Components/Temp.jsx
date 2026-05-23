import { useState } from "react";

function Temperature() {
  // Main shared state
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  // Convert Celsius to Fahrenheit
  const handleCelsiusChange = (e) => {
    const value = e.target.value;

    setCelsius(value);

    // Prevent empty input issues
    if (value === "") {
      setFahrenheit("");
      return;
    }

    const converted =
      (parseFloat(value) * 9) / 5 + 32;

    setFahrenheit(converted.toFixed(2));
  };

  // Convert Fahrenheit to Celsius
  const handleFahrenheitChange = (e) => {
    const value = e.target.value;

    setFahrenheit(value);

    // Prevent empty input issues
    if (value === "") {
      setCelsius("");
      return;
    }

    const converted =
      ((parseFloat(value) - 32) * 5) / 9;

    setCelsius(converted.toFixed(2));
  };

  return (
    <div className="container">
      <h1>Temperature Converter</h1>

      <div className="input-box">
        <label>Celsius (°C)</label>

        <input
          type="number"
          value={celsius}
          onChange={handleCelsiusChange}
          placeholder="Enter Celsius"
        />
      </div>

      <div className="input-box">
        <label>Fahrenheit (°F)</label>

        <input
          type="number"
          value={fahrenheit}
          onChange={handleFahrenheitChange}
          placeholder="Enter Fahrenheit"
        />
      </div>
    </div>
  );
}

export default Temperature;