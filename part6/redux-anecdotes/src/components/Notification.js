import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'block',
  }
  const visibility = {
    display: 'none'
  }
  const isVisible = notification ? style : visibility
  return (
    <div style={isVisible}>
      {notification}
    </div>
  )
}

export default Notification