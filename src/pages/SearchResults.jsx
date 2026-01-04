import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/popular-recipe.css"; 

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const query = location.state?.query || "";

  if (!results.length) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>No results found for "{query}"</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }
  const getMockTime = () => Math.floor(Math.random() * (60 - 15 + 1)) + 15;
  const isNonVeg = (meal) => {
      const nonVegKeywords = [
        "beef",
        "pork",
        "chicken",
        "meat",
        "fish",
        "seafood",
        "egg",
        "lamb",
        "shrimp",
        "crab",
        "mutton",
        "turkey",
        "duck",
      ];

      const name = meal.strMeal?.toLowerCase() || "";
      const category = meal.strCategory?.toLowerCase() || "";

      return nonVegKeywords.some(
        (word) => name.includes(word) || category.includes(word)
      );
};
  return (
    <div className="popular-recipe-container">
        <button onClick={() => navigate("/")} className="back-btn">
        ← Back
      </button>
      <h2>Search Results for "{query}"</h2>
      <div className="recipe-grid">
        {results.map((recipe) => (
          <div
            className="recipe-card"
            key={recipe.idMeal}
            onClick={() => navigate(`/recipe/${recipe.idMeal}`, { state: { recipe } })}
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3 className="recipe-title">{recipe.strMeal}</h3>
            <p>
              <div
                className="dot"
                style={{
                  backgroundColor: isNonVeg(recipe) ? "#dc2626" : "#2f7d57",
                }}
              ></div>
              {getMockTime()} mins |{" "}
                {isNonVeg(recipe) ? "Non-veg" : "Vegetarian"}
              
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
