import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import RecipeDetails from "./pages/RecipeDetails";
import SearchResults from './pages/SearchResults';
function App() {
  


  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
    
  )
}

export default App
