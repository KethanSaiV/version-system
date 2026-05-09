import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // LOGIN
  const login = async () => {

    try {

      setLoading(true);

      const res = await axios.post(
        "https://version-system.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        res.data.token
      );

      // SAVE ROLE
      localStorage.setItem(
        "role",
        res.data.role
      );

      // REDIRECT
      nav("/dashboard");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="auth-wrap">

      <div className="auth-card">

        {/* BRAND */}
        <div className="brand">

          <div className="logo">
            V
          </div>

          <h2>
            Version Manager
          </h2>

        </div>

        <p className="muted">
          Secure document version tracking system
        </p>

        {/* EMAIL */}
        <div className="input-group">

          <label className="input-label">
            Email
          </label>

          <input
            className="input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* PASSWORD */}
        <div className="input-group">

          <label className="input-label">
            Password
          </label>

          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        {/* LOGIN BUTTON */}
        <button
          className="btn primary"
          onClick={login}
          disabled={loading}
        >

          {loading
            ? "Signing in..."
            : "Login"}

        </button>

        {/* REGISTER LINK */}
        <p className="muted">

          New here?{" "}

          <Link to="/register">
            Create an account
          </Link>

        </p>

      </div>

    </div>
  );
}