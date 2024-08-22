import React, { useState } from 'react'
import usersService from '../../../Services/Firebase/Users'

const CrateUser = ({handler,state,showHandler}) => {

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
    }else if(name === 'nombre'){
      setNameData(value);
    } else if(name === 'correo'){
        setEmailData(value);
    } else if(name === 'pass'){
        setPassData(value);
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
    }else if(name === 'type'){
      setTypeData(value);
      console.log('Type',value);
    }
    
  };

  const handleSubmit = (event) =>{
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
    }

    usersService
      .create(userObjet)
        .then(returnedUSer => {
          handler(state.concat(returnedUSer));
          setUserData('');
          setNameData('');
          setEmailData('');
          setPassData('');
          showHandler();
        })
  }

  return (
    <form className='form user' onSubmit={handleSubmit} >
      <button className='close' onClick={showHandler} >X</button>
      <h2 className='headertitle' >CREAR Usuario</h2>
      <div className='inputs'>
        <input className='inpt' value={userData} name='username' type="text" placeholder='Nombre de Usuario' onChange={handleChange} required />
        <input className='inpt' value={nameData} name='nombre' type="text" placeholder='Nombre' onChange={handleChange} required />
        <input className='inpt' value={emailData} name='correo' type="email" placeholder='Correo' onChange={handleChange} required />
        <input className='inpt' value={passData} name='pass' type="password" placeholder='Password' onChange={handleChange} required />
        <input className='inpt' value={streetData} name='street' type='text' placeholder='Calle:' onChange={handleChange} required />
        <input className='inpt' value={numberData} name='number' type='text' placeholder='numero:' onChange={handleChange} required />
        <input className='inpt' value={zipData} name='zip' type='text' placeholder='Zip:' onChange={handleChange} required />
        <input className='inpt' value={cityData} name='city' type='text' placeholder='Ciudad:' onChange={handleChange} required />
        <input className='inpt' value={phoneData} name='phone' type='text' placeholder='Telefono' onChange={handleChange} required />
        <select className='inpt' name="type" onChange={handleChange}>
          <option value="" selected >Seleccionar</option>
          <option value="Admin">Empleado</option>
          <option value="Customer">Cliente</option>
        </select>
        <input type="submit" className='subtn' value="CREAR"/>
      </div>
    </form>
  )
}

export default CrateUser