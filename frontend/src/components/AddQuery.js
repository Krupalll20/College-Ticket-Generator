import React, { useState } from 'react'
import axios from 'axios'
import "../styles/AddQuery.css"

const AddQuery = () => {

  const [query, setQuery] = useState("")
  const token = window.localStorage.getItem("token")
  const role = window.localStorage.getItem("role")

  const submitQuery = async (e) => {
    e.preventDefault()
    try {
      console.log("getetet")

      const res = await axios.post("http://127.0.0.1:5000/addquery", { query }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      window.location.href="/userDisplay"

    } catch (error) {
      window.alert("Something Went Wrong")
    }
  }

  if (role === "FACULTY") {
    return (
      <div className='addqry-div'>
        <form method='post' id='query-form'>

          <label className='login-label' htmlFor="query">query : </label>
          <input type="text" name="query" id='query' className='query' placeholder='Enter query : '
            value={query} onChange={(e) => setQuery(e.target.value)} required />
          <br /><br /><br />

          <input type="submit" value="Submit Query" name='sbt-qry' id='submit-qry' className='submit-qry' onClick={submitQuery} />

        </form>
      </div>
    )
  }
  else {
    window.location.href = "/login"
  }
}

export default AddQuery
