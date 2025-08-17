import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';



jest.mock("../components/SelectByType", () => () => <div>SelectByType Mock</div>);
jest.mock("../pages/Home", () => () => <div>Home Component</div>);
jest.mock("../pages/PokemonDetails", () => () => <div>PokemonDetails Component</div>);

import { AppRoutes } from "../routes/AppRoutes";

describe("AppRoutes basic routing", () => {
  test("renders Home component", () => {
    render(<AppRoutes />);
    expect(screen.getByText("Home Component")).toBeInTheDocument();
  });

  test("renders PokemonDetails component", () => {
   
    window.history.pushState({}, "Pokemon Page", "/pokemon/pikachu");

    render(<AppRoutes />);
    expect(screen.getByText("PokemonDetails Component")).toBeInTheDocument();
  });
});
