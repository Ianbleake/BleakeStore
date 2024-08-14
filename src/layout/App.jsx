import '../Styles/App.css';
import '../Styles/Components.css'
import React, { useState } from 'react';
import ListingProducts from '../modules/store/views/ListingProducts';
import { Route, Routes } from 'react-router-dom';
import Header from '../modules/store/components/Header'
import Home from '../modules/store/views/Home';
import Cart from '../modules/store/views/Cart'
import PopMenu from '../modules/store/views/PopMenu'
import LoginPopUp from '../modules/store/views/LoginPopUp';
import Dashboard from '../modules/admin/Dashboard'

const App = () => {

  const [login,setLogin] = useState(false);
  const [menu,setMenu] = useState(false);
  const [cart,setCart] = useState(false);
  const [admin, setAdmin] = useState(true);

  const loginHandler = ()=>{
    setLogin(!login)
  }

  const menuHandler = () => {
    setMenu(!menu)
  }

  const cartHandler = () => {
    setCart(!cart)
  }

  const adminHandler = () => {
    setAdmin(!admin)
  }

  if(admin){
      return (
        <div className="App">
          <Dashboard />
          <button onClick={adminHandler} className='btn control' > { admin ? 'Store' : 'Admin' } </button>
        </div>
      ); 
  }else{
    return (
      <div className="App">
        <Header loginHandler={loginHandler} menuHandler={menuHandler} cartHandler={cartHandler} />
        <div className='AppBody' >
          { login ? <LoginPopUp/> : ''}
          { cart ? <Cart handler={cartHandler}/> : '' }
          { menu ? <PopMenu /> : '' }
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/Listing' element={<ListingProducts/>} />
          </Routes>
        </div>
        <button onClick={adminHandler} className='btn control' > { admin ? 'Store' : 'Admin' } </button>
      </div>
    );
  }

}

export default App;
