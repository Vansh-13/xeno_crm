import  { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import api from "./api";  
import Navbar from './compontents/Navbar.jsx';
import Login from '../src/pages/Login.jsx';
import Dashboard from '../src/pages/Dashboard.jsx';
import CampaignForm from './compontents/Campaign/CampaignF.jsx';
import CampaignHistory from './compontents/Campaign/CampaignH.jsx';
import CustomerForm from './compontents/Customer/CustomerForm.jsx';
import CustomerList from './compontents/Customer/CustomerList.jsx';
import OrderForm from './compontents/Order/OrderForm.jsx';
import OrderList from './compontents/Order/OrderList.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  api.get('/auth/user')
    .then(res => {
      console.log("Fetched user: ", res.data); 
      setUser(res.data);
    })
    .catch(err => {
      console.log("User not logged in");
      setUser(null);
    });
}, []);

  return (
    <Router>
     <Navbar user={user} setUser={setUser} />

      <Routes>
     <Route path='/' element={user && user._id ? <Navigate to='/dashboard' /> : <Login />} />

        <Route path='/dashboard' element={<Dashboard user={user} />} />
        <Route path='/create-campaign' element={<CampaignForm user={user} />} />
        <Route path='/campaigns' element={<CampaignHistory />} />
        <Route path='/customers' element={<CustomerList />} />
        <Route path='/create-customer' element={<CustomerForm />} />
        <Route path='/orders' element={<OrderList />} />
        <Route path='/create-order' element={<OrderForm />} />
      </Routes>
    </Router>
  );
}

export default App;