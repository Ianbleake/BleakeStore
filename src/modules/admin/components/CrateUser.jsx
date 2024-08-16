import React, { useState } from 'react'
import usersService from '../../../Services/Firebase/Users'

const CrateUser = ({handler,state,showHandler}) => {

  const [userData,setUserData] = useState('')
  const [nameData,setNameData] = useState('');
  const [emailData,setEmailData] = useState('');
  const [passData,setPassData] = useState('');

  const handleChange = (event) =>{
    const { name, value } = event.target;
    if(name === 'username'){
      setUserData(value)
    }else if(name === 'nombre'){
      setNameData(value)
    } else if(name === 'correo'){
        setEmailData(value)
    } else if(name === 'pass'){
        setPassData(value)
    }
  };

  const handleSubmit = (event) =>{
    event.preventDefault();
    const userObjet = {
      user: userData,
      name: nameData,
      email: emailData,
      password: passData
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
    <form className='form' onSubmit={handleSubmit} >
      <h2 className='headertitle' >CREAR Usuario</h2>
      <div className='inputs'>
        <input className='inpt' value={userData} name='username' type="text" placeholder='Nombre de Usuario' onChange={handleChange} required />
        <input className='inpt' value={nameData} name='nombre' type="text" placeholder='Nombre' onChange={handleChange} required />
        <input className='inpt' value={emailData} name='correo' type="text" placeholder='Correo' onChange={handleChange} required />
        <input className='inpt' value={passData} name='pass' type="text" placeholder='Password' onChange={handleChange} required />
        <input type="submit" className='subtn' value="CREAR"/>
      </div>
    </form>
  )
}

export default CrateUser