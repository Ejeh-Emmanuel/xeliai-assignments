import { useState } from "react";

function CharacterCounter() {
  // State for textarea content
  const [text, setText] = useState("");

  // Maximum allowed characters
  const maxCharacters = 100;

  // Character count
  const characterCount = text.length;

  // Word count
  const wordCount =
    text.trim() === ""
      ? 0
      : text.trim().split(/\s+/).length;

  // Check if limit exceeded
  const isLimitReached =
    characterCount >= maxCharacters;

  // Handle typing
  const handleChange = (e) => {
    const inputText = e.target.value;

    // Prevent typing beyond limit
    if (inputText.length <= maxCharacters) {
      setText(inputText);
    }
  };

  // Clear textarea
  const clearText = () => {
    setText("");
  };

  return (
    <div className="container">
      <h1>Character Counter</h1>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />

      <div className="stats">
        <p>
          Characters:
          <span
            className={
              isLimitReached ? "warning" : ""
            }
          >
            {" "}
            {characterCount}/{maxCharacters}
          </span>
        </p>

        <p>
          Words: {wordCount}
        </p>
      </div>

      {isLimitReached && (
        <p className="warning-message">
          Maximum character limit reached!
        </p>
      )}

      <button onClick={clearText}>
        Clear Text
      </button>
    </div>
  );
}

export default CharacterCounter;