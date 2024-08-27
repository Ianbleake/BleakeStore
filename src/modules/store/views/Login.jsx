import React from 'react'

const Login = () => {
  return (
    <div className='page login' >
      <form>
        <h1>Iniciar Sesion</h1>
        <input className='' type="text" />
        <input className='' type="text" />
        <input className='' type="submit" value="Ingresar" />
      </form>

      <form>
        <h1>Registrarme</h1>
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type="text" />
        <input type='submit' value='Registrar' />
      </form>
    </div>
  )
}

export default Login