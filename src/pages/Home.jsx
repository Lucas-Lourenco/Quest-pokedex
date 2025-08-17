import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PokemonCard from "../components/PokemonCard";
import { PokemonApi } from "../services/PokemonApi";
import { SelectByType } from "../components/SelectByType";
import axios from "axios";
import { useHome } from "../contextApi/HomeContext";

export default function Home() {
  const {
    pokemonList, setPokemonList,
    offset, setOffset,
    selectedType, setSelectedType,
    filteredList, setFilteredList,
    typePage, setTypePage,
    fullTypeList, setFullTypeList,
    isFiltering, setIsFiltering,
    scrollY, setScrollY,
  } = useHome();


  useEffect(() => {
    if (!isFiltering && pokemonList.length === 0) {
      (async () => {
        const initialPokemons = await PokemonApi(0);
        setPokemonList(initialPokemons);
        setOffset(10); 
      })();
    }
  }, [isFiltering, pokemonList.length, setPokemonList, setOffset]);

  
  useEffect(() => {
    window.scrollTo(0, scrollY);
  }, []);

  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setScrollY]);

  
  async function handleLoadMoreVariety() {
    const newPokemons = await PokemonApi(offset);
    setPokemonList((old) => [...old, ...newPokemons]);
    setOffset((old) => old + 10);
  }

 
  async function handleSearchByType() {
    if (!selectedType) return;
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/type/${selectedType.value}`
      );

      const allTypePokemons = res.data.pokemon.map((p) => p.pokemon);
      setFullTypeList(allTypePokemons);

      const firstTen = allTypePokemons.slice(0, 10);
      const detailed = await Promise.all(
        firstTen.map((p) => axios.get(p.url).then((r) => r.data))
      );

      setFilteredList(detailed);
      setTypePage(1);
      setIsFiltering(true);
    } catch (error) {
      console.error("Erro ao buscar por tipo", error);
    }
  }

  
  async function handleLoadMoreByType() {
    const start = typePage * 10;
    const end = start + 10;
    const nextPokemons = fullTypeList.slice(start, end);

    const detailed = await Promise.all(
      nextPokemons.map((p) => axios.get(p.url).then((r) => r.data))
    );

    setFilteredList((old) => [...old, ...detailed]);
    setTypePage((old) => old + 1);
  }

  
  function handleShowAll() {
    setIsFiltering(false);
    setSelectedType(null);
    setFilteredList([]);
    setTypePage(0);
    setFullTypeList([]);
    setPokemonList([]);
    setOffset(0);
  }

  const listToRender = isFiltering ? filteredList : pokemonList;

  return (
    <Container>
      <Controls>
        <SelectByType
          onChange={(value) => setSelectedType(value)}
          value={selectedType}
        />
        <LoadMoreButton onClick={handleSearchByType}>Search</LoadMoreButton>
        {isFiltering && (
          <LoadMoreButton onClick={handleShowAll}>Show Variety</LoadMoreButton>
        )}
      </Controls>

      <PokemonListContainer>
        {listToRender.map((pokemon, index) => (
          <Link
            key={index}
            to={`/pokemon/${pokemon.name}`}
            style={{ textDecoration: "none" }}
          >
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </PokemonListContainer>

      {!isFiltering && (
        <LoadMoreButton onClick={handleLoadMoreVariety}>
          Load More variety
        </LoadMoreButton>
      )}
      {isFiltering && filteredList.length < fullTypeList.length && (
        <LoadMoreButton onClick={handleLoadMoreByType}>
          Load More by type
        </LoadMoreButton>
      )}
      <LoadMoreButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to Top
      </LoadMoreButton>

    </Container>
  );
}


const Container = styled.div`
  padding: 20px;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;}
`;

const PokemonListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  background: #ffffffb1;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
 
  width: 100%;
  text-align: center;
  margin: 0 auto 20px auto;
`;

const LoadMoreButton = styled.button`
   
  background: #74a6bfff;
  color: white;
  margin-left: 10px;
  border: 1px solid #ccccccff;
  border-radius: 12px;
  font-size: 1.4em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid #ccccccff;
    background: #3f81a1a6;
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
    &:focus {
    outline: none;
    border-color: #ccccccff; 
  }
`;
