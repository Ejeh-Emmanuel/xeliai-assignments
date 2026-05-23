# Class 15+16: Practice Exercises
In-Class Activities — Lists, Data Fetching & AI Tools

**A note on these exercises:** They are shorter and simpler than previous classes. The goal is to fully understand each concept — not to rush through. If you finish early, the challenge extension is there for you.

---

## Exercise 1: Your First List (10 minutes)

**Goal:** Render an array as JSX using `.map()`.

**Plain English:** You have a list of 5 Nigerian cities. Show each one as a styled card on the page. You should only need to write the JSX once — `.map()` does the rest.

**Task:**
1. Create `src/components/CityList.jsx`
2. Inside it, declare this array:
```javascript
const cities = [
    { id: 1, name: 'Lagos',   region: 'South-West' },
    { id: 2, name: 'Abuja',   region: 'North-Central' },
    { id: 3, name: 'Kano',    region: 'North-West' },
    { id: 4, name: 'Enugu',   region: 'South-East' },
    { id: 5, name: 'Ibadan',  region: 'South-West' },
];
```
3. Render them as a list. Each item should show the city name and region.
4. Make sure the `key` uses `city.id`

**Expected Output:**
```jsx
const CityList = () => (
    <div>
        <h2>Nigerian Cities</h2>
        {cities.map(city => (
            <div key={city.id} className="city-card">
                <h3>{city.name}</h3>
                <p>{city.region}</p>
            </div>
        ))}
    </div>
);
```

**After it works:**
- Add a 6th city to the array. What changed in the JSX? (Nothing — that's the point.)
- Add a `population` field to two cities. Show it only for cities that have it (`{city.population && <p>...</p>}`).

**🤖 If you're stuck:** Ask AI: *"In React, how do I render an array of objects as a list of div elements? Show me a simple example with a key prop."*

---

## Exercise 2: Show & Hide (10 minutes)

**Goal:** Use conditional rendering to control what's visible.

**Plain English:** Build a simple profile card. Show a "Pro Member" badge only if the user has `isPro: true`. Show their bio only after clicking "Show Bio".

**Task:** Create `src/components/ProfileCard.jsx` with:
- Props: `name`, `isPro`, `bio`
- A "Pro Member ⭐" badge that appears only when `isPro` is true
- A "Show Bio" button that toggles the bio text (use `useState`)
- The button text changes: "Show Bio" when hidden, "Hide Bio" when shown

**Expected Answer:**
```jsx
import { useState } from 'react';

const ProfileCard = ({ name, isPro = false, bio }) => {
    const [showBio, setShowBio] = useState(false);

    return (
        <div className="profile-card">
            <h3>{name}</h3>

            {/* Show badge only if isPro is true */}
            {isPro && <span className="pro-badge">⭐ Pro Member</span>}

            {/* Button toggles showBio */}
            <button onClick={() => setShowBio(prev => !prev)}>
                {showBio ? 'Hide Bio' : 'Show Bio'}
            </button>

            {/* Show bio only when showBio is true */}
            {showBio && <p className="bio">{bio}</p>}
        </div>
    );
};

export default ProfileCard;
```

```jsx
// Use it in App.jsx:
<ProfileCard name="Tolu" isPro={true} bio="Frontend developer from Lagos." />
<ProfileCard name="Ngozi" isPro={false} bio="UI designer and coffee lover." />
<ProfileCard name="Emeka" isPro={true} bio="Building the next big thing." />
```

**Discussion:** For the `isPro` badge — why did we use `&&` and not a ternary? What would a ternary show when `isPro` is false?

---

## Exercise 3: Your First Data Fetch (20 minutes)

**Goal:** Fetch data from a real API and display it. Handle loading and error states.

**Plain English:** We're going to fetch a random joke from the internet and display it on screen. Before the joke loads, show "Loading...". If something goes wrong, show an error message.

**Task:** Create `src/components/JokeCard.jsx` that:
1. Fetches from `https://official-joke-api.appspot.com/random_joke`
2. Shows "⏳ Loading a joke..." while waiting
3. Shows "❌ Could not load joke" if it fails
4. Shows the joke's `setup` and `punchline` when it loads
5. Has a "Next Joke 😂" button that fetches a new joke

**Step-by-step guidance:**
```
Step 1: Import useState and useEffect
Step 2: Create 3 state variables: joke (null), loading (true), error (null)
Step 3: Write a fetchJoke async function with try/catch/finally
Step 4: Call it in useEffect with []
Step 5: Write the if (loading) early return
Step 6: Write the if (error) early return
Step 7: Write the success render with joke.setup and joke.punchline
```

**Expected Answer:**
```jsx
import { useState, useEffect } from 'react';

const JokeCard = () => {
    const [joke, setJoke]       = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    const fetchJoke = async () => {
        setLoading(true);
        setError(null);
        try {
            const res  = await fetch('https://official-joke-api.appspot.com/random_joke');
            const data = await res.json();
            setJoke(data);
        } catch {
            setError('Could not load a joke. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    if (loading) return <p>⏳ Loading a joke...</p>;
    if (error)   return (
        <div>
            <p>❌ {error}</p>
            <button onClick={fetchJoke}>Try Again</button>
        </div>
    );

    return (
        <div className="joke-card">
            <p className="setup">😄 {joke.setup}</p>
            <p className="punchline">🥁 {joke.punchline}</p>
            <button onClick={fetchJoke}>Next Joke 😂</button>
        </div>
    );
};

export default JokeCard;
```

**🤖 AI Task:** After getting it working, paste your code into Claude and ask: *"Review this React component. Is there anything I could improve? Is the error handling correct?"*

---

## Exercise 4: List from an API (20 minutes)

**Goal:** Combine data fetching with `.map()` to render a list from the internet.

**Plain English:** This exercise brings everything together. Fetch 5 random users from the internet, show them as cards on screen.

**Task:** Create `src/components/UserFeed.jsx` that:
1. Fetches from `https://randomuser.me/api/?results=5`
2. Handles loading, error, and success states
3. Maps over `data.results` and renders a card for each user showing:
   - Their profile picture (`user.picture.medium`)
   - Their full name (`user.name.first` + `user.name.last`)
   - Their email (`user.email`)
4. A "Load New Users" button that re-fetches

**Before coding — open `randomuser.me/api/?results=3` in your browser. Look at the JSON structure. Find the fields you'll use.**

**Expected Answer:**
```jsx
import { useState, useEffect } from 'react';

const UserFeed = () => {
    const [users, setUsers]     = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res  = await fetch('https://randomuser.me/api/?results=5');
            const data = await res.json();
            setUsers(data.results);
        } catch {
            setError('Could not load users.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    if (loading) return <p>⏳ Loading users...</p>;
    if (error)   return <p>❌ {error} <button onClick={fetchUsers}>Retry</button></p>;

    return (
        <div>
            <button onClick={fetchUsers}>🔄 Load New Users</button>
            <div className="user-grid">
                {users.map(user => (
                    <div key={user.login.uuid} className="user-card">
                        <img src={user.picture.medium} alt={user.name.first} />
                        <h3>{user.name.first} {user.name.last}</h3>
                        <p>{user.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserFeed;
```

**Challenge:** Add a filter — show only users from a specific country. (Hint: `users.filter(u => u.location.country === 'Nigeria')` — though the API may not return Nigerian users. Try filtering by any other field.)

---

## Exercise 5: AI Debugging Challenge (10 minutes)

**Goal:** Practice using AI to debug intentionally broken code.

**Task:** The code below has **4 bugs**. Your job is to:
1. Try to spot them yourself first (5 minutes)
2. Paste the broken code into Claude or ChatGPT and ask it to find the bugs
3. Compare what you found vs what AI found

**The broken code:**
```jsx
// 🐛 This code has 4 bugs. Find them!
import { useState } from 'react';

const BuggyList = () => {
    const [items, setItems] = useState(null);     // Bug 1
    const [input, setInput] = useState('');

    const addItem = () => {
        items.push(input);                         // Bug 2
        setInput('');
    };

    return (
        <div>
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button onClick={addItem()}>Add</button>  {/* Bug 3 */}

            <ul>
                {items.map((item, index) => (         /* Bug 4 */
                    <li>{item}</li>
                ))}
            </ul>
        </div>
    );
};
```

**The 4 bugs:**
1. `useState(null)` should be `useState([])` — you can't call `.map()` on null
2. `items.push(input)` directly mutates state — should be `setItems(prev => [...prev, input])`
3. `onClick={addItem()}` calls the function immediately — should be `onClick={addItem}` (no parentheses)
4. `<li>{item}</li>` is missing the `key` prop — should be `<li key={index}>{item}</li>` (or use a better unique id)

**Discussion:** Which bugs did you spot yourself? Which did AI catch faster? What does this tell you about when to reach for AI?

---

## Solutions & Key Checks

**For every exercise, verify:**

1. `.map()` is used inside `{}` in JSX — not outside the return
2. `key` prop is on the outermost element inside `.map()`
3. State arrays are **never mutated** — always use the setter
4. `import { useState, useEffect } from 'react'` — both hooks imported when needed
5. useEffect has `[]` at the end for run-once behaviour
6. All three states handled: loading, error, success

**Common mistakes to watch for:**
- Missing `key` prop → console warning
- `useState(null)` instead of `useState([])` for lists → `.map()` crash
- `onClick={fn()}` with parentheses → runs immediately
- Forgetting `async` on the fetch function → `.json()` errors
- No `[]` on useEffect → infinite loop
