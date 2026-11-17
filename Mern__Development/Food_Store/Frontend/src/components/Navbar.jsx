import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();  // React Router hook
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>🍔 FoodApp</h2>
      <div>
        <Link to="/">Home</Link>
        {token && <Link to="/orders">Orders</Link>}
        {token && <Link to="/profile">Profile</Link>}
        {token && userRole === "admin" && <Link to="/admin">Admin</Link>}
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Signup</Link>}
        {token && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}