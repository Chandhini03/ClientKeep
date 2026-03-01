import { useEffect, useState } from "react";
import '../index.css';
export default function Profile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          setError(data.msg);
        } else {
          setUser(data);
        }
      })
      .catch(() => {
        setError("Server error");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1>{user.name}</h1>
            <p className="email">{user.email}</p>
          </div>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <span>Account created</span>
            <span>{new Date(user.createdAt).toDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}