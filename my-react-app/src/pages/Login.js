import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
      alert("Login successful!");
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.msg || err.message));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <p className="forgot">Forget Password?</p>
          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don’t have an account? <Link to="/signup" className="link">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

