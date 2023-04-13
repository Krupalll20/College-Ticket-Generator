import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from "axios"
import "../styles/UserDisplay.css"


const UserDisplay = () => {
  const token = window.localStorage.getItem("token")
  const role = window.localStorage.getItem("role")
  const [data, setData] = useState({})

  const logout = () => {
    window.localStorage.clear()
    window.location.href = "/login"
  }

  // const addQuery = ()=>{
  //   try {

  //   } catch (error) {

  //   }
  // }

  const remove = async (id) => {
    // console.log(id)
    try {
      const res = await axios.get(`http://127.0.0.1:5000/deletebutton/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      window.location.reload()
      // console.log(res.data)

    } catch (err) {
      window.alert("Didn't Remove")
    }
  }

  const callDisplayPage = async () => {

    try {

      const res = await axios.get('http://127.0.0.1:5000/getQuery', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(res.data.data)
      // console.log(res.data)

    } catch (error) {
      window.alert("Something Went Wrong")
    }
  }



  React.useEffect(() => {
    callDisplayPage();
  }, [])

  if (role === "FACULTY") {
    return (
      <div className='u-div-1'>
        {data.length > 0 ? (<ul>
          {data.map((query) => (<>
            <p className='query'>{query.query}</p>
            <p className='status'>{query.status}</p>
            <button className='btn-remove' value={query._id} onClick={(e) => remove(e.target.value)}>Remove</button><br /><br />
          </>
          ))}
        </ul>) : (<p></p>)}

        <NavLink to="/addQuery"><button className='addQuery'>Add New Query</button></NavLink><br /><br />

        <NavLink><button className='u-logout' onClick={logout}>Logout</button></NavLink>

      </div>
    )
  }
}

export default UserDisplay
