import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/popular-recipe.css";

const PopularRecipe = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const data = await res.json();
        setRecipes(data.meals ? data.meals.slice(0, 20) : []);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const shortenTitle = (title, maxLength = 35) => {
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
  };

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

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
      <div className="title">
        <h2>Popular Recipes</h2>
      </div>

      <div className="recipe-grid">
        {recipes.slice(10, 14).map((recipe) => (
          <div
            className="recipe-card"
            key={recipe.idMeal}
            onClick={() =>
              navigate(`/recipe/${recipe.idMeal}`, { state: { recipe } })
            }
          >
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <h3 className="recipe-title">{shortenTitle(recipe.strMeal)}</h3>

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

export default PopularRecipe;
