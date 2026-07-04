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