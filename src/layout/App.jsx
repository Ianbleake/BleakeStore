import '../Styles/App.css';
import '../Styles/Components.css'
import ListingProducts from '../views/ListingProducts';
import { Route, Routes } from 'react-router-dom';
import Header from '../components/header'
import Home from '../views/Home';


function App() {

  return (
    <div className="App">
      <Header/>
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
