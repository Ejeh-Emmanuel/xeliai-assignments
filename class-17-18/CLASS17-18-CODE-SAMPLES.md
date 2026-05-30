# Class 17+18: Code Samples & Practice Exercises
React Router & Mini Project Kickoff

---

## CODE SAMPLES

### Sample 1: Complete Router Setup (Copy This Every Time)

```jsx
// main.jsx — BrowserRouter goes here, once, wrapping everything
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
```

```jsx
// App.jsx — The route map. Only routes here, nothing else.
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import NotFound from './pages/NotFound';

const App = () => (
    <div>
        <Navbar />  {/* Shows on EVERY page */}
        <Routes>
            <Route path="/"        element={<HomePage />} />
            <Route path="/item/:id" element={<DetailPage />} />
            <Route path="*"        element={<NotFound />} />
            {/* * must always be LAST */}
        </Routes>
    </div>
);

export default App;
```

---

### Sample 2: Navbar with NavLink Active Styling

```jsx
// components/Navbar.jsx
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    // Reusable style function — pass to every NavLink
    const linkStyle = ({ isActive }) => ({
        color:      isActive ? '#6366f1' : '#a0aec0',
        fontWeight: isActive ? '700'     : '400',
        textDecoration: 'none',
        padding: '8px 16px',
        borderBottom: isActive ? '2px solid #6366f1' : '2px solid transparent',
    });

    return (
        <nav style={{ display: 'flex', gap: '8px', padding: '16px' }}>
            <NavLink to="/"      style={linkStyle}>Home</NavLink>
            <NavLink to="/about" style={linkStyle}>About</NavLink>
            <NavLink to="/items" style={linkStyle}>Browse</NavLink>
        </nav>
    );
};

export default Navbar;
```

---

### Sample 3: Dynamic Route — Detail Page Pattern

```jsx
// pages/MoviePage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MoviePage = () => {
    const { id }     = useParams();    // reads the :id from the URL
    const navigate   = useNavigate();
    const [movie, setMovie]     = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_KEY`)
            .then(r => r.json())
            .then(data => {
                setMovie(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Could not load movie.');
                setLoading(false);
            });
    }, [id]); // re-fetch when :id changes in the URL

    if (loading) return <p>Loading movie...</p>;
    if (error)   return (
        <div>
            <p>{error}</p>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
    if (!movie)  return <p>Movie not found.</p>;

    return (
        <div>
            <button onClick={() => navigate(-1)}>← Back</button>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Released: {movie.release_date}</p>
        </div>
    );
};

export default MoviePage;
```

---

### Sample 4: Home Page with Clickable Cards

```jsx
// pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
    const [movies, setMovies]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
            const res  = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=...`);
            const data = await res.json();
            setMovies(data.results);
        } catch {
            setError('Could not load movies.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMovies(); }, []);

    if (loading) return <p>Loading movies...</p>;
    if (error)   return <p>{error} <button onClick={fetchMovies}>Try Again</button></p>;

    return (
        <div>
            <h1>Popular Movies</h1>
            <div className="movie-grid">
                {movies.map(movie => (
                    // Link wraps the whole card — clicking anywhere navigates
                    <Link key={movie.id} to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                        <MovieCard movie={movie} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
```

```jsx
// components/MovieCard.jsx — reusable, receives props, no fetching
const MovieCard = ({ movie }) => (
    <div className="movie-card">
        <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average?.toFixed(1)}</p>
    </div>
);

export default MovieCard;
```

---

### Sample 5: Search + Filter Pattern

```jsx
// SearchBar drives filtered results — state lives in the parent
import { useState } from 'react';

const MovieListWithSearch = ({ movies }) => {
    const [query, setQuery] = useState('');

    // Derived — not stored in state
    const filtered = movies.filter(m =>
        m.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search movies..."
            />
            <p>{filtered.length} results</p>
            <div className="grid">
                {filtered.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            {filtered.length === 0 && (
                <p>No movies match "{query}"</p>
            )}
        </div>
    );
};
```

---

### Sample 6: 404 Page

```jsx
// pages/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontSize: '80px' }}>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/">← Back to Home</Link>
    </div>
);

export default NotFound;
```

---

## PRACTICE EXERCISES

### Exercise 1: Install and Wire Up Router (10 minutes)

**Goal:** Get React Router running in your project.

**Steps:**
1. In your terminal, inside your project: `npm install react-router-dom`
2. In `main.jsx` — wrap `<App />` with `<BrowserRouter>`
3. Create these placeholder files:
   - `src/pages/HomePage.jsx` → `const HomePage = () => <h1>Home</h1>`
   - `src/pages/AboutPage.jsx` → `const AboutPage = () => <h1>About</h1>`
   - `src/pages/NotFound.jsx` → see Sample 6 above
4. In `App.jsx`, set up Routes for `/`, `/about`, and `*`
5. Test: go to `localhost:5173/about`. Does AboutPage show? Go to `/banana`. Does NotFound show?

**✅ Success:** Navigating to different URLs shows different components with no page reload.

---

### Exercise 2: Build a Working Navbar (10 minutes)

**Goal:** Add a Navbar with NavLink active styling.

**Steps:**
1. Create `src/components/Navbar.jsx`
2. Import NavLink from react-router-dom
3. Add links to `/` and `/about`
4. Use the `isActive` style function to highlight the current page in a different colour
5. Import and render `<Navbar />` in App.jsx above `<Routes>`

**Test:** Click between Home and About. Does the active link change colour?

**Verify:** Use `<a href>` instead of `<Link to>` — what happens? (Page reloads. Always use Link.)

---

### Exercise 3: Dynamic Route + useParams (20 minutes)

**Goal:** Click a card → navigate to its detail page.

**Steps:**
1. Add a `/country/:name` Route to App.jsx
2. Create `src/pages/CountryPage.jsx`
3. In CountryPage: use `useParams()` to get `name` from the URL
4. Fetch from `https://restcountries.com/v3.1/name/${name}` using useEffect with `[name]`
5. Show the country name, capital, and flag
6. Add a "← Back" button using `useNavigate(-1)`
7. On your HomePage, add a few countries as clickable `<Link to="/country/Nigeria">Nigeria</Link>` items

**Test:** Click Nigeria → CountryPage shows Nigeria's data. Click the back button → returns to home.

---

### Exercise 4: Mini Project Planning Session (15 minutes)

**Goal:** Use AI to plan your mini project before writing any code.

**Steps:**
1. Pick your project option (Movie, Recipe, or Country)
2. Open Claude or ChatGPT
3. Paste this prompt (fill in your project):

```
I'm building a [PROJECT NAME] app with React, Vite, and React Router.
The API I'm using is [API NAME / URL].
The app needs: a home page with cards, a search bar, a detail page at /:id, and a 404 page.

Help me:
1. Plan the complete folder structure
2. List every component I'll need and what it does
3. Decide where state should live and why
4. Write the full App.jsx with all routes set up
```

4. Read the response. Do you understand every part?
5. Ask AI to explain anything you don't understand.
6. Start creating the files.

**The goal isn't to generate the whole app — it's to understand what you're building before you build it.**

---

### Exercise 5: Get the Skeleton Running (in-class build)

**Goal:** By the end of class, have this working:
- [ ] Vite project created and running
- [ ] React Router installed
- [ ] All page files created with placeholder content
- [ ] All routes wired up in App.jsx
- [ ] Navbar navigating between pages
- [ ] At least one API call working on the home page

**Instructor note:** This is a live class exercise. Walk around and help individually. The goal is that everyone leaves class with a running skeleton — not a finished app.

---

## Quick Reference

### React Router Install
```bash
npm install react-router-dom
```

### The 7 Things You Import
```jsx
import { BrowserRouter } from 'react-router-dom';  // main.jsx only
import { Routes, Route }  from 'react-router-dom';  // App.jsx
import { Link, NavLink }  from 'react-router-dom';  // navigation
import { useParams }      from 'react-router-dom';  // read :param
import { useNavigate }    from 'react-router-dom';  // navigate programmatically
```

### Common Mistakes
```
❌ <a href="/about">      → reloads page
✅ <Link to="/about">     → instant navigation

❌ path="*" listed first  → catches valid routes
✅ path="*" listed last   → only catches invalid routes

❌ useParams() outside a Router context → throws error
✅ BrowserRouter wraps App in main.jsx  → works everywhere

❌ useEffect(() => {}, []) with no [id] on detail page → stale data
✅ useEffect(() => {}, [id])            → re-fetches on navigation
```
