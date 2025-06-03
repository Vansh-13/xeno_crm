import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  return (
    <>
      <div className="dashboard-container">
        <h2>Welcome, {user?.name || 'User'} 👋</h2>
        <p className="subtitle">You’re logged in. Use the navigation bar above to access CRM features.</p>

        <div className="quick-actions">
          <Link to="/create-campaign" className="action-btn">➕ New Campaign</Link>
          <Link to="/create-order" className="action-btn">🛒 New Order</Link>
        </div>
      </div>

      <style>{`
        .dashboard-container {
          max-width: 600px;
          margin: 60px auto;
          padding: 25px;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          background: #fff;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        h2 {
          color: #222;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #555;
          font-size: 15px;
          margin-bottom: 20px;
        }

        .quick-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .action-btn {
          background-color: #1976d2;
          color: white;
          padding: 10px 18px;
          border-radius: 7px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          transition: background-color 0.25s ease;
          min-width: 140px;
          display: inline-block;
        }

        .action-btn:hover {
          background-color: #135ba1;
        }

        @media (max-width: 480px) {
          .quick-actions {
            flex-direction: column;
            gap: 10px;
            align-items: center;
          }

          .action-btn {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </>
  );
};

export default Dashboard;
