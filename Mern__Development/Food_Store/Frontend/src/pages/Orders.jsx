import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await API.get("/orders/myorders");
      setOrders(res.data);
    } catch (error) {
      if (error.response?.status === 401) { // Agar backend ne 401 (Unauthorized) response bheja hai
        localStorage.removeItem("token");    //to login expire ho chuka hai ya token invalid hai.
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <h2 style={{ textAlign: "center", margin: "2rem 0" }}>My Orders</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <img src={order.food?.image} alt={order.food?.name} /> {/*Agar food hai to image do, warna error mat do. */}
            <div>
              <h3>{order.food?.name}</h3>
              <p>Quantity: {order.quantity}</p>
              <p>Total: Rs {order.totalPrice}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}