
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import { SelectByType } from "../components/SelectByType";
import axios from "axios";


jest.mock("axios");

describe("SelectByType component", () => {
  const mockTypesData = {
    data: {
      results: [
        { name: "fire" },
        { name: "water" },
        { name: "unknown" }, 
        { name: "stellar" }, 
      ],
    },
  };

  beforeEach(() => {
    axios.get.mockResolvedValue(mockTypesData);
  });

  test("renders Select with placeholder", () => {
    render(<SelectByType onChange={jest.fn()} value={null} />);
    expect(screen.getByText("Search by type")).toBeInTheDocument();
  });

  test("loads and sets types correctly", async () => {
    render(<SelectByType onChange={jest.fn()} value={null} />);

    
    await waitFor(() => {
     
      expect(axios.get).toHaveBeenCalledWith("https://pokeapi.co/api/v2/type");
    });
  });
  
});
