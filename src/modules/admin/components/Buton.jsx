import React from 'react'

const Buton = ({label, handler, value }) => {
  return (
    <button className="adminbtn" onClick={()=>handler(value)}>
      <div className="button-text">
        <span>{label}</span>
      </div>
    </button>
  )
}

export default Buton