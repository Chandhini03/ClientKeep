import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../index.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          alert(data.msg);
          return;
        }

        // ✅ Login success
        navigate("/dashboard");
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
          Stop losing deals in spreadsheets. ClientKeep gives you a clear view
          of every relationship, deadline, and opportunity.
        </p>
      </div>

      {/* RIGHT */}
      <div className="auth-right">
        <div className="auth-tabs">
          <button className="active" type="button">Sign in</button>
          <Link to="/register">Create account</Link>
        </div>

        <h2>Welcome back.</h2>
        <p className="subtext">Sign in to your ClientKeep workspace.</p>

        {/* ✅ FORM WRAPPER */}
        <form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
          )}

          <button type="submit" className="primary-btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}