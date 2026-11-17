import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FoodList from "../components/FoodList";

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

const placeOrder = async (foodId) => {           {/*foodId us food ki ID hai jisko user order kar raha hai. */}
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      window.location.href = "/login";
      return;
    }

    try {
      await API.post("/orders", { foodId, quantity: 1 });
      alert("Order placed successfully!");
    } catch (error) {
      alert("Failed to place order");
    }
  };

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
      <Hero />
      <FoodList foods={foods} onOrder={placeOrder} /> 
      {/*Home ke foods array ko FoodList ke paas bhej do.FoodList us array ko use karke cards banata hai. */}
   
    {/*
    onOrder={placeOrder}...........Home ka placeOrder function bhi FoodList ko de do.
    Phir FoodList us function ko FoodCard ko de deta hai....
    Aur jab user Order Now button dabata hai.....
    To akhir mein Home wala placeOrder(foodId) function chal jata hai.
    */}
    </div>
  );
}