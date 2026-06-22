import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">🍲 RecipeFinder</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/shopping-list">Shopping List</Link>
      </div>
    </nav>
  );
}