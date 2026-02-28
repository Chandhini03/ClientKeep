import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../index.css";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirm) {
      alert("All fields are required");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          alert(data.msg);
          return;
        }

        alert("Signup successful!");
        navigate("/");
      })
      .catch(() => {
        alert("Server error");
      });
  };

  return (
    <div className="auth-container">
      {/* LEFT */}
      <div className="auth-left">
        <h4 className="logo">ClientKeep</h4>
        <p className="tagline">FOR FOUNDERS & FREELANCERS</p>

        <h1>
          Every client,<br />
          <span>perfectly</span><br />
          managed.
        </h1>
        <p className="desc">
          Stop losing deals in spreadsheets.
        </p>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-tabs">
          <Link to="/">Sign in</Link>
          <button className="active" type="button">
            Create account
          </button>
        </div>

        <h2>Create your account.</h2>

        {/* ✅ FORM WRAPPER ADDED */}
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm password</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          {/* ✅ SUBMIT BUTTON INSIDE FORM */}
          <button type="submit" className="primary-btn">
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}