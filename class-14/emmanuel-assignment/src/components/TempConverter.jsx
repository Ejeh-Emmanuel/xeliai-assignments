import { useState } from "react";

function TempConverter() {
  // single raw value
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c"); // "c" or "f"

  // conversions
  function toFahrenheit(c) {
    return ((c * 9) / 5 + 32).toFixed(1);
  }

  function toCelsius(f) {
    return (((f - 32) * 5) / 9).toFixed(1);
  }

  // handlers
  function handleCelsiusChange(event) {
    setTemperature(event.target.value);
    setScale("c");
  }

  function handleFahrenheitChange(event) {
    setTemperature(event.target.value);
    setScale("f");
  }

  // reset
  function resetFields() {
    setTemperature("");
    setScale("c");
  }

  // derived values
  const celsius =
    temperature === ""
      ? ""
      : scale === "f"
        ? toCelsius(Number(temperature))
        : temperature;

  const fahrenheit =
    temperature === ""
      ? ""
      : scale === "c"
        ? toFahrenheit(Number(temperature))
        : temperature;

  // label based on Celsius
  function getTemperatureLabel() {
    if (temperature === "") return "";

    const temp = Number(celsius);

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
