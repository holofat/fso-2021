import React from 'react'

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

export default LoginForm