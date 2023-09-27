import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error messages
  const [message, setMessage] = useState(null); // State to hold error messages

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:5500/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('Signup successful');
        setError(null);
        setMessage('Successful now login ')
      } else {
        // Handle registration errors
        const data = await response.json();
        if (data.error) {
          setMessage(null)
          setError(data.error); // Display the error message from the server
        } else {
          setMessage(null)
          setError('Registration failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Signup failed', error);
      // Handle network or server errors
      setError('An error occurred while signing up. Please try again later.');
    }
  };


  return (
    <div className="container">
      <h2>Signup</h2>
      <form>
        {error && <div className="alert alert-danger">{error}</div>} {/* Display error messages */}
        {message && <div className="alert alert-success">{message}</div>} {/* Display error messages */}
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
          onClick={handleSignup}
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
