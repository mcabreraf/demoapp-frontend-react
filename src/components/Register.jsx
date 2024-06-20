import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e, retryAttempt = 1) => {
    e.preventDefault();
    const url = "https://aws-flask-app.manuelprojectsinaws.com/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
        fullName: fullName,
      },
    };

    try {
      const response = await axios(url, options);

      if (response.status === 201) {
        const data = response.data;
        alert(data.message, "Please login to continue.");
        navigate("/login");
      } else {
        alert("Missing Data. Please try again.");
      }
    } catch (error) {
      if (retryAttempt <= 3) {
        const delay = 500 * Math.pow(2, retryAttempt - 1); 
        await new Promise((resolve) => setTimeout(resolve, delay));
        handleSubmit(e, retryAttempt + 1);
      } else {
        alert("Failed to register after multiple attempts. Please try again later.");
      }
    }
  };

  const backButton = () => {
    navigate("/");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2>Register</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      <button type="submit">Register</button>
      <button style={{ marginTop: "50px" }} onClick={backButton}>
        Back
      </button>
    </form>
  );
};

export default Register;
