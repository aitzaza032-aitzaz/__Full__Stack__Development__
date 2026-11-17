import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminExists, setAdminExists] = useState(false);

  // Check karo ke admin already hai ya nahi
  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        const res = await API.get("/users/check-admin");
        setAdminExists(res.data.exists);
      } catch (error) {
        console.error("Error checking admin:", error);
      }
    };
    checkAdminExists();
  }, []);

  const signupUser = async () => {
    setError("");
    setLoading(true);

    if (!name || !email || !password) {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await API.post("/auth/signup", {
        name,
        email,
        password,
        role: isAdmin ? "admin" : "user"
      });

      if (response.data.success) {
        alert(`Signup Successful! You are ${isAdmin ? "ADMIN" : "USER"}`);
        navigate("/login");
      } else {
        setError(response.data.message || "Signup failed");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <h2>Signup</h2>
      {error && <div className="error">{error}</div>}
      
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="Password (min 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {/* 👇 Admin checkbox - Sirf tab dikhega jab admin exist nahi karta */}
      {!adminExists && (
        <label style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0" }}>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Register as Admin (Only one admin allowed)
        </label>
      )}
      
      {adminExists && (
        <p style={{ color: "orange", fontSize: "12px", margin: "10px 0" }}>
          ⚠️ Admin already exists. Only one admin is allowed.
        </p>
      )}
      
      <button onClick={signupUser} disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
      
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}