// src/tests/PokemonCard.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import PokemonCard from "../components/PokemonCard";

describe("PokemonCard component", () => {
  const mockPokemon = {
    name: "pikachu",
    types: [{ type: { name: "electric" } }],
    sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  };

  test("renders the Pokemon name", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    expect(screen.getByText("pikachu")).toBeInTheDocument();
  });

  test("renders the Pokemon image with correct src and alt", () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    const img = screen.getByAltText("pikachu");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockPokemon.sprites.front_default);
  });

  test("applies type-based styles", () => {
    const { container } = render(<PokemonCard pokemon={mockPokemon} />);
    const cardDiv = container.firstChild;

    
    expect(cardDiv).toHaveAttribute("type", mockPokemon.types[0].type.name);
  });
  
});
