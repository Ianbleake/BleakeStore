import '../Styles/App.css';
import '../Styles/Components.css';
import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ListingProducts from '../modules/store/views/ListingProducts';
import Header from '../modules/store/components/Header';
import Home from '../modules/store/views/Home';
import Cart from '../modules/store/views/Cart';
import PopMenu from '../modules/store/views/PopMenu';
import LoginPopUp from '../modules/store/views/LoginPopUp';
import Dashboard from '../modules/admin/Dashboard';
import { NotificacionProvider } from '../modules/store/contexts/NotificationContext'; 
import Notification from '../modules/store/components/Notification';

const App = () => {
  const [login, setLogin] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cart, setCart] = useState(false);

  const location = useLocation();

  const loginHandler = () => {
    setLogin(!login);
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
            {login ? <LoginPopUp showhandler={loginHandler} /> : ''}
            {cart ? <Cart handler={cartHandler} /> : ''}
            {menu ? <PopMenu /> : ''}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Bleakestore" element={<Home />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/Listing" element={<ListingProducts />} />
            </Routes>
          </div>
        ) : (
          <div>
            <Notification /> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/Listing" element={<ListingProducts />} />
            </Routes>
          </div>
        )}
      </div>
    </NotificacionProvider>
  );
};

export default App;
