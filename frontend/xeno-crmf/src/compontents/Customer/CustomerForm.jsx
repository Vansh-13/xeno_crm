import React, { useState } from 'react';
import API from '../../api';
import { toast } from "react-toastify";
function CustomerForm() {
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    totalSpend: 0,
    visits: 0,
    lastVisit: '',
    lastActive: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/customers', customer);
      toast.success('Customer Added!');
      setCustomer({
        name: '',
        email: '',
        phone: '',
        totalSpend: 0,
        visits: 0,
        lastVisit: '',
        lastActive: '',
      });
    } catch (error) {
      toast.error(' Error adding customer.');
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>➕ Add Customer</h3>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="👤 Name"
          value={customer.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="email"
          placeholder="📧 Email"
          value={customer.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="phone"
          placeholder="📱 Phone"
          value={customer.phone}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="totalSpend"
          placeholder="💰 Total Spend"
          value={customer.totalSpend}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="visits"
          placeholder="🔁 Visits"
          value={customer.visits}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="lastVisit"
          value={customer.lastVisit}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="lastActive"
          value={customer.lastActive}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>✅ Submit</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: '90%',
    maxWidth: '500px',
    margin: '30px auto',
    padding: '25px',
    background: '#fdfdfd',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #bbb',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border 0.2s ease',
  },
  button: {
    padding: '10px',
    fontSize: '15px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

const styleTag = document.createElement('style');
styleTag.innerHTML = `
  @media (max-width: 480px) {
    input, button {
      font-size: 13px !important;
      padding: 8px !important;
    }
    h3 {
      font-size: 18px !important;
    }
  }
`;
document.head.appendChild(styleTag);

export default CustomerForm;
