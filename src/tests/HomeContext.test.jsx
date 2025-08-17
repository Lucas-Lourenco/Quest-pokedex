
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { HomeProvider, useHome } from "../contextApi/HomeContext";



const TestComponent = () => {
  const {
    pokemonList, setPokemonList,
    offset, setOffset,
    selectedType, setSelectedType,
    isFiltering, setIsFiltering,
    scrollY, setScrollY
  } = useHome();

  return (
    <div>
      <span data-testid="pokemonList">{pokemonList.length}</span>
      <span data-testid="offset">{offset}</span>
      <span data-testid="selectedType">{selectedType || ""}</span>
      <span data-testid="isFiltering">{isFiltering ? "true" : "false"}</span>
      <span data-testid="scrollY">{scrollY}</span>

      <button onClick={() => setPokemonList([{ name: "pikachu" }])}>Add Pokemon</button>
      <button onClick={() => setOffset(offset + 10)}>Increment Offset</button>
      <button onClick={() => setSelectedType("fire")}>Set Type</button>
      <button onClick={() => setIsFiltering(!isFiltering)}>Toggle Filtering</button>
      <button onClick={() => setScrollY(scrollY + 100)}>Scroll</button>
    </div>
  );
};

describe("HomeProvider", () => {
  test("provides state and setters correctly", () => {
    render(
      <HomeProvider>
        <TestComponent />
      </HomeProvider>
    );

    const pokemonListSpan = screen.getByTestId("pokemonList");
    const offsetSpan = screen.getByTestId("offset");
    const selectedTypeSpan = screen.getByTestId("selectedType");
    const isFilteringSpan = screen.getByTestId("isFiltering");
    const scrollYSpan = screen.getByTestId("scrollY");

    const addPokemonBtn = screen.getByText("Add Pokemon");
    const incrementOffsetBtn = screen.getByText("Increment Offset");
    const setTypeBtn = screen.getByText("Set Type");
    const toggleFilteringBtn = screen.getByText("Toggle Filtering");
    const scrollBtn = screen.getByText("Scroll");

   
    expect(pokemonListSpan).toHaveTextContent("0");
    expect(offsetSpan).toHaveTextContent("0");
    expect(selectedTypeSpan).toHaveTextContent("");
    expect(isFilteringSpan).toHaveTextContent("false");
    expect(scrollYSpan).toHaveTextContent("0");

    
    fireEvent.click(addPokemonBtn);
    expect(pokemonListSpan).toHaveTextContent("1");

    fireEvent.click(incrementOffsetBtn);
    expect(offsetSpan).toHaveTextContent("10");

    fireEvent.click(setTypeBtn);
    expect(selectedTypeSpan).toHaveTextContent("fire");

    fireEvent.click(toggleFilteringBtn);
    expect(isFilteringSpan).toHaveTextContent("true");

    fireEvent.click(scrollBtn);
    expect(scrollYSpan).toHaveTextContent("100");
  });
});
