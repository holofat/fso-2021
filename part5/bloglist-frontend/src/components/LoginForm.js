import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleUsername, handlePassword, username, password, handleLogin }) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username <input text="text" value={username} name="username" onChange={handleUsername}/>
      </div>
      <div>
        password <input type="password" value={password} name="password" onChange={handlePassword}/>
      </div>
      <button type="submit">login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm