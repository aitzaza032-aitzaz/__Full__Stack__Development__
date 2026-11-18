import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email,
          password
        }
      );


      if (res.status === 200 || res.status === 201) {

        localStorage.setItem(
          "token",
          res.data.token
        );

        localStorage.setItem(
          "userRole",
          res.data.user.role
        );


        // Tell App that login happened
        window.dispatchEvent(
          new Event("authChanged")
        );


        alert(
          `Welcome ${
            res.data.user.role === "admin"
              ? "Admin"
              : "User"
          }!`
        );


        if (res.data.user.role === "admin") {

          navigate("/admin");

        } else {

          navigate("/");

        }

      }

    } catch (err) {

      console.log(err);

      if (err.response) {

        alert(
          err.response.data.message ||
          "Invalid email or password"
        );

      } else {

        alert("Server error");

      }

    }

  };


  return (

    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          🔐
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your MediCare account
        </p>


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
          placeholder="Enter your password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        <button
          className="auth-button"
          onClick={login}
        >
          Login
        </button>


        <p className="auth-footer-text">

          Don't have an account?

          <Link to="/signup">
            Signup
          </Link>

        </p>


        <div className="page-navigation">

          <Link to="/">
            ← Back Home
          </Link>

          <Link to="/signup">
            Next: Signup →
          </Link>

        </div>

      </div>

    </div>

  );
}