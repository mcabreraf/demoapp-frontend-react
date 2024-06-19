import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url = "https://aws-flask-app.manuelprojectsinaws.com/register"
    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          username,
          password,
          fullName
      })
    }
    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        alert(data.message, "Please login to continue.")
        navigate("/login")
      } else {
        const data = await response.json()
        alert("Missing Data. Please try again.", data.message)
      }
    } catch (error) {
      alert("An error occurred while registering user. Please try again later.")
    }
  }

    const backButton = () => {
      navigate("/")
    }

    return (
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <input type='text' placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
        <button type='submit'>Register</button>
        <button style={{ marginTop: "50px" }} onClick={backButton}>Back</button> 
      </form>
    )
}

export default Register