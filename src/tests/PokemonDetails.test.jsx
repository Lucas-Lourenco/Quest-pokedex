
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import PokemonDetails from "../pages/PokemonDetails";
import { MemoryRouter } from "react-router-dom";



jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ name: "pikachu" }),
  useNavigate: () => jest.fn(),
}));


import axios from "axios";
jest.mock("axios");

describe("PokemonDetails component", () => {
  const mockPokemonData = {
    name: "pikachu",
    sprites: { front_default: "pikachu.png" },
    types: [{ type: { name: "electric" } }],
    moves: [{ move: { name: "thunder-shock" } }, { move: { name: "quick-attack" } }],
    abilities: [
      { ability: { name: "static", url: "https://pokeapi.co/api/v2/ability/1/" } },
    ],
  };

  const mockAbilityData = {
    flavor_text_entries: [
      { language: { name: "en" }, flavor_text: "Generates electricity." },
    ],
  };

  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      if (url.includes("/pokemon/")) return Promise.resolve({ data: mockPokemonData });
      if (url.includes("/ability/")) return Promise.resolve({ data: mockAbilityData });
      return Promise.resolve({ data: {} });
    });
  });

  test("renders loading initially", () => {
    render(
      <MemoryRouter>
        <PokemonDetails />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders pokemon details correctly", async () => {
    render(
      <MemoryRouter>
        <PokemonDetails />
      </MemoryRouter>
    );

    
    const nameElement = await screen.findAllByText(/pikachu/i);
    expect(nameElement[0]).toBeInTheDocument();

    
    const typeElements = await screen.findAllByText(/electric/i);
    expect(typeElements[0]).toBeInTheDocument();

    
    const move1 = await screen.findAllByText(/thunder-shock/i);
    const move2 = await screen.findAllByText(/quick-attack/i);
    expect(move1[0]).toBeInTheDocument();
    expect(move2[0]).toBeInTheDocument();

  
    const ability = await screen.findAllByText(/static/i);
    const description = await screen.findAllByText(/generates electricity/i);
    expect(ability[0]).toBeInTheDocument();
    expect(description[0]).toBeInTheDocument();

    
    const backButton = await screen.findAllByText(/go back/i);
    expect(backButton[0]).toBeInTheDocument();
  });
});
