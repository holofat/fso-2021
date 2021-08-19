import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {
  if(!props.notification){
    return null
  } else{
    const classNotification = props.notification.error ? 'error' : 'success'
    return (
      <div className={classNotification}>
        <h3>{props.notification.message}</h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    notification: state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification