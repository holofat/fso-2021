import React from 'react'

const LoginForm = ({ handleUsername, handlePassword, username, password, handleLogin }) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username <input id='username' text="text" value={username} name="username" onChange={handleUsername}/>
      </div>
      <div>
        password <input id='password' type="password" value={password} name="password" onChange={handlePassword}/>
      </div>
      <button id='login-button' type="submit">login</button>
    </form>
  </div>
)

export default LoginForm