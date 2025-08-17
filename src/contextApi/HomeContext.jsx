import React, { createContext, useContext, useState } from "react";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);

  const [selectedType, setSelectedType] = useState(null);
  const [filteredList, setFilteredList] = useState([]);
  const [typePage, setTypePage] = useState(0);
  const [fullTypeList, setFullTypeList] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

 
  const [scrollY, setScrollY] = useState(0);

  return (
    <HomeContext.Provider
      value={{
        pokemonList, setPokemonList,
        offset, setOffset,
        selectedType, setSelectedType,
        filteredList, setFilteredList,
        typePage, setTypePage,
        fullTypeList, setFullTypeList,
        isFiltering, setIsFiltering,
        scrollY, setScrollY,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}


export function useHome() {
  return useContext(HomeContext);
}
