import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4002/api/products/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token); // Save token in localStorage
      alert('Login successful');
      navigate('/products'); // Redirect to products page
    } catch (error) {
      console.error(error);
      alert('Error logging in');
    }
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  };

  const linkStyle = {
    display: "block",
    textAlign: "center",
    marginTop: "10px",
    textDecoration: "none",
    color: "#007BFF",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>Login</button>
      <Link to="/" style={linkStyle}>Register</Link>
    </form>
  );
};

export default Login;