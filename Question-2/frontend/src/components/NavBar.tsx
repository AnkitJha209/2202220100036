import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">StockApp</div>
      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
      <ul className="navbar-links">
        <li><Link to="/">Get Stock Info</Link></li>
        <li><Link to="/get-correlation">Get Correlation</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
