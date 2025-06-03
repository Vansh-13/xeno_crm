import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">CRM Panel</div>

        <div className="menu-toggle" onClick={toggleMenu}>
          &#8942;
        </div>

        <div className={`navbar-links ${menuOpen ? 'show' : ''}`}>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/create-campaign">New Campaign</Link>
              <Link to="/campaigns">Campaigns</Link>
              <Link to="/create-customer">Add Customer</Link>
              <Link to="/customers">Customers</Link>
              <Link to="/create-order">New Order</Link>
              <Link to="/orders">Orders</Link>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/">Login</Link>
          )}
        </div>
      </nav>

      <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background-color: #2e3a59;
          color: white;
          font-family: 'Segoe UI', sans-serif;
          position: relative;
          flex-wrap: wrap;
        }

        .navbar-logo {
          font-size: 20px;
          font-weight: bold;
        }

        .menu-toggle {
          display: none;
          font-size: 26px;
          cursor: pointer;
          color: white;
        }

        .navbar-links {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .navbar-links a {
          color: white;
          text-decoration: none;
          font-size: 14px;
          padding: 6px 10px;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .navbar-links a:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .logout-btn {
          background: transparent;
          border: 1px solid #f44336;
          color: #f44336;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.3s;
        }

        .logout-btn:hover {
          background-color: #f44336;
          color: white;
        }

        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }

          .navbar-links {
            display: none;
            flex-direction: column;
            width: 100%;
            margin-top: 10px;
            gap: 10px;
            background-color: #2e3a59;
            padding: 10px 0;
          }

          .navbar-links.show {
            display: flex;
          }

          .navbar {
            align-items: flex-start;
          }

          .navbar-logo {
            font-size: 18px;
          }

          .menu-toggle {
            position: absolute;
            right: 20px;
            top: 14px;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
