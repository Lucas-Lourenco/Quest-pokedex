
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import '@testing-library/jest-dom';
import Header from "../components/Header"; 
import { ThemeContext } from "../contextApi/ThemeContext";

describe("Header component", () => {
  test("renders the header and title", () => {
    render(
      <ThemeContext.Provider value={{ toggleTheme: jest.fn() }}>
        <Header />
      </ThemeContext.Provider>
    );

    expect(screen.getByText("Pokedex")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Light\/Dark/i })).toBeInTheDocument();
  });

  test("calls toggleTheme when button is clicked", () => {
    const toggleThemeMock = jest.fn();

    render(
      <ThemeContext.Provider value={{ toggleTheme: toggleThemeMock }}>
        <Header />
      </ThemeContext.Provider>
    );

    const button = screen.getByRole("button", { name: /Light\/Dark/i });
    fireEvent.click(button);

    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });
  
});
