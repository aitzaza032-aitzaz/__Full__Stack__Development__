import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null); // editing id = burger ki id
  const [message, setMessage] = useState({ text: "", type: "" });

  // Check admin on load
  useEffect(() => {  // jb hum adminPgae m jaingi tho a useefect chliga
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    
    if (!token || role !== "admin") {
      alert("Admin access required!");
      navigate("/login");
      return;
    }
    
    fetchFoods();
  }, []);  // [] a effect pihli bar chliga jb component load hoga 

  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods"); // pihli a complete kro pir neechi jao 
      setFoods(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type = "success") => { // kaam hi s ka user ko msg dekana text,type parameter
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000); // 3 sec k bad automatic remove krna
  };

  const addFood = async () => {
    if (!name || !price || !image || !description) {
      showMessage("Please fill all fields!", "error");
      return;
    }

    try {
      await API.post("/foods", {
        name,
        price: Number(price),
        image,
        description
      });
      
      showMessage("✅ Food added successfully!");
      resetForm();
      fetchFoods();
      
    } catch (error) {
      showMessage("❌ Failed to add food", "error");
    }
  };

  const updateFood = async () => {  // ${} variable ki value string k under daal do 
    try {
      await API.put(`/foods/${editingId}`, {  // jb edit click hoga tho editingId m jo id store hogi o backend recieve kr liga
        name,
        price: Number(price),
        image,
        description
      });
      
      showMessage("✅ Food updated successfully!");
      resetForm();
      fetchFoods();
      
    } catch (error) {
      showMessage("❌ Failed to update food", "error");
    }
  };

  const deleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this food?")) { // built in ..browser popup yes no
      try {
        await API.delete(`/foods/${id}`);
        showMessage("✅ Food deleted successfully!");
        fetchFoods();
      } catch (error) {
        showMessage("❌ Failed to delete food", "error");
      }
    }
  };

  const editFood = (food) => { //Jis food par Edit click karo, uska data form mein bhar do.
    setEditingId(food._id); //food = Pizza Object
    setName(food.name);
    setPrice(food.price);
    setImage(food.image);
    setDescription(food.description);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Browser automatic page ko oper liki jata hi 
  }; // Form ko fill karta hai.
 
  const resetForm = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
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
      <div className="admin-container">
        <h1>Admin Dashboard</h1>
        
        {/* Message */}
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
        
        {/* Add/Edit Food Form */}
        <div className="food-form">
          <h2>{editingId ? "Edit Food" : "Add New Food"}</h2>
           {/*agr editingid hi tho pihla wala nahi tho second */}
          
          <input
            type="text"
            placeholder="Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <input
            type="number"
            placeholder="Price (Rs)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
          
          <div className="form-buttons">
            <button className="btn-primary" onClick={editingId ? updateFood : addFood}>
            {editingId ? "Update Food" : "Add Food"} 
            </button>  {/*Agar condition true hai → pehla part chalega. */}                           

            
            {editingId && (
              <button className="btn-secondary" onClick={resetForm}>
                Cancel 
              </button> 
            )}
          </div>   {/*Agar editingId ki value hai, tabhi Cancel button dikhao. */}
        </div>
        
        {/* Food List */}
        <div className="food-list">
          <h2>All Foods ({foods.length})</h2>  {/* jithni ho othi show kro                */}
          
          {foods.length === 0 ? (
            <p>No foods added yet. Add your first food above!</p>
          ) : (
            foods.map((food) => (
              <div key={food._id} className="food-item">  
                <img src={food.image} alt={food.name} />     {/* Src image k address lita hi  */}
                <div className="food-info">
                  <h3>{food.name}</h3>
                  <p>{food.description}</p>
                  <span className="price">Rs {food.price}</span>
                </div>
                <div className="food-actions">
                  <button className="edit-btn" onClick={() => editFood(food)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => deleteFood(food._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}