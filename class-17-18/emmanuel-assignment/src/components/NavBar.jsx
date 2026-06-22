import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* TITLE */}
          <h1 className="text-xl md:text-2xl font-bold text-orange-500 whitespace-nowrap">
            🍽 Recipe Finder
          </h1>

          {/* LINKS */}
          <div className="flex flex-wrap gap-4 sm:gap-6 text-sm md:text-base">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-orange-500 transition ${
                  isActive ? "text-orange-500 font-semibold" : "text-gray-700"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                `hover:text-orange-500 transition ${
                  isActive ? "text-orange-500 font-semibold" : "text-gray-700"
                }`
              }
            >
              Favorites
            </NavLink>

            <NavLink
              to="/shopping-list"
              className={({ isActive }) =>
                `hover:text-orange-500 transition ${
                  isActive ? "text-orange-500 font-semibold" : "text-gray-700"
                }`
              }
            >
              Shopping
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-orange-500 transition ${
                  isActive ? "text-orange-500 font-semibold" : "text-gray-700"
                }`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
