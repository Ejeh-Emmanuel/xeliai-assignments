# Class 14: Code Samples
State & Event Handling — Production-Grade Examples

---

## Example 1: Your First useState — Click Counter

```jsx
// src/components/Counter.jsx
import { useState } from 'react';

const Counter = () => {
    // Declare state: [currentValue, setterFunction] = useState(initialValue)
    const [count, setCount] = useState(0);

    return (
        <div className="counter">
            <h2>Click Counter</h2>

            {/* Display the current state value */}
            <p className="count-display">{count}</p>

            <div className="btn-group">
                {/* Each button calls setCount with a new value */}
                <button onClick={() => setCount(count - 1)}>−</button>
                <button onClick={() => setCount(0)}>Reset</button>
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>

            {/* Conditional rendering based on state value */}
            {count > 10 && <p className="msg">🔥 You're on fire!</p>}
            {count < 0  && <p className="msg red">❄️ Below zero</p>}
        </div>
    );
};

export default Counter;
```

```jsx
// src/App.jsx — use it like any component
import Counter from './components/Counter';

const App = () => (
    <div className="app">
        <Counter />
        <Counter />  {/* Each instance has its own independent state */}
    </div>
);
```

---

## Example 2: Multiple State Variables — Profile Card with Toggles

```jsx
// src/components/ProfileCard.jsx
import { useState } from 'react';

const ProfileCard = ({ name, bio, role, photo }) => {
    // Three completely independent state variables
    const [isFollowing, setIsFollowing] = useState(false);
    const [likeCount, setLikeCount]     = useState(0);
    const [isExpanded, setIsExpanded]   = useState(false);

    // Named handler — cleaner than inline for complex logic
    const handleFollow = () => {
        setIsFollowing(prev => !prev);  // toggle pattern
    };

    return (
        <div className={`profile-card ${isFollowing ? 'profile-card--following' : ''}`}>
            <img src={photo} alt={name} className="profile-card__avatar" />

            <div className="profile-card__info">
                <h3>{name}</h3>
                <p className="role">{role}</p>

                {/* Conditional — only render bio when expanded */}
                {isExpanded && <p className="bio">{bio}</p>}

                <button
                    className="btn-expand"
                    onClick={() => setIsExpanded(prev => !prev)}
                >
                    {isExpanded ? 'Show Less ▲' : 'Read More ▼'}
                </button>
            </div>

            <div className="profile-card__actions">
                {/* Follow toggle */}
                <button
                    className={`btn-follow ${isFollowing ? 'following' : ''}`}
                    onClick={handleFollow}
                >
                    {isFollowing ? '✅ Following' : '+ Follow'}
                </button>

                {/* Like counter — uses functional update for safety */}
                <button
                    className="btn-like"
                    onClick={() => setLikeCount(prev => prev + 1)}
                >
                    ❤️ {likeCount}
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;
```

```jsx
// src/App.jsx
import ProfileCard from './components/ProfileCard';

const users = [
    {
        id: 1,
        name: "Tolu Adeyemi",
        role: "Frontend Developer",
        bio: "Passionate about building accessible UIs. 5 years of React experience. Based in Lagos.",
        photo: "https://i.pravatar.cc/80?img=1"
    },
    {
        id: 2,
        name: "Amara Eze",
        role: "Product Designer",
        bio: "Designing human-first digital products. Figma champion. Lover of clean typography.",
        photo: "https://i.pravatar.cc/80?img=3"
    },
];

const App = () => (
    <div className="app">
        {users.map(user => (
            <ProfileCard key={user.id} {...user} />
        ))}
    </div>
);
```

---

## Example 3: Event Handling — The Four Patterns

```jsx
// src/components/EventDemo.jsx
import { useState } from 'react';

const EventDemo = () => {
    const [log, setLog] = useState([]);

    // Pattern 1: Named handler — for complex logic
    const handleButtonClick = (e) => {
        setLog(prev => [...prev, `Clicked: ${e.target.textContent}`]);
    };

    // Pattern 2: Inline arrow — for simple one-liners
    // Used directly in JSX below

    // Pattern 3: Handler with argument — wrap in arrow to pass extra data
    const handleItemClick = (itemName) => {
        setLog(prev => [...prev, `Item selected: ${itemName}`]);
    };

    // Pattern 4: Form submission — always preventDefault first
    const handleSubmit = (e) => {
        e.preventDefault();      // ← ALWAYS first for forms
        setLog(prev => [...prev, 'Form submitted!']);
    };

    return (
        <div>
            {/* Pattern 1: Pass the handler reference — no parentheses */}
            <button onClick={handleButtonClick}>Click Me</button>

            {/* Pattern 2: Inline arrow for simple updates */}
            <button onClick={() => setLog(prev => [...prev, 'Cleared!'])}>
                Clear Log
            </button>

            {/* Pattern 3: Inline arrow wraps the handler to pass arguments */}
            {['React', 'JavaScript', 'CSS'].map(item => (
                <button key={item} onClick={() => handleItemClick(item)}>
                    {item}
                </button>
            ))}

            {/* Pattern 4: Form with onSubmit */}
            <form onSubmit={handleSubmit}>
                <button type="submit">Submit Form</button>
            </form>

            {/* Display the event log */}
            <ul>
                {log.map((entry, i) => <li key={i}>{entry}</li>)}
            </ul>
        </div>
    );
};
```

---

## Example 4: Controlled Input — Step by Step

```jsx
// src/components/SearchBox.jsx
import { useState } from 'react';

const SearchBox = () => {
    const [query, setQuery] = useState('');

    return (
        <div className="search-box">
            {/*
                Controlled input requires TWO things:
                1. value={query}      ← React drives the display
                2. onChange={handler} ← User input updates state
                Both are required. One without the other breaks the loop.
            */}
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />

            {/* All of these are free because React owns the state */}
            <p className="char-count">{query.length} characters</p>

            {/* Clear button resets state — no DOM manipulation needed */}
            <button
                onClick={() => setQuery('')}
                disabled={query.length === 0}
            >
                Clear
            </button>

            {/* Live search results would go here */}
            {query.length > 0 && (
                <p className="search-preview">
                    Searching for: <strong>{query}</strong>
                </p>
            )}
        </div>
    );
};

export default SearchBox;
```

---

## Example 5: Full Controlled Form — Contact Form

```jsx
// src/components/ContactForm.jsx
import { useState } from 'react';

const MAX_MESSAGE = 200;

const ContactForm = () => {
    // One state variable per field
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [message, setMessage]   = useState('');
    const [submitted, setSubmitted] = useState(false);

    // Derived value — NOT a separate state variable
    const charsLeft = MAX_MESSAGE - message.length;
    const isOverLimit = message.length > MAX_MESSAGE;

    const handleSubmit = (e) => {
        e.preventDefault();  // Stop page reload

        // Access all field values directly from state
        console.log({ name, email, message });

        // Mark as submitted — triggers success UI
        setSubmitted(true);

        // Reset all fields (no DOM manipulation needed)
        setName('');
        setEmail('');
        setMessage('');
    };

    // Early return — conditional render based on submitted state
    if (submitted) {
        return (
            <div className="success-card">
                <h3>✅ Message sent!</h3>
                <p>Thanks, {name || 'there'}! We'll be in touch soon.</p>
                <button onClick={() => setSubmitted(false)}>
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <h2>Get In Touch</h2>

            {/* Controlled text input */}
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                />
            </div>

            {/* Controlled email input */}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                />
            </div>

            {/* Controlled textarea with character limit */}
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message..."
                    rows={4}
                />
                {/* Derived values — computed from state, no extra useState needed */}
                <p className={`char-count ${isOverLimit ? 'over-limit' : ''}`}>
                    {isOverLimit
                        ? `⚠️ ${Math.abs(charsLeft)} characters over limit`
                        : `${charsLeft} characters remaining`
                    }
                </p>
            </div>

            <button
                type="submit"
                disabled={!name || !email || isOverLimit}
                className="btn-submit"
            >
                Send Message
            </button>
        </form>
    );
};

export default ContactForm;
```

---

## Example 6: Like Button — Props + State Together

```jsx
// src/components/LikeButton.jsx
import { useState } from 'react';

// initialCount comes from outside (prop)
// liked and count are managed internally (state)
const LikeButton = ({ initialCount = 0, onLike }) => {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(initialCount);

    const handleLike = () => {
        const newLiked = !liked;
        const newCount = newLiked ? count + 1 : count - 1;

        setLiked(newLiked);
        setCount(newCount);

        // If parent wants to know — pass data up via callback prop
        if (onLike) onLike(newCount);
    };

    return (
        <button
            className={`like-btn ${liked ? 'like-btn--active' : ''}`}
            onClick={handleLike}
            aria-label={liked ? 'Unlike' : 'Like'}
        >
            {liked ? '❤️' : '🤍'} {count}
        </button>
    );
};

export default LikeButton;
```

```jsx
// Used in App.jsx — each has its own independent state
<LikeButton initialCount={42} onLike={(n) => console.log('New count:', n)} />
<LikeButton initialCount={128} />
<LikeButton />
```

---

## Example 7: Controlled Select, Checkbox, and Radio

```jsx
// src/components/PreferencesForm.jsx
import { useState } from 'react';

const PreferencesForm = () => {
    const [country, setCountry]       = useState('NG');
    const [agreed, setAgreed]         = useState(false);
    const [plan, setPlan]             = useState('basic');

    const plans = ['basic', 'pro', 'enterprise'];
    const countries = [
        { code: 'NG', name: 'Nigeria' },
        { code: 'GH', name: 'Ghana' },
        { code: 'KE', name: 'Kenya' },
        { code: 'ZA', name: 'South Africa' },
    ];

    return (
        <form>
            {/* CONTROLLED SELECT — value drives selected option */}
            <div className="form-group">
                <label>Country</label>
                <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                >
                    {countries.map(c => (
                        <option key={c.code} value={c.code}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* CONTROLLED RADIO GROUP — all share one state, different values */}
            <div className="form-group">
                <label>Plan</label>
                {plans.map(p => (
                    <label key={p} className="radio-label">
                        <input
                            type="radio"
                            value={p}
                            checked={plan === p}       // ← compares state to option
                            onChange={(e) => setPlan(e.target.value)}
                        />
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                    </label>
                ))}
            </div>

            {/* CONTROLLED CHECKBOX — use checked + e.target.checked */}
            <div className="form-group">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}  // ← .checked not .value
                    />
                    I agree to the Terms and Conditions
                </label>
            </div>

            <button type="submit" disabled={!agreed}>
                Continue
            </button>

            {/* Debug panel — shows state values live */}
            <div className="debug">
                <p>Country: {country} | Plan: {plan} | Agreed: {String(agreed)}</p>
            </div>
        </form>
    );
};

export default PreferencesForm;
```

---

## Quick Reference

### useState Cheat Sheet
```jsx
// Declaration
const [value, setValue] = useState(initialValue);

// Update (any type)
setValue(newValue);
setValue(prev => prev + 1);   // functional form (safer)

// Toggle boolean
setValue(prev => !prev);

// Update array (never mutate!)
setValue(prev => [...prev, newItem]);            // add
setValue(prev => prev.filter(i => i.id !== id)); // remove
setValue(prev => prev.map(i => i.id === id ? {...i, name: 'New'} : i)); // update

// Update object (never mutate!)
setValue(prev => ({ ...prev, name: 'Tolu' }));
```

### Controlled Input Checklist
```
✅ import { useState } from 'react'
✅ const [value, setValue] = useState('')
✅ <input value={value} onChange={(e) => setValue(e.target.value)} />
✅ Checkbox: use checked={bool} + e.target.checked
✅ e.preventDefault() in every form's onSubmit
```

### Mutation: Wrong vs Right
```jsx
// WRONG — direct mutation
count++;
items.push(item);
user.name = 'Tolu';

// RIGHT — use the setter with new values
setCount(prev => prev + 1);
setItems(prev => [...prev, item]);
setUser(prev => ({ ...prev, name: 'Tolu' }));
```
