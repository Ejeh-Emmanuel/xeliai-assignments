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