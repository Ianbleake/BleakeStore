import React from 'react'

const Notification = ({role,message }) => {
  return (
    <div className={`notification ${role}`}>{message}</div>
  )
}

export default Notification