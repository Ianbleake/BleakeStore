import React, { useState, useEffect } from 'react';
import usersService from '../../../Services/Firebase/Users'
import Buton from '../components/Buton';

const Customers = () => {

  const [users,setUsers] = useState([])
  const [createForm, setCreateForm] = useState(false);

  const showCreate = ()=>{
    setCreateForm(!createForm)
  }

  useEffect(()=>{
    usersService
      .getAll()
        .then(allUsers => {
          setUsers(allUsers)
        })
  })
  return (
    <div className='adminpage' >
      <div className='Table'>

        <div className='row head' >
          <div className='col head'>
            ID
          </div>
          <div className='col head'>
            Nombre
          </div>
          <div className='col head'>
            Email
          </div>
          <div className='col head'>
            Password
          </div>
          <div className='col head'>
          </div>
          <div className='col head'></div>
        </div>

        {
          users.map((user)=> {
            return(
              <div className='row ' >
                <div className='col'>
                {user.id}
                </div>
                <div className='col'>
                  {user.name}
                </div>
                <div className='col'>
                  {user.email}
                </div>
                <div className='col'>
                  {user.password}
                </div>
                <div className='col'>
                  <button className='btn modify' > Editar </button>
                </div>
                <div className='col'>
                  <button className='btn modify' > Borrar </button>
                </div>
              </div>
            )
          })
        }

      </div>
      <div className='cta' >
        <Buton label={'Crear'} handler={showCreate} />   
      </div>
  </div>
  )
}

export default Customers