import React, { useState } from 'react';
import usersService from '../../../Services/Firebase/Users'
import Notification from '../components/Notification';

const LoginPopUp = ({showhandler}) => {

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
             
          }else{
            
            console.log('User loged',response)
          }
          setLogmail('');
          setLogPass('');
          //showhandler();
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
      phone: ''
    }
    
    usersService
      .create(userObjet)
        .then(response => {
          console.log('New User:',response)
          setUsername('');
          setName('');
          setEmail('');
          setPass('');
        })
  }

  return (
  <div className="wrapper">
    <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          <div className="flip-card__inner">
              <div className="flip-card__front">
                  <div className="title">Log in</div>
                  <form className="flip-card__form" onSubmit={handleLog} >
                    <input className="flip-card__input" value={logmail} onChange={handleChange} name="logmail" placeholder="Email" type="email" />
                    <input className="flip-card__input" value={logpass} onChange={handleChange} name="logpass" placeholder="Password" type="password" />
                    <button className="flip-card__btn">Let`s go!</button>
                  </form>
              </div>
              <div className="flip-card__back">
                  <div className="title">Sign up</div>
                  <form className="flip-card__form" onSubmit={handleSubmint}>
                    <input className="flip-card__input" value={username} onChange={handleChange} name='username'  placeholder="Username" type="text" />
                    <input className="flip-card__input" value={name} onChange={handleChange} name='name'  placeholder="Name" type="text" />
                    <input className="flip-card__input" value={email} onChange={handleChange} name="email" placeholder="Email" type="email" />
                    <input className="flip-card__input" value={pass} onChange={handleChange} name="password" placeholder="Password" type="password" />
                    <button className="flip-card__btn">Confirm!</button>
                  </form>
              </div>
          </div>
        </label>
    </div>   
  </div>
  )
}

export default LoginPopUp