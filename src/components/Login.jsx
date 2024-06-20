import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkToken(navigate);
  }, [navigate]);

  const handleSubmit = async (e, retryAttempt = 1) => {
    e.preventDefault();
    const url = 'https://aws-flask-app.manuelprojectsinaws.com/login';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username,
        password,
      },
    };

    try {
      const response = await axios(url, options);

      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        navigate('/contacts');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      if (retryAttempt <= 3) {
        const delay = 1000 * Math.pow(2, retryAttempt - 1); // exponential backoff
        await new Promise((resolve) => setTimeout(resolve, delay));
        handleSubmit(e, retryAttempt + 1); // retry with incremented attempt count
      } else {
        alert('Failed to log in after multiple attempts. Please try again later.');
      }
    }
  };

  const checkToken = async (navigate) => {
    const token = localStorage.getItem('token');
    if (token) {
      const url = 'https://aws-flask-app.manuelprojectsinaws.com/validate-token';
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(url, options);
        if (response.status === 200) {
          navigate('/contacts');
        }
      } catch (error) {
        alert('Token validation failed.');
        localStorage.removeItem('token');
      }
    }
  };

  const registerButton = () => {
    navigate('/register');
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <button style={{ marginTop: '50px' }} onClick={registerButton}>
        Register
      </button>
    </form>
  );
};

export default Login;
