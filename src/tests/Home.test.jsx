import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import Home from "../pages/Home";
import { HomeProvider } from "../contextApi/HomeContext";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");


function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <HomeProvider>{ui}</HomeProvider>
    </BrowserRouter>
  );
}


jest.mock("../services/PokemonApi", () => ({
  PokemonApi: jest.fn(() =>
    Promise.resolve([
      {
        name: "pikachu",
        url: "/pikachu",
        types: [{ type: { name: "electric" } }],
        sprites: { front_default: "/pikachu.png" },
      },
      {
        name: "bulbasaur",
        url: "/bulbasaur",
        types: [{ type: { name: "grass" } }],
        sprites: { front_default: "/bulbasaur.png" },
      },
    ])
  ),
}));

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders initial pokemons from PokemonApi", async () => {
    await act(async () => {
      renderWithProviders(<Home />);
    });

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it("loads more pokemons when 'Load More variety' is clicked", async () => {
    const { PokemonApi } = require("../services/PokemonApi");
    PokemonApi.mockResolvedValueOnce([
      {
        name: "eevee",
        url: "/eevee",
        types: [{ type: { name: "normal" } }],
        sprites: { front_default: "/eevee.png" },
      },
    ]);

    await act(async () => {
      renderWithProviders(<Home />);
    });

    const loadMoreBtn = screen.getByRole("button", { name: /load more variety/i });
    await act(async () => fireEvent.click(loadMoreBtn));

    expect(await screen.findByText(/eevee/i)).toBeInTheDocument();
  });

  
  it("resets filter when 'Show Variety' is clicked", async () => {
    const allTypePokemons = [{ pokemon: { name: "eevee", url: "/eevee" } }];
    axios.get.mockResolvedValueOnce({ data: { pokemon: allTypePokemons } });
    axios.get.mockResolvedValueOnce({
      data: {
        name: "eevee",
        types: [{ type: { name: "normal" } }],
        sprites: { front_default: "/eevee.png" },
      },
    });

    await act(async () => {
      renderWithProviders(<Home />);
    });

    const selectInput = screen.getByRole("combobox");
    await act(async () => {
      fireEvent.change(selectInput, { target: { value: "normal" } });
    });

    const searchBtn = screen.getByRole("button", { name: /search/i });
    await act(async () => fireEvent.click(searchBtn));

    const showVarietyBtn = screen.getByRole("button", { name: /load more variety/i }); 
    await act(async () => fireEvent.click(showVarietyBtn));

    expect(screen.queryByText(/eevee/i)).not.toBeInTheDocument();
  });

  

  it("scrolls to top when 'Back to Top' is clicked", async () => {
    await act(async () => renderWithProviders(<Home />));

    window.scrollTo = jest.fn();
    const backToTopBtn = screen.getByRole("button", { name: /back to top/i });

    fireEvent.click(backToTopBtn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
