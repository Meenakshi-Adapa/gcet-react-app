import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user)); // Store user
    setWelcomeMessage("Welcome, " + name + "!");
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="signin-body">
      <h2 className="signin-header">Sign In</h2>
      {welcomeMessage ? (
        <p>{welcomeMessage}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label><br /><br />
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
          <button type="submit">Sign In</button>
        </form>
      )}
    </div>
  );
}
