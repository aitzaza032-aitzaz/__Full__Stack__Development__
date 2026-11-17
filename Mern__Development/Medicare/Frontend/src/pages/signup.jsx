import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [admin, setAdmin] = useState(false);
  const [adminExists, setAdminExists] = useState(false);


  useEffect(() => {

    const checkAdmin = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/user/check-admin"
        );

        setAdminExists(res.data);

      } catch (err) {

        console.log(err);

      }

    };

    checkAdmin();

  }, []);


  const signup = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/user/signup",
        {
          name,
          email,
          password,
          role: admin ? "admin" : "user"
        }
      );


      if (
        res.status === 200 ||
        res.status === 201
      ) {

        alert(
          `Signup Successful! You are ${
            admin ? "ADMIN" : "USER"
          }`
        );

        navigate("/login");

      }

    } catch (err) {

      console.log(err);

      if (err.response) {

        alert(
          err.response.data.message ||
          "Signup failed"
        );

      }

    }

  };


  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          🏥
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Join the MediCare hospital system
        </p>


        <label>Full Name</label>

        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />


        <label>Email Address</label>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        <label>Password</label>

        <input
          type="password"
          placeholder="Minimum 6 characters"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        {!adminExists && (

          <label className="admin-checkbox">

            <input
              type="checkbox"
              checked={admin}
              onChange={(e) =>
                setAdmin(e.target.checked)
              }
            />

            Create Admin Account

          </label>

        )}


        {adminExists && (

          <div className="admin-warning">

            Admin account already exists.
            Only one admin is allowed.

          </div>

        )}


        <button
          className="auth-button"
          onClick={signup}
        >
          Create Account
        </button>


        <p className="auth-footer-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>


        <div className="page-navigation">

          <Link to="/login">
            ← Back: Login
          </Link>

          <Link to="/">
            Home →
          </Link>

        </div>

      </div>

    </div>

  );
}