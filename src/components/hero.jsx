import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/hero.css"; 
import heroBg from "../assets/hero-bg4.png";

const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return; // do nothing if empty

    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await res.json();

      if (!data.meals || data.meals.length === 0) {
        alert("No recipes found!");
        return;
      }

      // Navigate to a search results page, passing the results
      navigate("/search", { state: { results: data.meals, query } });
    } catch (err) {
      console.error("Error fetching search results:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  // Trigger search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="hero-container" style={{ backgroundImage: `url(${heroBg})` }}>
      <h1>Find Your Perfect Recipe</h1>
      <p>Discover delicious recipes tailored to your taste</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Hero;
