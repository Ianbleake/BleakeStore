import React, { useEffect, useState } from 'react'
import userService from '../../../Services/Firebase/Users';
import ProductServices from '../../../Services/Firebase/Stock';
import checkoutServices from '../../../Services/Firebase/checkout';
import { useNotificacion } from '../../../contexts/NotificationContext';

const CreateShipment = ({ handler, state, showHandler }) => {

  const { setNotificacion } = useNotificacion();
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [direccion, setDireccion] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    userService.getAll()
      .then(response => {
        setUsers(response || []);
      });

    ProductServices.getAll()
      .then(response => {
        setProducts(response || []);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'user') {
      setUser(value);
    } else if (name === 'direccion') {
      setDireccion(value);
    }
  }

  const handleProductChange = (event) => {
    const { value } = event.target;
    if (!value) {
      return;
    }
    const selected = products.find((product) => product.id === value);
    if (selected) {
      setItems(prevItems => [...prevItems, selected]);
    }
  }
  

  console.log('Items:',items);

  const handleSubmit = (event) => {
    event.preventDefault();

    const now = new Date();
    const fecha = now.toDateString();
    const username = users.find(u => u.id === user)?.name;

    const pedidoObject = {
      date: fecha,
      items: items,
      owner: username,
      ownerId: user,
      shipTo: direccion
    }

    checkoutServices.create(pedidoObject)
      .then((response) => {
        setNotificacion({
          role: 'success',
          message: `Pedido Creado`,
          show: true,
        });
        setTimeout(() => {
          setNotificacion((prev) => ({ ...prev, show: false }));
        }, 3000);
        handler(state.concat(response));
        showHandler();
        setDireccion('');
        setUser('');
        setItems([]); 

      });
  }

  return (
    <form action="" className='form' onSubmit={handleSubmit} >
      <button className='close' onClick={showHandler} >X</button>
      <h2 className='headertitle'>CREAR PEDIDO</h2>
      <div className='inputs'>
        <select className='inpt' name="user" onChange={handleChange} value={user} >
          <option defaultValue={''} >Usuarios</option>
          {
            users.length > 0 ? (
              users.map((user, index) => (
                <option value={user.id} key={index}>{user.name}</option>
              ))
            ) : (
              <option value="" disabled>Cargando usuarios...</option>
            )
          }
        </select>
        <input className='inpt' placeholder='Direccion de envio' type="text" name='direccion' onChange={handleChange} value={direccion} />
        
        
        <select className='inpt' name="products" onChange={handleProductChange}>
          <option defaultValue={null}>Productos</option>
          {
            products.length > 0 ? (
              products.map((product, index) => (
                <option value={product.id} key={index}>{product.title}</option>
              ))
            ) : (
              <option value="" disabled>Cargando productos...</option>
            )
          }
        </select>
        <ul className='prodsel' >
          {
            items.map((item, index) => {return(<li className='prod' >{index+1}.-{item.title}</li>)})
          }
        </ul>
        <input type="submit" className='subtn' value="CREAR" />
      </div>
    </form>
  )
}

export default CreateShipment;
