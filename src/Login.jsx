import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      if (email === storedUser.email && password === storedUser.password) {
        setMessage(`Welcome back, ${storedUser.name}!`);
        // You can navigate to another page here
      } else {
        setMessage('Invalid email or password.');
      }
    } else {
      setMessage('No account found. Please sign up first.');
    }
  };

  const handleCreateAccount = () => {
    navigate('/SignIn');
  };

  return (
    <div className="login-body">
      <h2 className="login-header">Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label><br /><br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label><br /><br />
        <button type="submit">Login</button>{' '}
        <button type="button" onClick={handleCreateAccount}>Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

