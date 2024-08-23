import React, { useState, useEffect } from 'react';
import usersService from '../../../Services/Firebase/Users';
import Buton from '../components/Buton';
import CrateUser from '../components/CrateUser';
import UserInfo from '../components/UserInfo';
import { useNotificacion } from '../../store/contexts/NotificationContext';

const Customers = () => {
  const { setNotificacion } = useNotificacion();
  const [users, setUsers] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [info,setInfo ] = useState({show: false, id: ''});


  const showCreate = () => {
    setCreateForm(!createForm);
  };

  const showInfo = (idUser) => {
    const infoObjet = { show: !info.show, id: idUser }
    setInfo(infoObjet)
  }

  useEffect(() => {
    usersService.getAll().then((allUsers) => {
      setUsers(allUsers);
    });
  }, []);

  const handleDelete = (id) => {
    usersService.remove(id).then(() => {
      setUsers(users.filter(user => user.id !== id));
      setNotificacion({
        role: 'error', 
        message: `Usuario Eliminado`,
        show: true,
      });
      setTimeout(() => {
        setNotificacion((prev) => ({ ...prev, show: false }));
      }, 3000);
    });
  };

  return (
    <div className='adminpage'>
      {createForm ? <CrateUser handler={setUsers} state={users} showHandler={showCreate} /> : ''}
      {info.show ? <UserInfo handler={setUsers} state={users} user={info.id} showhandler={showInfo} /> : ''}
      <div className='Table'>
        <div className='row head'>
          <div className='col head'>ID</div>
          <div className='col head'>Username</div>
          <div className='col head'>Nombre</div>
          <div className='col head'>Email</div>
          <div className='col head'>Password</div>
          <div className='col head'></div>
        </div>

        {users.map((user, index) => (
          <div className='row' key={index}>
            <div className='col'>{user.id}</div>
            <div className='col click' onClick={()=>showInfo(user.id)}>{user.username}</div>
            <div className='col'>{user.name}</div>
            <div className='col'>{user.email}</div>
            <div className='col'>{user.password}</div>
            <div className='col'>
              <button className='btn modify' onClick={() => handleDelete(user.id)}>Borrar</button>
            </div>
          </div>
        ))}
      </div>
      <div className='cta'>
        <Buton label={'Crear'} handler={showCreate} />
      </div>
    </div>
  );
};

export default Customers;
