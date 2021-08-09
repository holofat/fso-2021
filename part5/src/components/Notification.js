import React from 'react'
const Notification = ({message, error}) => {
  if (message === null){
    return null
  }
  const classNotification = error ? 'error' : 'success'

  return (
    <div className={classNotification}>
      <h3>{message}</h3>
    </div>
  )
}

export default Notification