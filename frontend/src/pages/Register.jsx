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

  // REGISTER
  const register = async () => {

    try {

      setLoading(true);

      await axios.post(
        "https://version-system.onrender.com/auth/register",
        {
          name,
          email,
          password,
          role,
        }
      );

      alert("Registered successfully");

      nav("/");

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Registration failed"
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
          Create your secure workspace account
        </p>

        {/* NAME */}
        <div className="input-group">

          <label className="input-label">
            Name
          </label>

          <input
            className="input"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        {/* ROLE */}
        <div className="input-group">

          <label className="input-label">
            Role
          </label>

          <select
            className="input"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <option value="EDITOR">
              EDITOR
            </option>

            <option value="VIEWER">
              VIEWER
            </option>

          </select>

        </div>

        {/* BUTTON */}
        <button
          className="btn primary"
          onClick={register}
          disabled={loading}
        >

          {loading
            ? "Creating..."
            : "Register"}

        </button>

        {/* LOGIN LINK */}
        <p className="muted">

          Already have an account?{" "}

          <Link to="/">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}