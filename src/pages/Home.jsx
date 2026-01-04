import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import PopularRecipe from "../components/popular-recipe";
import IngredientSearch from "../components/ingredient-search";
const Home = () => {
    return(
    <>
        <Navbar />
        <Hero />
        <PopularRecipe />
        <IngredientSearch />
    </>
    )
};
export default Home;