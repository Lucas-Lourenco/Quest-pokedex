import styled from "styled-components";
import React from "react";


export default function PokemonCard({ pokemon }) {
  const pokemonType = pokemon.types[0].type.name;

  return (
    <StyledPokemonCard type={pokemonType}>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
    </StyledPokemonCard>
  );
}

const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  poison: "#A040A0",
  flying: "#A890F0",
  bug: "#A8B820",
  normal: "#A8A878",
  ground: "#E0C068",
  fighting: "#C03028",
  psychic: "#F85888",
  rock: "#B8A038",
  ghost: "#705898",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
};


const StyledPokemonCard = styled.div`
 
  padding: 15px;
  border-radius: 15px;
  text-align: center;
  background: #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  width: 150px;
  margin: 10px;

  &:hover {
    background: ${({ type }) =>
      typeColors[type]
        ? `linear-gradient(135deg, #fff, ${typeColors[type]})`
        : "#ddd"};
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 8px 16px rgba(0,0,0,0.3);
  }

  h2 {
    margin-bottom: 10px;
    text-transform: capitalize;
    font-size: 1.1rem;
    color: #333;
  }

  img {
    width: 100px;
    height: 100px;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 600px) {
    width: 120px;
    padding: 10px;

    h2 {
      font-size: 1rem;
    }
      
    img {
      width: 80px;
      height: 80px;
    }
  }
`;
