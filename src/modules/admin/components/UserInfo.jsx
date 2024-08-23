import React, { useState, useEffect } from 'react';
import userService from '../../../Services/Firebase/Users';
import Loader from './Loader';
import Buton from './Buton';
import { useNotificacion } from '../../store/contexts/NotificationContext';

const UserInfo = ({ user, showhandler,handler, state }) => {

  const { setNotificacion } = useNotificacion();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [edit,setEdit] = useState(true);
  const [userData,setUserData] = useState('')
  const [nameData,setNameData] = useState('');
  const [emailData,setEmailData] = useState('');
  const [passData,setPassData] = useState('');
  const [streetData,setStreetData] = useState('');
  const [numberData,setNumberData] = useState('');
  const [zipData,setZipData] = useState('');
  const [cityData,setCityData] = useState('');
  const [phoneData,setPhoneData] = useState('');
  const [typeData,setTypeData] = useState('');

  const handleChange = (event) =>{
    const { name, value } = event.target;
    if(name === 'username'){
      setUserData(value);
    }else if(name === 'name'){
      setNameData(value);
    } else if(name === 'email'){
        setEmailData(value);
    } else if(name === 'pass'){
        setPassData(value);
    } else if(name === 'street'){
      setStreetData(value);
    }  else if(name === 'number'){
      setNumberData(value);
    } else if(name === 'zip'){
      setZipData(value);
    } else if(name === 'city'){
      setCityData(value);
    } else if(name === 'phone'){
      setPhoneData(value);
    } else if(name === 'type'){
      setTypeData(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObjet = {
      username: userData,
      name: nameData,
      email: emailData,
      password: passData,
      address: {
        street: streetData,
        number: numberData,
        zip: zipData,
        city: cityData
      },
      phone: phoneData,
      type: typeData
    };
  
    userService.update(user, userObjet).then(returnedUser => {
      const updatedUsers = state.map(u => 
        u.id === user ? returnedUser : u
      ); 
      handler(updatedUsers);
      showhandler();
      setNotificacion({
        role: 'success', 
        message: `Usuario ${info.username} Actualizado exitosamente`,
        show: true,
      });
      setTimeout(() => {
        setNotificacion((prev) => ({ ...prev, show: false }));
      }, 3000);
    });
  };
  

  const editHandler = ()=>{
    setEdit(!edit);
  }

  useEffect(() => {
    userService.getById(user).then((res) => {
      setInfo(res);
      setUserData(res.username)
      setNameData(res.name);
      setEmailData(res.email);
      setPhoneData(res.phone);
      setPassData(res.password);
      setStreetData(res.address.street);
      setNumberData(res.address.number);
      setZipData(res.address.zip);
      setCityData(res.address.city);
      setTypeData(res.type);
      setLoading(false);
    }
    );
  }, [user]);

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      {
        edit ? 
        <div className='window userinfo'>
          <div className='close' onClick={showhandler}>X</div>
          <h2 className='title'>Usuario: {info.username}</h2>
          <div className='infoTable'>
            <div className='pinfo'>
              <div className='infotitle' >Nombre: <span className='infoo' >{info.name}</span></div>
              <div className='infotitle' >Correo: <span className='infoo'>{info.email}</span></div>
              <div className='infotitle' >Teléfono: <span className='infoo'>{info.phone}</span></div>
            </div>
            <div className='adinfo'>
              <div className='infotitle'>Dirección:</div>
              {info.address ? (
                <div className='infoo'>{info.address.street} {info.address.number} {info.address.zip} {info.address.city}</div>
              ) : (
                <div>No disponible</div>
              )}
              <div className='infotitle'>Tipo de Usuario:<span className='infoo' >{info.type}</span></div>
            </div>
          </div>
          <div className='cta'>
              <Buton label={'Editar'} handler={editHandler} />
          </div>
        </div> :
        <form className='window userinfo' onSubmit={handleSubmit}>
          <div className='close' onClick={showhandler}>X</div>
          <div className='title'>Usuario:<input value={userData} className='inpt' name='username' onChange={handleChange} placeholder={info.username} type="text" /></div>
          <div className='infoTable edit'>
            <div className='pinfo'>
              <div className='infotitle' >Nombre: <input value={nameData} name='name' className='inpt' onChange={handleChange} placeholder={info.name} type="text" /> </div>
              <div className='infotitle' >Correo: <input value={emailData} name='email' className='inpt' onChange={handleChange} placeholder={info.email} type="text" /> </div>
              <div className='infotitle' >Teléfono: <input value={phoneData} name='phone' className='inpt' onChange={handleChange} placeholder={info.phone} type="text" /> </div>
              <div className='infotitle' >Contraseña: <input value={passData} name='pass' className='inpt' onChange={handleChange} placeholder={info.password} type="text" /> </div>
            </div>
            <div className='adinfo'>
              <div className='infotitle'>Dirección:</div>
              {info.address ? (
                <div className='infoo'>
                  <input value={streetData} className='inpt' name='street' onChange={handleChange} placeholder={info.address.street} type="text" />
                  <input value={numberData} className='inpt' name='number' onChange={handleChange} placeholder={info.address.number} type="text" />
                  <input value={zipData} className='inpt' name='zip' onChange={handleChange} placeholder={info.address.zip} type="text" />
                  <input value={cityData} className='inpt' name='city' onChange={handleChange} placeholder={info.address.city} type="text" />
                  <div className='infotitle'>Tipo de Usuario: </div>
                  <select className='inpt' name="type" value={info.type} onChange={handleChange}>
                    <option value="Admin">Empleado</option>
                    <option value="Customer">Cliente</option>
                  </select>
                </div>
              ) : (
                <div>No disponible</div>
              )}
            </div>
          </div>
          <div className='cta'>
            <input className="adminbtn"  type="submit" value="Actualizar" />
          </div>
        </form>
      }
    </>
  );
};

export default UserInfo;
