import React from "react";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import PopularRecipe from "../components/popular-recipe";
const Home = () => {
    return(
    <>
        <Navbar />
        <Hero />
        <PopularRecipe />
    </>
    )
};
export default Home;