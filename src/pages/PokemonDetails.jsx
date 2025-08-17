import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import styled from "styled-components";

export default function PokemonDetails() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [moves, setMoves] = useState([]);
  const [abilitiesDetails, setAbilitiesDetails] = useState([]);

  useEffect(() => {
    async function fetchPokemonDetail() {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const detail = response.data;
        setPokemon(detail);

        const firstFiveMoves = detail.moves
          .slice(0, 5)
          .map((m) => m.move.name);
        setMoves(firstFiveMoves);

        const abilityPromises = detail.abilities.map(async (ab) => {
          const res = await axios.get(ab.ability.url);
          const englishEntry = res.data.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          );
          return {
            name: ab.ability.name,
            description: englishEntry
              ? englishEntry.flavor_text
              : "No description",
          };
        });

        const abilitiesData = await Promise.all(abilityPromises);
        setAbilitiesDetails(abilitiesData);
      } catch (error) {
        console.error("Erro ao buscar detalhes do Pokémon:", error);
      }
    }

    fetchPokemonDetail();
  }, [name]);

  function goHome() {
    navigate("/");
  }

  if (!pokemon) return <p>Loading...</p>;

  return (
    <Container>
      <Card>
        <Nome>{pokemon.name}</Nome>
        <Imagem src={pokemon.sprites.front_default} alt={pokemon.name} />

        <Section>
          <Titulo>Tipo</Titulo>
          <Texto>{pokemon.types.map((t) => t.type.name).join(", ")}</Texto>
        </Section>

        <Section>
          <Titulo>Movimentos</Titulo>
          <List>
            {moves.map((m, index) => (
              <ListItem key={index}>{m}</ListItem>
            ))}
          </List>
        </Section>

        <Section>
          <Titulo>Habilidades</Titulo>
          <List>
            {abilitiesDetails.map((ab) => (
              <ListItem key={ab.name}>
                <strong>{ab.name}</strong>: {ab.description}
              </ListItem>
            ))}
          </List>
        </Section>

        <Botao onClick={goHome}>⬅ Go Back</Botao>
      </Card>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f3f3f35c;
  padding: 15px;
`;

const Card = styled.div`
  background: #ffffffb1;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  max-width: 600px;
  width: 100%;
  text-align: center;
`;


const Nome = styled.h1`
  text-transform: capitalize;
  font-size: 2.5em;
  margin-bottom: 15px;
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    color: #1a1b1dff;
    transform: scale(1.05);
    text-shadow: 2px 2px 8px rgba(0,0,0,0.3);
  }
`;

const Imagem = styled.img`
  width: 250px;
  height: 250px;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0px 5px 12px rgba(0,0,0,0.3));
  }
    @media (max-width: 500px) {
    width: 150px;
    height: 150px;}
`;

const Section = styled.div`
  margin: 20px 0;
`;

const Titulo = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #444;
  transition: all 0.3s ease;

  &:hover {
    color: #111417ff;
    transform: scale(1.05);
    text-shadow: 1px 1px 6px rgba(0,0,0,0.2);
  }
`;

const Texto = styled.p`
  font-size: 1.1em;
  color: #0f0e0eff;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    color: #1d1e20ff;
    text-shadow: 1px 1px 6px rgba(0,0,0,0.2);
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  background: #ede6e6bd;
  color: #333;
  margin: 5px 0;
  padding: 10px;
  border-radius: 10px;
  font-size: 1em;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: #dcdcdc;
    box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  }
`;

const Botao = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  background: #1f2122ff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #333536a6;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
    
`;
