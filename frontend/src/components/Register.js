import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
  const [department, setDepartment] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")


  // const isAdmin = window.localStorage.getItem("isAdmin")
  // console.log(isAdmin)
  const role = window.localStorage.getItem("role")
  // console.log(token)


  const signup = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://127.0.0.1:5000/register", {
        department, email, password, name, phone
      })

      // console.log(res.data)
      window.alert("Successfully registered")
      window.location.href = "/login"

    } catch (error) {
      if (error.response.data.res === 'error') {
        // console.log("error")
        window.alert(error.response.data.data)
      }
    }
  }

  if (role === "ADMIN") {
    return (
      <div className='s-d1'>
        <div className="s-d2">
          <form method="post" id='signup'>

            <label className='signup-label' htmlFor="productID">Department : </label>
            <input type="text" name='productID' id='productID' className='productID' placeholder='Department' value={department} onChange={(e) => setDepartment(e.target.value)} required /> <br /><br /><br />

            <label className='signup-label' htmlFor="email">Email : </label>
            <input type='email' name='email' id='email' className='email' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br /><br />

            <label className='signup-label' htmlFor="password">Password : </label>
            <input type="text" name='password' id='password' className='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br /><br />

            <label className='signup-label' htmlFor="name">Name : </label>
            <input type="text" name='name' id='name' className='name' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} required /><br /><br /><br />

            <label className='signup-label' htmlFor="phone">Phone : </label>
            <input type="text" name='phone' id='phone' className='phone' placeholder='phone' value={phone} onChange={(e) => setPhone(e.target.value)} required /><br /><br /><br />

            <input type="submit" onClick={signup} value="Add User" className='btn-signup' />

          </form>
        </div>
      </div>
    )
  }
  else {
    window.location.href = "/login"
  }
}


export default Register
