import { useState } from "react";

function TempConverter() {
  // Single source of truth
  const [celsius, setCelsius] = useState("");

  // Convert Celsius to Fahrenheit
  function toFahrenheit(c) {
    return ((c * 9) / 5 + 32).toFixed(1);
  }

  // Convert Fahrenheit to Celsius
  function toCelsius(f) {
    return (((f - 32) * 5) / 9).toFixed(1);
  }

  // Handle Celsius input
  function handleCelsiusChange(event) {
    setCelsius(event.target.value);
  }

  // Handle Fahrenheit input
  function handleFahrenheitChange(event) {
    const fahrenheitValue = event.target.value;

    if (fahrenheitValue === "") {
      setCelsius("");
    } else {
      setCelsius(toCelsius(Number(fahrenheitValue)));
    }
  }

  // Reset both fields
  function resetFields() {
    setCelsius("");
  }

  // Derived Fahrenheit value
  const fahrenheit = celsius === "" ? "" : toFahrenheit(Number(celsius));

  // Temperature label
  function getTemperatureLabel() {
    const temp = Number(celsius);

    if (celsius === "") return "";

    if (temp <= 0) return "Freezing";
    if (temp <= 15) return "Cold";
    if (temp <= 25) return "Room Temperature";
    if (temp <= 35) return "Warm";

    return "Hot";
  }

  return (
    <div>
      <h1>Temperature Converter</h1>

      <div>
        <div>
          <label>Celsius: </label>

          <input type="number" value={celsius} onChange={handleCelsiusChange} />
        </div>

        <div>
          <label>Fahrenheit: </label>

          <input
            type="number"
            value={fahrenheit}
            onChange={handleFahrenheitChange}
          />
        </div>
      </div>

      <button onClick={resetFields}>Reset</button>

      <h2>{getTemperatureLabel()}</h2>
    </div>
  );
}

export default TempConverter;
