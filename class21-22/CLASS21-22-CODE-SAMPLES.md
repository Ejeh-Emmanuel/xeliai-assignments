# CLASS 21+22: CODE SAMPLES

## Authentication & Build Process

### Every sample here matches a code block on the slides exactly.

### Slides show abbreviated versions — this file has the complete, runnable code.

---

## Sample 1 — AuthContext.jsx (Slide 6)

> **Full version of the abbreviated snippet on Slide 6**

```jsx
// src/context/AuthContext.jsx

import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Wrap your whole app with this in main.jsx
export function AuthProvider({ children }) {
  // On first load, restore user from localStorage if they were previously logged in
  const [user, setUser] = useState(function () {
    try {
      const saved = localStorage.getItem('user')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  // Call login(userData) after a successful API call
  // userData = { email: '...', token: '...' }
  function login(userData) {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // Call logout() from any button — clears everything
  function logout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// useAuth() is the hook every component calls to read auth state
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth() must be used inside <AuthProvider>')
  return ctx
}
```

---

## Sample 2 — main.jsx with AuthProvider (Slide 6)

> **Where AuthProvider wraps the whole app**

```jsx
// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
```

---

## Sample 3 — LoginPage.jsx (Slide 7)

> **Full login page — React Hook Form + AuthContext + reqres.in API**

```jsx
// src/pages/LoginPage.jsx

import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate   = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(data) {
    try {
      // reqres.in is a free mock API — no real backend needed
      const res = await fetch('https://reqres.in/api/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })

      if (!res.ok) throw new Error('Invalid credentials')

      const { token } = await res.json()

      // Store user in Context + localStorage
      login({ email: data.email, token })

      // Send user to the dashboard after successful login
      navigate('/dashboard')

    } catch {
      // setError('root') creates a form-level error (not tied to a field)
      setError('root', { message: 'Invalid email or password. Please try again.' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-900">Log In</h1>

        {/* Form-level error from failed API call */}
        {errors.root && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
            {errors.root.message}
          </p>
        )}

        {/* Email field */}
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400
              ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400
              ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit button — disables and shows spinner while submitting */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold
                     hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </button>

        <p className="text-sm text-center text-gray-500">
          No account? <Link to="/signup" className="text-indigo-600 font-semibold">Sign up</Link>
        </p>
      </form>
    </div>
  )
}
```

**Test credentials for reqres.in:**

```
Email:    eve.holt@reqres.in
Password: cityslicka
```

---

## Sample 4 — SignupPage.jsx (Homework)

> **Signup with confirm password validation — validate() function**

```jsx
// src/pages/SignupPage.jsx

import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function SignupPage() {
  const { login }  = useAuth()
  const navigate   = useNavigate()

  const {
    register,
    handleSubmit,
    watch,          // watch() lets you read another field's current value
    setError,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(data) {
    try {
      const res = await fetch('https://reqres.in/api/register', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: data.email, password: data.password }),
      })

      if (!res.ok) throw new Error('Registration failed')

      const { token } = await res.json()
      login({ email: data.email, token })
      navigate('/dashboard')

    } catch {
      setError('root', { message: 'Could not create account. Try a different email.' })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
      >
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>

        {errors.root && (
          <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
            {errors.root.message}
          </p>
        )}

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            className={`w-full border rounded-lg px-3 py-2 text-sm
              ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            className={`w-full border rounded-lg px-3 py-2 text-sm
              ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            {...register('password', {
              required:  'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            className={`w-full border rounded-lg px-3 py-2 text-sm
              ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              // validate reads the live value of 'password' and compares
              validate: (value) =>
                value === watch('password') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold
                     hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-sm text-center text-gray-500">
          Have an account? <Link to="/login" className="text-indigo-600 font-semibold">Log in</Link>"x-api-key": "free_user_3G2LJto9bdV06w15RxyIDuW653A"
        </p>
      </form>
    </div>
  )
}
```

---

## Sample 5 — ProtectedRoute.jsx (Slide 8)

> **Full version of the ProtectedRoute component shown on Slide 8**

```jsx
// src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom'
import { useAuth }  from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user } = useAuth()

  // Not logged in → redirect to /login
  // replace=true means pressing Back won't return to the protected page
  if (!user) return <Navigate to="/login" replace />

  // Logged in → render the protected content
  return children
}
```

---

## Sample 6 — App.jsx with auth routes + ProtectedRoute (Slide 8)

> **How ProtectedRoute plugs into your route map**

```jsx
// src/App.jsx

import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense }  from 'react'

import Navbar          from './components/Navbar'
import ProtectedRoute  from './components/ProtectedRoute'

// Lazy-loaded pages (see Sample 9 for explanation)
const HomePage     = lazy(() => import('./pages/HomePage'))
const LoginPage    = lazy(() => import('./pages/LoginPage'))
const SignupPage   = lazy(() => import('./pages/SignupPage'))
const Dashboard    = lazy(() => import('./pages/DashboardPage'))
const NotFound     = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<p className="p-8 text-center text-gray-500">Loading...</p>}>
        <Routes>
          <Route path="/"        element={<HomePage />} />
          <Route path="/login"   element={<LoginPage />} />
          <Route path="/signup"  element={<SignupPage />} />

          {/* /dashboard is protected — must be logged in */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 — must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}
```

---

## Sample 7 — DashboardPage.jsx (Slide 9)

> **A protected page that reads the logged-in user from Context**

```jsx
// src/pages/DashboardPage.jsx

import { useAuth }     from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate          = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-500 mb-6">
          You are logged in as <strong>{user.email}</strong>
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase mb-1">Your Token</p>
          <p className="text-xs font-mono text-gray-600 break-all">{user.token}</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg
                     hover:bg-red-600 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}
```

---

## Sample 8 — Navbar with Auth State (Slide 9)

> **Navbar that switches between Log In and Log Out based on auth state**

```jsx
// src/components/Navbar.jsx

import { NavLink }    from 'react-router-dom'
import { useAuth }    from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate          = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors pb-1 ${
      isActive
        ? 'text-white border-b-2 border-indigo-300'
        : 'text-indigo-200 hover:text-white'
    }`

  return (
    <nav className="bg-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="text-white text-lg font-bold">
          🌍 My App
        </NavLink>

        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>Home</NavLink>

          {/* Show different links based on whether user is logged in */}
          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-red-300 hover:text-white transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>Log In</NavLink>
          )}
        </div>
      </div>
    </nav>
  )
}
```

---

## Sample 9 — Environment Variables Setup (Slides 12 & 15)

> **Complete .env, .env.example, .gitignore, and usage in code**

```bash
# .env  ← NEVER commit this file to GitHub
# It stays on your machine only.
VITE_TMDB_KEY=your_actual_tmdb_api_key_here
VITE_APP_NAME=Country Explorer
VITE_API_BASE=https://restcountries.com/v3.1
```

```bash
# .env.example  ← ALWAYS commit this file
# Teammates copy this to .env and fill in their own values.
VITE_TMDB_KEY=get_your_key_from_themoviedb.org
VITE_APP_NAME=My App
VITE_API_BASE=https://restcountries.com/v3.1
```

```bash
# .gitignore  ← confirm .env is already listed (Vite adds it by default)
node_modules
dist
.env
.env.local
.env.*.local
```

```jsx
// Using env vars in your React code (Vite syntax):
const API_KEY  = import.meta.env.VITE_TMDB_KEY
const APP_NAME = import.meta.env.VITE_APP_NAME
const BASE_URL = import.meta.env.VITE_API_BASE

// Guard — log an error if the key is missing
if (!API_KEY) {
  console.error('Missing VITE_TMDB_KEY — check your .env file')
}

// Use in a fetch call
const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`
```

> ⚠️ **Important:** Restart `npm run dev` after editing `.env`. Environment variables are read at build time, not runtime — they won't update with a browser refresh alone.

---

## Sample 10 — npm run build + preview (Slide 13)

```bash
# Build your app for production:
npm run build

# This creates a dist/ folder:
# dist/
# ├── index.html
# └── assets/
#     ├── index-abc123.js    ← all your JavaScript, minified
#     └── index-def456.css   ← all your CSS, minified

# Test the production build locally before deploying:
npm run preview

# Preview serves dist/ on http://localhost:4173
# If it works here, it will work on Netlify/Vercel too.
```

---

## Sample 11 — Lazy Loading Routes (Slide 14)

> **Full conversion of App.jsx from regular imports to lazy imports**

```jsx
// BEFORE — all pages downloaded when the app first loads
import HomePage    from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import LoginPage   from './pages/LoginPage'
import Dashboard   from './pages/DashboardPage'
import NotFound    from './pages/NotFound'


// AFTER — each page downloads only when the user navigates to it
import { lazy, Suspense } from 'react'

const HomePage    = lazy(() => import('./pages/HomePage'))
const CountryPage = lazy(() => import('./pages/CountryPage'))
const LoginPage   = lazy(() => import('./pages/LoginPage'))
const Dashboard   = lazy(() => import('./pages/DashboardPage'))
const NotFound    = lazy(() => import('./pages/NotFound'))

// Suspense shows the fallback while the lazy page is downloading
export default function App() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<p className="p-8 text-center text-gray-500">Loading page...</p>}>
        <Routes>
          <Route path="/"             element={<HomePage />} />
          <Route path="/country/:name" element={<CountryPage />} />
          <Route path="/login"         element={<LoginPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  )
}
```

---

## Quick Reference — All Imports

```jsx
// Auth
import { createContext, useContext, useState } from 'react'
import { Navigate, useNavigate }               from 'react-router-dom'

// Forms
import { useForm } from 'react-hook-form'

// Lazy loading
import { lazy, Suspense } from 'react'

// Auth context hook (in any component)
import { useAuth } from '../context/AuthContext'

// Protected route (in App.jsx)
import ProtectedRoute from './components/ProtectedRoute'
```

---

## reqres.in Test Credentials (Use in class for all demos)

| Field         | Value                               |
| ------------- | ----------------------------------- |
| Login URL     | `https://reqres.in/api/login`       |
| Register URL  | `https://reqres.in/api/register`    |
| Test Email    | `eve.holt@reqres.in`                |
| Test Password | `cityslicka`                        |
| Returns       | `{ "token": "QpwL5tpe83ilfN2..." }` |
