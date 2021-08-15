import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'block',
  }
  const visibility = {
    display: 'none'
  }
  const isVisible = props.notification ? style : visibility
  return (
    <div style={isVisible}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const ConnectedNotif = connect(mapStateToProps)(Notification)

export default ConnectedNotif