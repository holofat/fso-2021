import React from 'react'

const Notification = ({message}) => {
  const style = {
    border: 'solid',
    borderWidth: 2,
    display: 'block',
    borderColor: 'red' 
  }
  const notVisible = {
    display: 'none'
  }
  const theStyle = message ? style:notVisible
  console.log(theStyle)
  return (
    <div style={theStyle}>
      {message} created
    </div>
  )
}

export default Notification