// src/App.jsx

import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Suspense fallback={<p className="p-8 text-center text-gray-500">Loading...</p>}>
        <Routes>
    
          <Route path="/login" element={<LoginPage />} />
  
          {/* /dashboard is protected — must be logged in */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </div>
  )
}