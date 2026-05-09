import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://version-system.onrender.com/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      nav("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="brand">
          <div className="logo">V</div>
          <h2>Version Manager</h2>
        </div>

        <h3>Welcome back</h3>

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn primary" onClick={login} disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="muted">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}