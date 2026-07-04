// src/components/Navbar.jsx

import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')
    }

    const linkClass = ({ isActive }) =>
        `text-sm font-semibold transition-colors pb-1 ${isActive
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