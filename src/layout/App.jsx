import '../Styles/App.css';
import '../Styles/Components.css'
import React, { useState} from 'react';
import ListingProducts from '../views/ListingProducts';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/Header'
import Home from '../views/Home';
import Cart from '../views/Cart'
import Menu from '../views/Menu.jsx';
import LoginPopUp from '../views/LoginPopUp';


const App = () => {

  const [login,setLogin] = useState(false);
  const [menu,setMenu] = useState(false);
  const [cart,setCart] = useState(false);

  const loginHandler = ()=>{
    setLogin(!login)
  }

  const menuHandler = () => {
    setMenu(!menu)
  }

  const cartHandler = () => {
    setCart(!cart)
  }

  return (
    <div className="App">
      <Header loginHandler={loginHandler} menuHandler={menuHandler} cartHandler={cartHandler} />
      { login ? <LoginPopUp/> : ''}
      { menu ? <Menu/> : '' }
      { cart ? <Cart/> : '' }
      <div className='AppBody' >
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Listing' element={<ListingProducts/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
