import React, { useState } from 'react'
import axios from 'axios'


const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        email, password
      })
      const data = await res.data;
      console.log(data.token)
      window.localStorage.setItem("token", data.token)

      if (data.role === "ADMIN") {
        window.localStorage.setItem("role", "ADMIN")
        window.location.href = "/adminDisplay"
      }else{
        window.localStorage.setItem("role", "FACULTY")
        window.location.href = "/userDisplay"
      }

    } catch (error) {
      if (error.response.data.res === 'error') {
        console.log(error)
        window.alert(error.response.data.data)
      }
    }
  }

  return (
    <div className='div-login'>
      <div className='div-l-2'>
        <form method='post' id='login'>

          <label className='login-label' htmlFor="email">Email : </label>
          <input type="text" name="email" id='email' className='email' placeholder='Enter email id : '
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <br /><br /><br />

          <label className='login-label' htmlFor="password">Password : </label>
          <input type="text" name="password" id='password' className='password' placeholder='Enter password :' value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br /><br />

          <input type="submit" value="Login" name='login' id='login' className='login' onClick={login} />

        </form>
      </div>
    </div>
  )
}

export default Login
