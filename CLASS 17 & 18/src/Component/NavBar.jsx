import {NavLink} from 'react-router-dom'

function NavBar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/country">Country</NavLink>
    </nav>
  );
}

export default NavBar;  