// HW19 — Tailwind-styled Navbar with active NavLink highlighting
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  // isActive function controls which styles apply to the current page link
  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors pb-1 ${
      isActive
        ? 'text-white border-b-2 border-indigo-300'
        : 'text-indigo-200 hover:text-white'
    }`

  return (
    <nav className="bg-indigo-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Brand */}
        <NavLink
          to="/"
          className="text-white text-xl font-bold tracking-wide hover:text-indigo-200 transition-colors"
        >
          🌍 Country Explorer
        </NavLink>

        {/* Links */}
        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
          {/* Add more NavLinks here as the app grows */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
