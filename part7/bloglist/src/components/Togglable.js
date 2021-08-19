import React, { useState } from 'react'
import {connect} from 'react-redux'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button id="cancel-button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

const mapDispatchToProps = (state) => {
  return {
    togglable: state.togglable
  }
}

const connectedTogglable = connect(
  null,
  mapDispatchToProps
)(Togglable)

export default connectedTogglable
