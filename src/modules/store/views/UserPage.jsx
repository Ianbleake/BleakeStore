import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import userService from '../../../Services/Firebase/Users';
import { useNotificacion } from '../../../contexts/NotificationContext';

const UserPage = () => {

  const { setNotificacion } = useNotificacion();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userInfo,setInfo] = useState(null)

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

  useEffect(() => {
    userService.getById(user.token)
      .then((response) => {
        setInfo(response)
        console.log('Info',response)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  if(!userInfo){
    return <Loader/>;
  }

  return (
    <div className='page user'>
      <h1 className='title user'>Bienvenido {user?.username}</h1>
      <section className='userinfo'>
        <div className='personalinfo'>
          <h2>Información de usuario</h2>
          <div className='infotitle'>Nombre:<span className='infoo'>{userInfo.name}</span></div>
          <div className='infotitle'>Correo:<span className='infoo'>{userInfo.email}</span></div>
          <div className='infotitle'>Telefono:<span className='infoo'>{userInfo.phone}</span></div>
          <div className='infotitle'>Direccion:<span className='infoo'>{userInfo.address.street} {userInfo.address.number} {userInfo.address.zip} {userInfo.address.city}</span></div>
          <button className='btn editinfo'>Editar información</button>
        </div>
        <div className='shipments' >
          <h2>Pedidos</h2>
          <table>

          </table>
        </div>
      </section>
      <div className='center'>
        <button className='btn' onClick={handleLogout}>Cerrar sesión</button>
      </div>
      
    </div>
  );
}

export default UserPage;
