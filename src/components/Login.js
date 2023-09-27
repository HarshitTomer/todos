import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setLoggedIn, setUsername }) {
  const [username, setUsernameState] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error messages
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5500/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userId', data.id);
        localStorage.setItem('username', data.name);
        setLoggedIn(true);
        setUsername(data.name);
        navigate('/create-todo');
      } else {
        // Handle incorrect login credentials
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Login failed', error);
      // Handle network or server errors
      setError('An error occurred while logging in. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        {error && <div className="alert alert-danger">{error}</div>} 
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsernameState(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
