import React, { useState, useEffect } from 'react';
import API from '../../api';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    API.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to fetch orders:', err));

    API.get('/api/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error('Failed to fetch customers:', err));
  }, []);

  const filteredOrders = orders.filter(order => {
    const customer = customers.find(c => c._id === order.customerId);
    const name = customer?.name.toLowerCase() || '';
    const email = customer?.email.toLowerCase() || '';

    const filterMatch = filter ? order.customerId === filter : true;

    const searchMatch = searchTerm
      ? name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase())
      : true;

    return filterMatch && searchMatch;
  });

  return (
    <>
      <div className="container">
        <h2 className="title">📦 Orders List</h2>

        <div className="filter-container">
          <select
            className="select-input"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">All Customers</option>
            {customers.map(c => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by name or email"
            className="text-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <ul className="orders-list">
          {filteredOrders.length === 0 ? (
            <li className="no-orders">No orders found.</li>
          ) : (
            filteredOrders.map((o, i) => {
              const customer = customers.find(c => c._id === o.customerId);
              return (
                <li key={i} className="order-item">
                  <strong className="customer-name">
                    {customer?.name || 'Unknown'}
                  </strong>{' '}
                  <span className="customer-email">({customer?.email || 'No email'})</span>
                  <div className="order-details">
                    Amount: ₹{o.amount} <br />
                    Date: {o.orderDate ? o.orderDate.slice(0, 10) : 'N/A'}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>

      <style>{`
        .container {
          max-width: 700px;
          margin: 40px auto;
          padding: 25px 30px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f9fafb; /* very light gray */
          border-radius: 14px;
          box-shadow: 0 8px 20px rgba(30, 41, 59, 0.1); /* subtle shadow */
        }
        .title {
          text-align: center;
          margin-bottom: 30px;
          font-weight: 700;
          font-size: 30px;
          color: #1e293b; /* dark slate */
          letter-spacing: 0.05em;
        }
        .filter-container {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
        .select-input {
          flex: 0 0 280px;
          padding: 10px 14px;
          font-size: 16px;
          border-radius: 8px;
          border: 1.8px solid #94a3b8;
          background-color: #ffffff;
          color: #334155; 
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .select-input:focus {
          outline: none;
          border-color: #3b82f6; 
          box-shadow: 0 0 6px #3b82f6aa;
        }
        .text-input {
          flex: 1;
          padding: 10px 14px;
          font-size: 16px;
          border-radius: 8px;
          border: 1.8px solid #94a3b8;
          background-color: #fff;
          color: #334155;
          transition: border-color 0.3s, box-shadow 0.3s;
          min-width: 200px;
        }
        .text-input::placeholder {
          color: #64748b; 
          font-style: italic;
        }
        .text-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 6px #3b82f6aa;
        }
        .orders-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .no-orders {
          padding: 15px;
          color: #64748b;
          text-align: center;
          font-style: italic;
          font-size: 16px;
        }
        .order-item {
          background-color: #ffffff;
          padding: 20px 24px;
          margin-bottom: 18px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.1);
          transition: box-shadow 0.3s, border-color 0.3s;
          cursor: default;
        }
        .order-item:hover {
          box-shadow: 0 8px 28px rgba(59, 130, 246, 0.3);
          border-color: #3b82f6;
        }
        .customer-name {
          font-size: 19px;
          color: #1e293b;
          font-weight: 600;
        }
        .customer-email {
          color: #64748b;
          font-size: 15px;
          font-weight: 500;
        }
        .order-details {
          margin-top: 8px;
          font-size: 17px;
          color: #475569;
          line-height: 1.4;
          font-weight: 500;
        }
        @media (max-width: 600px) {
          .filter-container {
            flex-direction: column;
            gap: 15px;
          }
          .select-input {
            flex: 1 1 100%;
            min-width: auto;
          }
          .text-input {
            flex: 1 1 100%;
            min-width: auto;
          }
        }
      `}</style>
    </>
  );
}

export default OrderList;
