export default function Hero() {
  const scrollToFood = () => { // Browser built-in-method == Scren ko os element thuk scrol krta hi

    document.getElementById("food-section")?.scrollIntoView({ behavior: "smooth" });
    
    // Agr eleemnt mila thub he scrolToView chalao Agr nahi mila tho koch n chalao
  };

  return (
    <div className="hero">
      <h1>Delicious Food Delivered Fast</h1>
      <p>Fresh food at your doorstep</p>
      <button onClick={scrollToFood}>Order Now</button>
    </div>
  );
}