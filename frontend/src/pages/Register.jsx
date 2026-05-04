import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EDITOR");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const register = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
        role,
      });
      alert("Registered successfully");
      nav("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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

        <h3>Create your account</h3>

        <input
          className="input"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <select
          className="input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="EDITOR">EDITOR</option>
          <option value="VIEWER">VIEWER</option>
        </select>

        <button className="btn primary" onClick={register} disabled={loading}>
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="muted">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}