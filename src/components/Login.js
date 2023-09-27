// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

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
        localStorage.setItem('userId', data.id); // Save user ID
        localStorage.setItem('username', data.name); // Save username
        navigate('/create-todo');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  

  return (
    <div className="container">
      <h2>Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
