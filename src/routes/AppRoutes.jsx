import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Home  from "../pages/Home";
import PokemonDetails from "../pages/PokemonDetails";
import React from "react";
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </BrowserRouter>
  );
  
}