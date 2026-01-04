import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ingredient-search.css";

const IngredientSearch = () => {
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && ingredientInput.trim()) {
      if (!ingredients.includes(ingredientInput.trim())) {
        setIngredients([...ingredients, ingredientInput.trim()]);
      }
      setIngredientInput("");
    }
  };

  
  const removeIngredient = (ing) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  const handleSearch = async () => {
  if (!ingredients.length) return;

  try {
    const requests = ingredients.map((ing) =>
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
      ).then((res) => res.json())
    );

    const responses = await Promise.all(requests);

    
    const mealIdSets = responses
      .map((res) => res.meals || [])
      .map((meals) => new Set(meals.map((m) => m.idMeal)));

    
    const commonIds = [...mealIdSets[0]].filter((id) =>
      mealIdSets.every((set) => set.has(id))
    );

    
    const allMeals = responses.flatMap((res) => res.meals || []);
    const uniqueMeals = Object.values(
      allMeals.reduce((acc, meal) => {
        acc[meal.idMeal] = meal;
        return acc;
      }, {})
    );

    const finalResults = uniqueMeals.filter((meal) =>
      commonIds.includes(meal.idMeal)
    );

    setResults(finalResults);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    setResults([]);
  }
  if (finalResults.length === 0) {
  setNoResults(true);
    } else {
    setNoResults(false);
    }

setResults(finalResults);

};
const [noResults, setNoResults] = useState(false);


  
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

  
  const handleRecipeClick = async (idMeal) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
      );
      const data = await res.json();
      const fullRecipe = data.meals[0];
      navigate(`/recipe/${idMeal}`, { state: { recipe: fullRecipe } });
    } catch (err) {
      console.error("Error fetching full recipe:", err);
    }
  };

  return (
    <div className="ingredient-search-container">
      <h2>What's in your kitchen?</h2>
      <p>Find recipes using the ingredients you have</p>

      <div className="ingredient-input-section">
        {ingredients.map((ing, idx) => (
          <div key={idx} className="ingredient-chip">
            {ing} <span onClick={() => removeIngredient(ing)}>×</span>
          </div>
        ))}

        <input
          type="text"
          placeholder="Type an ingredient and press Enter"
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <button className="ingredient-search-btn" onClick={handleSearch}>
        Find Recipes
      </button>
        {noResults && (
            <p className="no-results-msg">
                😔 No recipes found with these ingredients.  
                Try removing one ingredient or changing them.
            </p>
         )}

      
      <div className="recipe-grid" style={{ marginTop: "2rem" }}>
        {results.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="recipe-card"
            onClick={() => handleRecipeClick(recipe.idMeal)}
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
              {getMockTime()} mins | {isNonVeg(recipe) ? "Non-veg" : "Vegetarian"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientSearch;
