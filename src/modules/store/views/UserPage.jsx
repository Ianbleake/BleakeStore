import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import userService from '../../../Services/Firebase/Users';
import { useNotificacion } from '../../../contexts/NotificationContext';
import checkoutServices from '../../../Services/Firebase/checkout';

const UserPage = () => {

  const { setNotificacion } = useNotificacion();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setInfo] = useState(null);
  const [showEdit, setEdit] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');
  const [pedidos, setPedidos] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setNotificacion({
      role: 'error',
      message: `Nos vemos pronto ${user.username}`,
      show: true,
    });

    setTimeout(() => {
      setNotificacion((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleShowEdit = () => {
    setEdit(!showEdit);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'phone') {
      setPhone(value);
    } else if (name === 'street') {
      setStreet(value);
    } else if (name === 'number') {
      setNumber(value);
    } else if (name === 'zip') {
      setZip(value);
    } else if (name === 'city') {
      setCity(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObjet = {
      username: username,
      name: name,
      email: email,
      password: userInfo.password,
      address: {
        street: street,
        number: number,
        zip: zip,
        city: city,
      },
      phone: phone,
      type: 'Customer',
    };

    userService.update(user.token, userObjet)
      .then((response) => {
        let usersession = JSON.parse(localStorage.getItem('user'));
        if (usersession) {
          usersession.username = response.username;
          localStorage.setItem('user', JSON.stringify(usersession));
        }
        setNotificacion({
          role: 'success',
          message: 'Información Actualizada',
          show: true,
        });
        setTimeout(() => {
          setNotificacion((prev) => ({ ...prev, show: false }));
        }, 3000);
        handleShowEdit();
      })
      .catch((error) => {
        setNotificacion({
          role: 'error',
          message: `Error al actualizar el usuario: ${error}`,
          show: true,
        });
        setTimeout(() => {
          setNotificacion((prev) => ({ ...prev, show: false }));
        }, 5000);
      });
  };

  useEffect(() => {
    if (user && user.token) {
      userService.getById(user.token)
        .then((response) => {
          setInfo(response);
          setUsername(response.username);
          setName(response.name);
          setEmail(response.email);
          setPhone(response.phone);
          setStreet(response.address.street);
          setNumber(response.address.number);
          setZip(response.address.zip);
          setCity(response.address.city);

          // Obtener los pedidos del usuario
          return checkoutServices.getByUser(response.id);
        })
        .then((pedidosResponse) => {
          setPedidos(pedidosResponse);
        })
        .catch((error) => {
          console.error('Error fetching user data or orders:', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user || !userInfo) {
    return <Loader />;
  }

  return (
    <>
      {showEdit ? (
        <div className='page user'>
          <h1 className='title user'>Bienvenido {user?.username}</h1>
          <section className='userinfoo'>
            <form className='personalinfo edit' onSubmit={handleSubmit}>
              <h2 className='title' >Información de usuario</h2>
              <input className='inpt' type="text" onChange={handleChange} name='username' value={username} placeholder={userInfo.username} />
              <input className='inpt' type="text" onChange={handleChange} name='name' value={name} placeholder={userInfo.name} />
              <input className='inpt' type="text" onChange={handleChange} name='email' value={email} placeholder={userInfo.email} />
              <input className='inpt' type="text" onChange={handleChange} name='phone' value={phone} placeholder={userInfo.phone} />
              <input className='inpt' type="text" onChange={handleChange} name='street' value={street} placeholder={userInfo.address.street} />
              <input className='inpt' type="text" onChange={handleChange} name='number' value={number} placeholder={userInfo.address.number} />
              <input className='inpt' type="text" onChange={handleChange} name='zip' value={zip} placeholder={userInfo.address.zip} />
              <input className='inpt' type="text" onChange={handleChange} name='city' value={city} placeholder={userInfo.address.city} />
              <input type="submit" className='subtn' value="Actualizar" />
            </form>

            <div className='shipments'>
              <div className='Table'>
                <div className='row head'>
                  <div className='col head'>
                    ID
                  </div>
                  <div className='col head'>
                    Items
                  </div>
                  <div className='col head'>
                    Direccion
                  </div>
                  <div className='col head'>
                    Fecha
                  </div>
                </div>
                {pedidos && pedidos.length > 0 ? (
                  pedidos.map((pedido) => (
                    <div className='row' key={pedido.id}>
                      <div className='col'>{pedido.id}</div>
                      <div className='col'>{(pedido.items || []).map(item => item.title).join(', ')}</div>
                      <div className='col'>{pedido.shipTo}</div>
                      <div className='col'>{pedido.date}</div>
                    </div>
                  ))
                ) : (
                  <div className='row'>
                    <div className='col' colSpan="3">No tienes pedidos</div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div className='ctas center'>
            <button className='btn' onClick={handleLogout}>Cerrar sesión</button>
            {user.role === 'Admin' ? <Link to={'/admin'}><button className='btn'>Admin</button></Link> : null}
          </div>
        </div>
      ) : (
        <div className='page user'>
          <h1 className='title user'>Bienvenido {username}</h1>
          <section className='userinfoo'>
            <div className='personalinfo'>
              <h2>Información de usuario</h2>
              <div className='infotitle'>Nombre:<span className='infoo'>{name}</span></div>
              <div className='infotitle'>Correo:<span className='infoo'>{email}</span></div>
              <div className='infotitle'>Teléfono:<span className='infoo'>{phone}</span></div>
              <div className='infotitle'>Dirección:<span className='infoo'>{street} {number} {zip} {city}</span></div>
              <button className='btn editinfo' onClick={handleShowEdit}>Editar información</button>
            </div>

            <div className='shipments'>
              <div className='Table ord'>
                <div className='row head ord'>
                  <div className='col head '>
                    ID
                  </div>
                  <div className='col head'>
                    Items
                  </div>
                  <div className='col head'>
                    Fecha
                  </div>
                </div>
                {pedidos && pedidos.length > 0 ? (
                  pedidos.map((pedido) => (
                    <div className='row' key={pedido.id}>
                      <div className='col click'>{pedido.id}</div>
                      <div className='col'>{pedido.items.length}</div>
                      <div className='col'>{pedido.date}</div>
                    </div>
                  ))
                ) : (
                  <div className='row'>
                    <div className='col' colSpan="3">No tienes pedidos</div>
                  </div>
                )}
              </div>
            </div>
          </section>
          <div className='ctas center'>
            <button className='btn' onClick={handleLogout}>Cerrar sesión</button>
            {user.role === 'Admin' ? <Link to={'/admin'}><button className='btn'>Admin</button></Link> : null}
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
