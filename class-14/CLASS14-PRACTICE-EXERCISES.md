# Class 14: Practice Exercises
In-Class Activities — State & Event Handling

---

## Exercise 1: Convert an Imperative Toggle to React State (20 minutes)

**Goal:** Understand why direct DOM mutation is the wrong approach in React, and how to replace it with useState.

**The Problem — Broken Imperative Code:**

The instructor has written this component. It tries to toggle a dark mode style directly on the DOM. It partially works, but it's completely wrong in React. Your job is to fix it.

```jsx
// ❌ BROKEN — Do not write code like this in React
const DarkModeToggle = () => {
    const handleToggle = () => {
        const box = document.querySelector('.box');
        if (box.style.background === 'black') {
            box.style.background = 'white';
            box.style.color = 'black';
        } else {
            box.style.background = 'black';
            box.style.color = 'white';
        }
    };

    return (
        <div className="box" style={{ padding: '20px' }}>
            <p>Hello, World!</p>
            <button onClick={handleToggle}>Toggle Dark Mode</button>
        </div>
    );
};
```

**What's Wrong Here:**
- Reaching into the DOM with `document.querySelector` is imperative — that's the old way
- React doesn't know the style changed — state is out of sync with the DOM
- If React re-renders for any reason, it will reset the inline style back to nothing
- It breaks when you have multiple `DarkModeToggle` components on the page

**Task:** Rewrite it using useState so that:
1. A boolean state variable (`isDark`) tracks the mode
2. The button text changes: `"Switch to Dark Mode"` or `"Switch to Light Mode"` based on state
3. The background and text colour change using `className`, not inline `style`
4. No `document.querySelector` anywhere in the component

**Expected Answer:**
```jsx
import { useState } from 'react';

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    return (
        <div className={`box ${isDark ? 'box--dark' : 'box--light'}`}>
            <p>Hello, World!</p>
            <button onClick={() => setIsDark(prev => !prev)}>
                {isDark ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
            </button>
        </div>
    );
};

export default DarkModeToggle;
```

```css
/* App.css */
.box { padding: 20px; border-radius: 10px; transition: all 0.3s; }
.box--light { background: #f8f9fa; color: #0f172a; }
.box--dark  { background: #0f172a; color: #f8f9fa; }
```

**Discussion Questions:**
- What happens if you have four `<DarkModeToggle />` components on the page? Do they all toggle at once?
- Why does using `className` instead of inline `style` produce a better result here?
- What would you need to do differently to make all four toggles stay in sync? (Hint: lifting state)

---

## Exercise 2: Build a Reusable Like Button (20 minutes)

**Goal:** Build a self-contained interactive component that manages its own active/inactive state independently from its siblings.

**Task:** Create a `LikeButton` component that:
1. Accepts an `initialCount` prop (number, default 0) and a `label` prop (string, default "Like")
2. Has two internal state variables: `liked` (boolean) and `count` (number)
3. On click: if not liked → set liked to true, increment count. If already liked → set liked to false, decrement count
4. When `liked` is true: shows a filled heart ❤️ and applies a CSS class `liked` to the button
5. When `liked` is false: shows an empty heart 🤍 and no special class

Then render it **four times** in App.jsx with different `initialCount` values. Click one — confirm the others are not affected.

**Expected Answer:**
```jsx
// src/components/LikeButton.jsx
import { useState } from 'react';

const LikeButton = ({ initialCount = 0, label = 'Like' }) => {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(initialCount);

    const handleClick = () => {
        if (liked) {
            setLiked(false);
            setCount(prev => prev - 1);
        } else {
            setLiked(true);
            setCount(prev => prev + 1);
        }
    };

    return (
        <button
            className={`like-btn ${liked ? 'liked' : ''}`}
            onClick={handleClick}
        >
            {liked ? '❤️' : '🤍'} {label} · {count}
        </button>
    );
};

export default LikeButton;
```

```jsx
// src/App.jsx
import LikeButton from './components/LikeButton';

const App = () => (
    <div style={{ display: 'flex', gap: '12px', padding: '20px' }}>
        <LikeButton initialCount={14}  label="Like" />
        <LikeButton initialCount={82}  label="Love" />
        <LikeButton initialCount={5}   label="Support" />
        <LikeButton initialCount={231} label="Helpful" />
    </div>
);
```

**Challenge:** Add a `maxLikes` prop. When the count reaches maxLikes, the button should become disabled and show "Max reached" instead of the count.

---

## Exercise 3: Pass State Updates via a Controlled Form Input (25 minutes)

**Goal:** Wire up a complete controlled input cycle — from keystroke to state to live display — and experience the full round-trip for the first time.

**Task:** Build a `GreetingForm` component that:
1. Has a controlled text input for the user's name (state: `name`, initial: `''`)
2. Has a controlled text input for a greeting message (state: `greeting`, initial: `'Hello'`)
3. Has a dropdown (controlled `<select>`) to choose a language: English (`Hello`), Yoruba (`Ẹ káàbọ̀`), Igbo (`Nnọọ`), Hausa (`Barka da zuwa`)
4. Displays a live preview: `"[greeting], [name]! 👋"` — but only when name is not empty
5. Has a Reset button that clears the name and resets the greeting to `'Hello'`
6. Shows a character count under the name input

**Expected Answer:**
```jsx
// src/components/GreetingForm.jsx
import { useState } from 'react';

const greetings = [
    { value: 'Hello',           label: 'English' },
    { value: 'Ẹ káàbọ̀',        label: 'Yoruba' },
    { value: 'Nnọọ',            label: 'Igbo' },
    { value: 'Barka da zuwa',   label: 'Hausa' },
];

const GreetingForm = () => {
    const [name, setName]         = useState('');
    const [greeting, setGreeting] = useState('Hello');

    const handleReset = () => {
        setName('');
        setGreeting('Hello');
    };

    return (
        <div className="greeting-form">
            {/* Live preview — shows only when name is not empty */}
            <div className="preview">
                {name
                    ? <h2>{greeting}, {name}! 👋</h2>
                    : <h2 className="placeholder">Your greeting will appear here...</h2>
                }
            </div>

            {/* Controlled name input */}
            <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Chiamaka, Tolu, Emeka..."
                    maxLength={30}
                />
                <p className="char-count">{name.length} / 30</p>
            </div>

            {/* Controlled select — language picker */}
            <div className="form-group">
                <label htmlFor="greeting">Language</label>
                <select
                    id="greeting"
                    value={greeting}
                    onChange={(e) => setGreeting(e.target.value)}
                >
                    {greetings.map(g => (
                        <option key={g.value} value={g.value}>
                            {g.label} — {g.value}
                        </option>
                    ))}
                </select>
            </div>

            {/* Reset button */}
            <button
                onClick={handleReset}
                disabled={!name && greeting === 'Hello'}
            >
                Reset
            </button>
        </div>
    );
};

export default GreetingForm;
```

**Discussion Questions:**
- Why did we NOT create a separate state variable for `name.length`? What would go wrong if we did?
- What happens when you select a language from the dropdown? Which state changes? Which doesn't?
- If you had a second component on the page that needed to display the same greeting, what would you do? (Answer: lift the state up to a parent and pass it as props)

---

## Exercise 4: Build a Score Tracker (20 minutes)

**Goal:** Combine multiple state variables, event handlers with parameters, and conditional rendering in one component.

**Task:** Build a `ScoreTracker` component for tracking two teams (Team A and Team B) that:
1. Displays both team scores
2. Has `+1` and `-1` buttons for each team (score can't go below 0)
3. Shows which team is currently winning — or "It's a tie!" if scores are equal
4. Highlights the winning team's score in green
5. Has a "Reset Match" button that sets both scores back to 0
6. Shows a "🏆 Winner!" banner below the winning team's name if their score reaches 10

**Expected Answer:**
```jsx
// src/components/ScoreTracker.jsx
import { useState } from 'react';

const ScoreTracker = () => {
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);

    const aWinning = scoreA > scoreB;
    const bWinning = scoreB > scoreA;
    const tied     = scoreA === scoreB;

    const adjust = (setter, current, delta) => {
        const newVal = current + delta;
        if (newVal >= 0) setter(newVal);
    };

    return (
        <div className="score-tracker">
            <h2>Match Score</h2>

            <p className="status">
                {tied    ? "⚖️ It's a tie!"          : ''}
                {aWinning ? '🟢 Team A is winning!'  : ''}
                {bWinning ? '🟢 Team B is winning!'  : ''}
            </p>

            <div className="teams">
                {/* Team A */}
                <div className={`team ${aWinning ? 'team--winning' : ''}`}>
                    <h3>Team A</h3>
                    {scoreA >= 10 && <p className="winner-badge">🏆 Winner!</p>}
                    <p className={`score ${aWinning ? 'score--green' : ''}`}>
                        {scoreA}
                    </p>
                    <div className="btn-group">
                        <button onClick={() => adjust(setScoreA, scoreA, -1)}>−1</button>
                        <button onClick={() => adjust(setScoreA, scoreA, +1)}>+1</button>
                    </div>
                </div>

                <span className="vs">VS</span>

                {/* Team B */}
                <div className={`team ${bWinning ? 'team--winning' : ''}`}>
                    <h3>Team B</h3>
                    {scoreB >= 10 && <p className="winner-badge">🏆 Winner!</p>}
                    <p className={`score ${bWinning ? 'score--green' : ''}`}>
                        {scoreB}
                    </p>
                    <div className="btn-group">
                        <button onClick={() => adjust(setScoreB, scoreB, -1)}>−1</button>
                        <button onClick={() => adjust(setScoreB, scoreB, +1)}>+1</button>
                    </div>
                </div>
            </div>

            <button
                className="btn-reset"
                onClick={() => { setScoreA(0); setScoreB(0); }}
                disabled={scoreA === 0 && scoreB === 0}
            >
                Reset Match
            </button>
        </div>
    );
};

export default ScoreTracker;
```

**Discussion:** `aWinning`, `bWinning`, and `tied` are all derived values — computed from state but not state themselves. Why is this important? What would go wrong if you made them state variables instead?

---

## Exercise 5: Challenge — Character Counter Component (30 minutes)

**Goal:** Build a complete, production-quality Character Counter that validates, warns, and resets — as practice for the homework assignment.

**Task:** Build a `CharacterCounter` component that:
1. Has a controlled `<textarea>` with at least 4 rows
2. Tracks `text` as the controlled state value
3. Displays a live character count: `"72 / 280"`
4. Displays a live word count: `"12 words"` (hint: `text.trim().split(/\s+/).filter(Boolean).length`)
5. When characters exceed 240, turns the counter text orange (warning)
6. When characters exceed 280, turns the counter text red AND disables a "Submit" button
7. Has a "Clear" button that resets text to `''`
8. The Submit button logs the text to the console and resets the field

**Expected Answer:**
```jsx
// src/components/CharacterCounter.jsx
import { useState } from 'react';

const MAX = 280;
const WARN = 240;

const CharacterCounter = () => {
    const [text, setText] = useState('');

    // Derived values — computed from state, no extra useState needed
    const charCount = text.length;
    const wordCount = text.trim() === ''
        ? 0
        : text.trim().split(/\s+/).filter(Boolean).length;
    const isOverLimit  = charCount > MAX;
    const isNearLimit  = charCount > WARN && !isOverLimit;

    const getCounterClass = () => {
        if (isOverLimit)  return 'counter--danger';
        if (isNearLimit)  return 'counter--warning';
        return '';
    };

    const handleSubmit = () => {
        console.log('Submitted:', text);
        setText('');
    };

    return (
        <div className="char-counter">
            <label htmlFor="message">Write your message</label>

            <textarea
                id="message"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?"
                rows={4}
                className={isOverLimit ? 'textarea--error' : ''}
            />

            {/* Stats bar */}
            <div className="stats-bar">
                <span className={`char-count ${getCounterClass()}`}>
                    {charCount} / {MAX}
                    {isOverLimit && ` (${charCount - MAX} over limit)`}
                </span>
                <span className="word-count">{wordCount} words</span>
            </div>

            {/* Warning messages */}
            {isNearLimit  && <p className="warn-msg">⚠️ Approaching character limit</p>}
            {isOverLimit  && <p className="error-msg">❌ Over the character limit — please shorten your message</p>}

            {/* Action buttons */}
            <div className="actions">
                <button
                    onClick={() => setText('')}
                    disabled={text.length === 0}
                >
                    Clear
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isOverLimit || text.trim() === ''}
                    className="btn-submit"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CharacterCounter;
```

**Challenge Extension:** Add a second state variable `submitCount` that increments each time the form is submitted. Display "Submitted 3 times this session" below the textarea.

---

## Solutions & Key Checks

**For every exercise, verify:**

1. `import { useState } from 'react'` — at the top of every file that uses state
2. State is declared at the **top level** of the component — not inside if/else/loops
3. The setter function is always called — never direct assignment like `count = count + 1`
4. Every controlled `<input>` has **both** `value` and `onChange` — never one without the other
5. Forms use `e.preventDefault()` in their `onSubmit` handler
6. Event handlers are **passed by reference** — `onClick={handleClick}` not `onClick={handleClick()}`
7. Boolean toggles use the functional form: `prev => !prev`
8. Derived values (character count, word count, isWinning) are **computed inline**, not stored as extra state

**Red flags to correct:**
- `count++` or `count = count + 1` — always `setCount(prev => prev + 1)`
- `document.querySelector` anywhere in a React component — never
- `onChange` without a matching `value` prop on an input
- State declaration inside an `if` block — hooks at top level only
- `onClick={handleClick()}` with parentheses — pass the reference, don't call it
