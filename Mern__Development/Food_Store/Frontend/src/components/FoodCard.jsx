export default function FoodCard({ food, onOrder }) {
  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} />
      <h3>{food.name}</h3>
      <p>{food.description}</p>
      <h4>Rs {food.price}</h4>
      <button onClick={() => onOrder(food._id)}>Order Now</button>
    </div>
  );
}