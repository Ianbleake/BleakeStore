import '../Styles/App.css';
import '../Styles/Components.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ListingProducts from '../modules/store/views/ListingProducts';
import Header from '../modules/store/components/Header';
import Home from '../modules/store/views/Home';
import Cart from '../modules/store/views/Cart';
import PopMenu from '../modules/store/views/PopMenu';
import LoginPopUp from '../modules/store/views/LoginPopUp';
import Dashboard from '../modules/admin/Dashboard';
import { NotificacionProvider } from '../contexts/NotificationContext'; 
import Notification from '../modules/store/components/Notification';
import { useAuth } from '../contexts/AuthContext';
import UserPage from '../modules/store/views/UserPage';


const App = () => {

  const { login } = useAuth();
  const [showLogin, setLogin] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        login(userData);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
        localStorage.removeItem('user');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const loginHandler = () => {
    setLogin(!showLogin);
  };

  const menuHandler = () => {
    setMenu(!menu);
  };

  const cartHandler = () => {
    setCart(!cart);
  };

  return (
    <NotificacionProvider>
      <div className="App">
        {location.pathname !== '/admin' && (
          <Header loginHandler={loginHandler} menuHandler={menuHandler} cartHandler={cartHandler} />
        )}
        {location.pathname !== '/admin' ? (
          <div className="AppBody">
            <Notification /> 
            {showLogin ? <LoginPopUp showhandler={loginHandler} /> : ''}
            {cart ? <Cart handler={cartHandler} /> : ''}
            {menu ? <PopMenu /> : ''}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Bleakestore" element={<Home />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/Listing" element={<ListingProducts />} />
              <Route path='/Userpage' element={<UserPage/>} />
            </Routes>
          </div>
        ) : (
          <div>
            <Notification /> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Dashboard />} />
            </Routes>
          </div>
        )}
      </div>
    </NotificacionProvider>
  );
};


export default App;
