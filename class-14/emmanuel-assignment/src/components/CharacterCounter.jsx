import { useState } from "react";

function CharacterCounter() {
  // Single state variable
  const [text, setText] = useState("");

  // Derived values
  const charCount = text.length;

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  const charsLeft = 280 - text.length;

  const isOverLimit = text.length > 280;

  const isNearLimit = text.length > 240 && !isOverLimit;

  // Handle typing
  function handleChange(event) {
    setText(event.target.value);
  }

  // Clear textarea
  function clearText() {
    setText("");
  }

  // Submit text
  function handleSubmit() {
    console.log(text);
    setText("");
  }

  // Counter color
  let counterColor = "black";

  if (isNearLimit) {
    counterColor = "orange";
  }

  if (isOverLimit) {
    counterColor = "red";
  }

  return (
    <div>
      <h1>Character Counter</h1>

      <textarea rows="4" value={text} onChange={handleChange} />

      <p style={{ color: counterColor }}>{charCount} / 280</p>

      <p>{wordCount} words</p>

      <p>{charsLeft} characters left</p>

      {isNearLimit && <p>Warning: You are approaching the character limit.</p>}

      {isOverLimit && <p>Error: Character limit exceeded.</p>}

      <button onClick={clearText} disabled={text === ""}>
        Clear
      </button>

      <button onClick={handleSubmit} disabled={text === "" || isOverLimit}>
        Submit
      </button>
    </div>
  );
}

export default CharacterCounter;
