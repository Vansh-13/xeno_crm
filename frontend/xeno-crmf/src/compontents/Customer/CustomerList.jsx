import React, { useState, useEffect } from 'react';
import API from '../../api';

function CustomerL() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    API.get('/api/customers')
      .then((res) => setCustomers(res.data))
      .catch((err) => {
        console.error("Error fetching customers:", err);
        alert("Failed to load customers");
      });
  }, []);

  return (
    <>
      <div className="customer-container">
        <h2 className="customer-title">📋 Customer List</h2>

        {customers.length === 0 ? (
          <p className="no-customers">No customers found.</p>
        ) : (
          <div className="customer-cards">
            {customers.map((c, i) => (
              <div key={i} className="customer-card">
                <h4>👤 {c.name}</h4>
                <p>📧 {c.email}</p>
                <p>💰 Total Spend: ₹{c.totalSpend}</p>
                <p>🔁 Visits: {c.visits}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .customer-container {
          max-width: 800px;
          margin: 20px auto;
          padding: 15px;
          font-family: sans-serif;
        }

        .customer-title {
          text-align: center;
          margin-bottom: 20px;
          font-size: 22px;
        }

        .no-customers {
          text-align: center;
          color: #777;
        }

        .customer-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }

        .customer-card {
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 12px;
          width: 240px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .customer-card h4 {
          margin: 6px 0;
          color: #2c3e50;
        }

        .customer-card p {
          margin: 4px 0;
          font-size: 14px;
          color: #444;
        }

        @media (max-width: 600px) {
          .customer-card {
            width: 90%;
          }

          .customer-title {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
}

export default CustomerL;
