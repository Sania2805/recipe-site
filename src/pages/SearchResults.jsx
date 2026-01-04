import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/popular-recipe.css"; // reuse card/grid styles

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

  return (
    <div className="popular-recipe-container">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
