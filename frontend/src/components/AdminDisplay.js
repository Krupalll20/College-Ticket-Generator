import React, { useState } from 'react'
import axios from "axios"
import { NavLink } from 'react-router-dom'

const AdminDisplay = () => {
  const token = window.localStorage.getItem("token")
  const role = window.localStorage.getItem("role")
  const [data, setData] = useState({})

  const logout = () => {
    window.localStorage.clear()
    window.location.href = "/login"
  }

  const done = async (id) => {
    // console.log(id)
    try {
      const res = await axios.get(`http://127.0.0.1:5000/donebutton/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      window.location.reload()
    } catch (err) {
      window.alert("Didn't change")
    }
  }

  const callAdminPage = async () => {

    try {

      const res = await axios.get('http://127.0.0.1:5000/adminhome', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(res.data.data)
      // console.log(res.data.data[0].idx)

    } catch (error) {
      window.alert("Something Went Wrong")
    }
  }


  React.useEffect(() => {
    callAdminPage();
  }, [])

  if (role === "ADMIN") {
    return (
      <div>
        {data.length > 0 ? (<ul>
          {data.map((query) => (<>
            <p className='a-query' >{query.query}</p>
            <p className='a-email' >{query.email}</p>
            <p className='a-name' >{query.name}</p>
            <p className='a-phone' >{query.phone}</p>
            <button className='a-btn-done' value={query.idx} onClick={(e) => done(e.target.value)}>Done</button><br /><br /><br />
          </>
          ))}
        </ul>) : (<p>no data</p>)}

        <NavLink to="/register"><button className='add-faculty'>Add Faculty</button></NavLink><br /><br />

        <NavLink><button className='a-logout' onClick={logout}>Logout</button></NavLink>

      </div>
    )
  }
}

export default AdminDisplay
