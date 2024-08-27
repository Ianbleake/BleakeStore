import React, { useState } from 'react';
import usersService from '../../../Services/Firebase/Users'
import { useNotificacion } from '../../../contexts/NotificationContext';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();
  const { setNotificacion } = useNotificacion();
  const [username,setUsername] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [pass,setPass] = useState('');
  const [logmail,setLogmail] = useState('');
  const [logpass,setLogPass] = useState('');


  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === 'username'){
      setUsername(value);
    }else if(name ==='name'){
      setName(value);
    }else if(name ==='email'){
      setEmail(value);
    }else if(name ==='password'){
      setPass(value);
    }
    else if(name === 'logmail'){
      setLogmail(value);
    }else if(name === 'logpass'){
      setLogPass(value);
    }
  }

  const handleLog = (event)=>{
    event.preventDefault();
    usersService
      .checkUserExists(logmail,logpass)
        .then(response => {

          if(response === null){
            setNotificacion({
              role: 'error', 
              message: 'Usuario y/o Contraseña incorrectos',
              show: true,
            });

             setTimeout(() => {
               setNotificacion((prev) => ({ ...prev, show: false }));
             }, 3000);
          }else{
            setNotificacion({
              role: 'success', 
              message: `Inicio de sesion exitoso, Gusto en verte ${response.username}`,
              show: true,
            });
            setTimeout(() => {
              setNotificacion((prev) => ({ ...prev, show: false }));
            }, 5000);
            const userData = { username: response.username, token: response.id, role: response.type };
            login(userData);
            navigate('/userpage');
          }
          
          setLogmail('');
          setLogPass('');
        })
  }

  const handleSubmint = (event)=>{
    event.preventDefault();
    const userObjet = {
      username: username,
      name: name,
      email: email,
      password: pass,
      address: {
        street: '',
        number: '',
        zip: '',
        city: ''
      },
      phone: '',
      type: 'Customer'
    }
    
    usersService
      .create(userObjet)
        .then(response => {
          setNotificacion({
            role: 'success', 
            message: `Registro exitoso, Bienvenido ${response.username}`,
            show: true,
          });
           setTimeout(() => {
             setNotificacion((prev) => ({ ...prev, show: false }));
           }, 5000);

          setUsername('');
          setName('');
          setEmail('');
          setPass('');
          const userData = { username: response.username, token: response.id, role: response.type };
          login(userData);
          navigate('/userpage');
        })
        .catch(error => {
          setNotificacion({
            role: 'error', 
            message: `Error en el registro: ${error}`,
            show: true,
          });

           setTimeout(() => {
             setNotificacion((prev) => ({ ...prev, show: false }));
           }, 3000);
        })
  }

  return (
    <section className='login' >
      <form className='form log' onSubmit={handleLog}>
        <h2 className='title'>Iniciar Sesion</h2>
        <input className='inpt' value={logmail} onChange={handleChange} name="logmail" placeholder="Email" type="email" required />
        <input className='inpt' value={logpass} onChange={handleChange} name="logpass" placeholder="Password" type="password" required />
        <input type="submit" className='btn log' value="Entrar!" />
      </form>

      <form className='form log' onSubmit={handleSubmint}>
        <h2 className='title'>Registrarme</h2>
        <input className='inpt' value={username} onChange={handleChange} name='username'  placeholder="Username" type="text" required />
        <input className='inpt' value={name} onChange={handleChange} name='name'  placeholder="Name" type="text" required  />
        <input className='inpt' value={email} onChange={handleChange} name="email" placeholder="Email" type="email" required />
        <input className='inpt' value={pass} onChange={handleChange} name="password" placeholder="Password" type="password" required />
        <input type="submit" className=' btn log' value="Registrarme" />
      </form>
    </section>
  )
}
