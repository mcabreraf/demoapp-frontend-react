import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    checkToken(navigate)
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = "https://aws-flask-app.manuelprojectsinaws.com/login"
    const options = {
        username: username,
        password: password
    }
    try {
      const response = await axios.post(url, options)
      if (response.status === 200) {
        const data = await response.json()
        localStorage.setItem("token", data.access_token)
        navigate("/contacts")
      } else {
        const data = await response.json()
        alert("Invalid credentials. Please try again.", data.message)
      }
    } catch (error) {
      alert("An error occurred. Please try again later.")
    }
  }

  const checkToken = async (navigate) => {
    const token = localStorage.getItem("token")
    if (token) {
      const url = "https://aws-flask-app.manuelprojectsinaws.com/validate-token"
      const options = {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
      try {
        const response = await fetch(url, options)
        if (response.ok) {
            navigate("/contacts")
        }
      } catch (error) {
        alert("Token validation failed:", error)
        localStorage.removeItem("token")
      }
    }
  }

  const registerButton = () => {
    navigate("/register")
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
      <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
      <button type='submit'>Login</button>
      <button style={{ marginTop: "50px" }} onClick={registerButton}>Register</button>
    </form>
  )
}

export default Login