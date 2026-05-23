# Class 15+16: Code Samples
Lists, Data Fetching & AI Tools — Plain English First, Code Second

---

## 📋 PART 1: Lists & Conditionals

---

## Example 1: Rendering a Simple List

**In Plain English:** You have an array. You want to show each item on screen. Use `.map()`.

```jsx
// src/components/FoodList.jsx

const foods = ['Jollof Rice', 'Suya', 'Puff Puff', 'Egusi Soup', 'Akara'];

const FoodList = () => (
    <div>
        <h2>Nigerian Foods 🍲</h2>
        <ul>
            {/* .map() goes through each item and returns JSX for it */}
            {foods.map(food => (
                <li key={food}>{food}</li>
                //  ↑ key is required! Use something unique
            ))}
        </ul>
        <p>Total foods: {foods.length}</p>
    </div>
);

export default FoodList;
```

**What to notice:**
- `foods.map(food => ...)` — for each food, do this
- `key={food}` — required on each item, must be unique
- `{foods.length}` — you can use array methods directly in JSX

---

## Example 2: Rendering Objects — Real Data

**In Plain English:** Real data is usually objects with multiple fields. Same pattern — just access the fields you need.

```jsx
// src/components/StudentList.jsx

const students = [
    { id: 1, name: 'Chiamaka Nwosu', score: 74, city: 'Onitsha', passed: true  },
    { id: 2, name: 'Bayo Martins',   score: 88, city: 'Ibadan',  passed: true  },
    { id: 3, name: 'Ngozi Ike',      score: 45, city: 'Enugu',   passed: false },
    { id: 4, name: 'Tunde Alabi',    score: 92, city: 'Lagos',   passed: true  },
];

const StudentList = () => (
    <div className="student-list">
        <h2>Student Results</h2>

        {students.map(student => (
            // key goes on the outermost element inside .map()
            <div key={student.id} className="student-card">
                <h3>{student.name}</h3>
                <p>Score: {student.score}/100</p>
                <p>📍 {student.city}</p>

                {/* Conditional: show badge only if passed */}
                {student.passed && <span className="badge">✅ Passed</span>}
            </div>
        ))}

        {/* Show summary only if we have students */}
        {students.length > 0 && (
            <p>
                {students.filter(s => s.passed).length} out of {students.length} students passed.
            </p>
        )}
    </div>
);

export default StudentList;
```

---

## Example 3: The 3 Conditional Patterns

**In Plain English:** Three ways to show/hide things. Pick the right one for your situation.

```jsx
// src/components/ConditionalExamples.jsx

const ConditionalExamples = ({ isLoggedIn, score, cartItems }) => {
    const isPassing = score >= 60;

    return (
        <div>
            {/* ────────────────────────────────────────── */}
            {/* PATTERN 1: && — Show OR show nothing      */}
            {/* Use when: you only want to show something  */}
            {/*           if a condition is true           */}
            {/* ────────────────────────────────────────── */}
            {isLoggedIn && <p>👋 Welcome back!</p>}
            {cartItems > 0 && <span className="badge">{cartItems}</span>}
            {score > 90 && <span>🏆 Top of the class!</span>}


            {/* ────────────────────────────────────────── */}
            {/* PATTERN 2: Ternary — Show A or show B     */}
            {/* Use when: you always want to show          */}
            {/*           one of two options               */}
            {/* ────────────────────────────────────────── */}
            <p>{isLoggedIn ? 'You are logged in' : 'Please log in'}</p>
            <p>Result: {isPassing ? '✅ Passed' : '❌ Failed'}</p>
            <button>{isLoggedIn ? 'Log out' : 'Log in'}</button>


            {/* ────────────────────────────────────────── */}
            {/* PATTERN 3: Early Return                    */}
            {/* Used outside the return statement          */}
            {/* (see example below)                        */}
            {/* ────────────────────────────────────────── */}
        </div>
    );
};

// Pattern 3 — Early Return (used for loading/error states)
const UserProfile = ({ user, isLoading }) => {
    // Return early if loading — before reaching the main UI
    if (isLoading) return <p>Loading profile...</p>;

    // Return early if no user
    if (!user) return <p>User not found.</p>;

    // Only reach here when everything is fine
    return (
        <div className="profile">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
};
```

---

## Example 4: Full Todo List — Lists + State Together

**In Plain English:** An array in state. Each action (add, delete, toggle) creates a new array without mutating the old one.

```jsx
// src/components/TodoList.jsx
import { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);   // list of todo objects
    const [input, setInput] = useState('');   // what the user is typing

    // ADD — create a new todo and add it to the list
    const addTodo = () => {
        if (!input.trim()) return;           // don't add empty todos
        setTodos(prev => [
            ...prev,                         // keep all existing todos
            { id: Date.now(), text: input, done: false }  // add new one
        ]);
        setInput('');                        // clear the input field
    };

    // TOGGLE — flip done/not done for one specific todo
    const toggleTodo = (id) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, done: !todo.done }  // flip this one
                    : todo                            // leave others alone
            )
        );
    };

    // DELETE — remove one todo from the list
    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        // filter returns everything EXCEPT the deleted one
    };

    // COUNT — how many are left to do (derived — no extra state needed)
    const remaining = todos.filter(t => !t.done).length;

    return (
        <div className="todo-list">
            <h2>My Tasks</h2>

            {/* Input area */}
            <div className="input-row">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="What needs to be done?"
                    onKeyDown={e => e.key === 'Enter' && addTodo()}
                />
                <button onClick={addTodo}>Add</button>
            </div>

            {/* The list — rendered with .map() */}
            <ul className="todos">
                {todos.map(todo => (
                    <li key={todo.id} className={todo.done ? 'done' : ''}>
                        <span
                            onClick={() => toggleTodo(todo.id)}
                            style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
                        >
                            {todo.text}
                        </span>
                        <button onClick={() => deleteTodo(todo.id)}>✕</button>
                    </li>
                ))}
            </ul>

            {/* Conditional: only show stats when there are todos */}
            {todos.length > 0 && (
                <p className="stats">
                    {remaining} task{remaining !== 1 ? 's' : ''} remaining
                </p>
            )}

            {/* Empty state: show encouragement when list is empty */}
            {todos.length === 0 && (
                <p className="empty">Nothing to do. Add a task above! 🎉</p>
            )}
        </div>
    );
};

export default TodoList;
```

---

## 🌐 PART 2: useEffect & Data Fetching

---

## Example 5: useEffect — The Basic Pattern

**In Plain English:** useEffect runs code AFTER the component appears on screen. Use it for: fetching data, starting timers, setting up anything that needs to happen "after render".

```jsx
// src/components/EffectExamples.jsx
import { useState, useEffect } from 'react';

const EffectExamples = () => {
    const [count, setCount] = useState(0);

    // Run ONCE when component first appears (mounts)
    useEffect(() => {
        console.log('Component appeared on screen!');
        document.title = 'Hello from React';  // Update browser tab title
    }, []);  // ← empty [] = "run once only"


    // Run every time 'count' changes
    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);  // ← [count] = "run when count changes"


    // ⚠️ Runs on EVERY render — usually wrong!
    // useEffect(() => {
    //     console.log('This runs too often!');
    // });  // ← no [] = runs every single render


    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(c => c + 1)}>+</button>
        </div>
    );
};
```

---

## Example 6: Fetching Data — The Complete Pattern

**In Plain English:** Fetch some data when the component loads. Handle three possible outcomes: loading, error, and success.

```jsx
// src/components/JokeCard.jsx
import { useState, useEffect } from 'react';

const JokeCard = () => {
    // Step 1: Declare the 3 state variables you ALWAYS need
    const [joke, setJoke]       = useState(null);   // the actual data
    const [loading, setLoading] = useState(true);   // are we waiting?
    const [error, setError]     = useState(null);   // did something break?

    // Step 2: Write the fetch function
    const fetchJoke = async () => {
        setLoading(true);   // start showing spinner
        setError(null);     // clear any old error

        try {
            const response = await fetch('https://official-joke-api.appspot.com/random_joke');
            const data     = await response.json();
            setJoke(data);  // store the joke in state
        } catch (err) {
            setError('Could not load a joke. Please try again.');
        } finally {
            setLoading(false);  // always stop showing spinner
        }
    };

    // Step 3: Call it when component loads
    useEffect(() => {
        fetchJoke();
    }, []);  // [] = run once

    // Step 4: Handle the 4 possible states
    if (loading) return <p>⏳ Loading a joke...</p>;
    if (error)   return (
        <div>
            <p>❌ {error}</p>
            <button onClick={fetchJoke}>Try Again</button>
        </div>
    );
    if (!joke)   return <p>📭 No joke found.</p>;

    // Step 5: Render the data
    return (
        <div className="joke-card">
            <p className="setup">😂 {joke.setup}</p>
            <p className="punchline">🥁 {joke.punchline}</p>
            <button onClick={fetchJoke}>Next Joke</button>
        </div>
    );
};

export default JokeCard;
```

---

## Example 7: Fetching a List of Items

**In Plain English:** Same pattern — but the API returns an array, so we initialize state as `[]` and render it with `.map()`.

```jsx
// src/components/UserFeed.jsx
import { useState, useEffect } from 'react';

const UserFeed = () => {
    const [users, setUsers]     = useState([]);    // array, not null
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res  = await fetch('https://randomuser.me/api/?results=6');
            const data = await res.json();
            setUsers(data.results);  // data.results is the array of users
        } catch {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p>⏳ Loading users...</p>;
    if (error)   return <p>❌ {error} <button onClick={fetchUsers}>Retry</button></p>;
    if (users.length === 0) return <p>📭 No users found.</p>;

    return (
        <div>
            <h2>Users ({users.length})</h2>
            <button onClick={fetchUsers}>🔄 Refresh</button>

            <div className="user-grid">
                {users.map(user => (
                    <div key={user.login.uuid} className="user-card">
                        <img src={user.picture.medium} alt={user.name.first} />
                        <h3>{user.name.first} {user.name.last}</h3>
                        <p>{user.email}</p>
                        <p>📍 {user.location.city}, {user.location.country}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserFeed;
```

---

## Example 8: Re-fetch When Something Changes

**In Plain English:** Put the variable you want to watch in the dependency array. When it changes, useEffect runs again and fetches new data.

```jsx
// src/components/CountryInfo.jsx
import { useState, useEffect } from 'react';

const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa'];

const CountryInfo = () => {
    const [selected, setSelected]   = useState('Nigeria');
    const [country, setCountry]     = useState(null);
    const [loading, setLoading]     = useState(false);

    // Re-runs every time 'selected' changes
    useEffect(() => {
        setLoading(true);
        fetch(`https://restcountries.com/v3.1/name/${selected}`)
            .then(r => r.json())
            .then(data => {
                setCountry(data[0]);
                setLoading(false);
            });
    }, [selected]);  // ← watch 'selected'

    return (
        <div>
            <select
                value={selected}
                onChange={e => setSelected(e.target.value)}
            >
                {countries.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            {loading && <p>Loading...</p>}

            {country && !loading && (
                <div>
                    <h2>{country.name.common}</h2>
                    <p>Capital: {country.capital?.[0]}</p>
                    <p>Population: {country.population?.toLocaleString()}</p>
                    <img src={country.flags.svg} alt="flag" width={80} />
                </div>
            )}
        </div>
    );
};

export default CountryInfo;
```

---

## 🤖 PART 3: AI Coding Tools

---

## Example 9: What Good AI Prompts Look Like

**These are real prompts you can copy and adapt:**

```
// Debugging prompt:
"I'm building a React app with Vite. I'm using useEffect to fetch from an API
but my component re-renders infinitely. Here's my code:

[paste your component code here]

What is causing the infinite loop and how do I fix it? Please explain why."


// Understanding prompt:
"Explain this React code to me line by line, as if I'm a complete beginner.
Don't skip any lines:

[paste code]"


// Code review prompt:
"Review this React component. Tell me:
1. Is there anything wrong with it?
2. Is there a better way to write any part of it?
3. Am I handling errors and loading states correctly?
4. Would this cause any performance issues?

[paste component]"


// Concept simplification:
"I don't understand the useEffect dependency array. 
Explain it using a simple everyday analogy — like a phone notification
or a delivery app. No technical jargon."


// Error explanation:
"I'm getting this error in my React component:
'TypeError: Cannot read properties of undefined (reading 'map')'

Here is my code:
[paste code]

Explain why this error happens and how to fix it. Also explain how to 
prevent this error in future."
```

---

## Quick Reference

### The .map() Pattern
```jsx
{array.map(item => (
    <Component key={item.id} {...item} />
))}
```

### The 3 Conditional Patterns
```jsx
{condition && <ShowThis />}                          // show OR nothing
{condition ? <ShowThis /> : <ShowThat />}            // A or B
if (!data) return <Loading />;                       // early return
```

### The Data Fetching Template (copy this every time)
```jsx
import { useState, useEffect } from 'react';

const MyDataComponent = () => {
    const [data, setData]       = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const res  = await fetch('YOUR_API_URL_HERE');
            const json = await res.json();
            setData(json);             // adjust this based on API structure
        } catch (err) {
            setError('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    if (loading) return <p>Loading...</p>;
    if (error)   return <p>{error} <button onClick={fetchData}>Retry</button></p>;
    if (!data || data.length === 0) return <p>No data found.</p>;

    return (
        <div>
            {data.map(item => (
                <div key={item.id}>{/* render item */}</div>
            ))}
        </div>
    );
};
```

### Free APIs — No Key Needed
```
Jokes:    https://official-joke-api.appspot.com/random_joke
Users:    https://randomuser.me/api/?results=10
Quotes:   https://quotable.io/random
Products: https://fakestoreapi.com/products
Countries:https://restcountries.com/v3.1/all
Cat Facts:https://catfact.ninja/fact
```
