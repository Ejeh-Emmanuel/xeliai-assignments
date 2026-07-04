// src/components/ProtectedRoute.jsx

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
    const { user } = useAuth()

    // Not logged in → redirect to /login
    // replace=true means pressing Back won't return to the protected page
    if (!user) return <Navigate to="/login" replace />

    // Logged in → render the protected content
    return children
}