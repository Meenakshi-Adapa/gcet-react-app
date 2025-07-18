import React, { useState } from "react";
import { AppContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
export default function Login() {
  const { users, user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const handleSubmit = async () => {
    if (!user.email || !user.pass) {
      setMsg("Please enter both email and password.");
      return;
    }
    const url = `${API}/users/login`;
    console.log("Login request payload:", user);
    try {
      const found = await axios.post(url, user);
      console.log("Login response token:", found.data.token);
      if (found.data.token) {
        setUser({ ...found.data.result, token: found.data.token });
        Navigate("/");
      } else {
        setMsg("Invalid User or Password");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMsg(error.response.data.message);
      } else {
        setMsg("Login failed. Please try again.");
      }
      console.error("Login error:", error);
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Login</h3>
      {msg && <div style={{ color: "red" }}>{msg}</div>}
      <p>
        <input
          type="text"
          placeholder="Email address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <button onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}
