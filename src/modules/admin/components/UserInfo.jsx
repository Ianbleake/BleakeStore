import React, { useState, useEffect } from 'react';
import userService from '../../../Services/Firebase/Users';
import Loader from './Loader';
import Buton from './Buton';

const UserInfo = ({ user, showhandler }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getById(user).then((res) => {
      setInfo(res);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className='window userinfo'>
      <div className='close' onClick={showhandler}>X</div>
      <h2 className='title'>Usuario: {info.username}</h2>
      <div className='infoTable'>
        <div className='pinfo'>
          <div className='infotitle' >Nombre: <span className='info' >{info.name}</span></div>
          <div className='infotitle' >Correo: <span className='info'>{info.email}</span></div>
          <div className='infotitle' >Teléfono: <span className='info'>{info.phone}</span></div>
        </div>
        <div className='adinfo'>
          <div className='infotitle'>Dirección:</div>
          {info.address ? (
            <div className='info'>{info.address.street} {info.address.number} {info.address.zip} {info.address.city}</div>
          ) : (
            <div>No disponible</div>
          )}
        </div>
      </div>
      <div className='cta'>
          <Buton label={'Editar'} />
      </div>
    </div>
  );
};

export default UserInfo;
