import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/recipe-details.css";

const RecipeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;

  if (!recipe) {
    return (
      <div>
        <p>Recipe not found.</p>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="recipe-details-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>
      <h2>{recipe.strMeal}</h2>

      <div className="top-section">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-img"
        />

        <div className="ingredients-section">
          <h3>🧄 Ingredients</h3>
          <pre className="ingredients-list">
            {getIngredients().join("\n")}
          </pre>
        </div>
      </div>

      <h3>👩‍🍳 Instructions</h3>
      <pre className="instructions-list">{recipe.strInstructions}</pre>
    </div>
  );
};

export default RecipeDetails;
