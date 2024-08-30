import '../Styles/App.css';
import '../Styles/Components.css';
import React, { useContext, useEffect, useState } from 'react';
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
import PrivateRoute from './PrivateRoute';
import { Login } from '../modules/store/views/Login';
import Unauthorized from '../modules/store/views/Unauthorized';
import { CartContext } from '../contexts/CartContext'; 

const App = () => {
  const {showCart, setShowCart } = useContext(CartContext)
  const { login } = useAuth();
  const [showLogin, setLogin] = useState(false);
  const [menu, setMenu] = useState(false);
  
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
    setShowCart(!showCart)
  };

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname.startsWith('/Login');

  return (
    <NotificacionProvider>
      <div className="App">
        {!isAdminRoute && (
          <>
            <Header loginHandler={loginHandler} menuHandler={menuHandler} cartHandler={cartHandler} />
            <div className="AppBody">
              <Notification /> 
              {showLogin && !isLoginRoute && <LoginPopUp showhandler={loginHandler} />}
              {showCart && <Cart handler={cartHandler} />}
              {menu && <PopMenu />}
            </div>
          </>
        )}
        <Notification /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Bleakestore" element={<Home />} />
          <Route path="/Listing" element={<ListingProducts />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Userpage' element={<UserPage />} />
          <Route path='/Unauthorized' element={<Unauthorized />} />
          <Route element={<PrivateRoute requiredRole="Admin" />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>
        </Routes>
      </div>
    </NotificacionProvider>
  );
};

export default App;
