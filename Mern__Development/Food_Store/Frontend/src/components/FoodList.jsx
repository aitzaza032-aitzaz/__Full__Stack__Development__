import FoodCard from "./FoodCard";

export default function FoodList({ foods, onOrder }) {
  return (
    <div id="food-section" className="food-grid">
      {foods.map((food) => (
        <FoodCard key={food._id} food={food} onOrder={onOrder} /> // array m hur item ki lia food card use hoga name price id
      ))}                                          
    </div>
  );
}