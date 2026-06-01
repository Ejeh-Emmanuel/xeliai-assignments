import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <h2>🍽️ Recipe Finder</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <Link to="/">Home</Link>
        <Link to="/favourites">Favourites</Link>
        <Link to="/shopping-list">Shopping List</Link>
      </div>
    </nav>
  );
}

export default Navbar;
