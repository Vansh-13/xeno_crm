import React, { useState, useEffect } from 'react';
import API from '../../api';
import { toast } from "react-toastify";
function OrderForm() {
  const [order, setOrder] = useState({
    customerId: '',
    amount: 0,
    orderDate: ''
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await API.get('/api/customers');
        setCustomers(res.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        toast.error('Failed to load customers');
      }
    };
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/orders', order);
      toast.success('Order Created');
      setOrder({ customerId: '', amount: 0, orderDate: '' });
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
      toast.error('Failed to create order');
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <h3 className="form-title">📦 Create Order</h3>
        <form onSubmit={handleSubmit} className="form-box">
          <select
            name="customerId"
            value={order.customerId}
            onChange={handleChange}
            required
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={order.amount}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="orderDate"
            value={order.orderDate}
            onChange={handleChange}
            required
          />

          <button type="submit">Create Order</button>
        </form>
      </div>

  
      <style>{`
        .form-wrapper {
          max-width: 450px;
          margin: 30px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #f7f7f7;
          font-family: sans-serif;
        }

        .form-title {
          text-align: center;
          margin-bottom: 15px;
          font-size: 20px;
        }

        .form-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-box input,
        .form-box select {
          padding: 8px;
          font-size: 14px;
          border: 1px solid #bbb;
          border-radius: 4px;
        }

        .form-box button {
          padding: 10px;
          font-size: 15px;
          background-color: #3498db;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .form-box button:hover {
          background-color: #2980b9;
        }

        @media (max-width: 500px) {
          .form-wrapper {
            margin: 20px 10px;
            padding: 15px;
          }

          .form-box input,
          .form-box select {
            font-size: 13px;
            padding: 7px;
          }

          .form-box button {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

export default OrderForm;
