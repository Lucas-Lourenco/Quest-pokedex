import React,{ useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

export const SelectByType = ({ onChange, value }) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const { data } = await axios.get("https://pokeapi.co/api/v2/type");
        const options = data.results.filter(type => type.name !== "unknown" && type.name !== "stellar").map(type => ({
          value: type.name,
          label: type.name
        }));
        setTypes(options);
      } catch (error) {
        console.error("Erro ao buscar tipos:", error);
      }
    }

    fetchTypes();
  }, []);

  return (
   <Select
  options={types}
  onChange={onChange}
  value={value}
  placeholder="Search by type"
  styles={{
    control: (base) => ({
      ...base,
      backgroundColor: "#ffffffca", 
      color: "black",
    }),
    singleValue: (base) => ({
      ...base,
      color: "black", 
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#cccccce1", 
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#bbbbbb" : "#cccccce0",
      color: "black",
    }),
  }}
/>


  );
};
