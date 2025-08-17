
import axios from "axios";
import { PokemonApi } from "../services/PokemonApi";

jest.mock("axios");

describe("PokemonApi", () => {
  const mockPokemonList = {
    results: [
      { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    ],
  };

  const mockPokemonDetails = [
    { data: { name: "pikachu", id: 25 } },
    { data: { name: "bulbasaur", id: 1 } },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should fetch list and return detailed pokemon data", async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockPokemonList }) 
      .mockResolvedValueOnce(mockPokemonDetails[0])   
      .mockResolvedValueOnce(mockPokemonDetails[1]); 

    const result = await PokemonApi(0);

    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
    );
    expect(result).toEqual([{ name: "pikachu", id: 25 }, { name: "bulbasaur", id: 1 }]);
  });

  test("should handle errors gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));

    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const result = await PokemonApi(0);

    expect(consoleSpy).toHaveBeenCalledWith("erro: API error");
    expect(result).toBeUndefined();

    consoleSpy.mockRestore();
  });
});
