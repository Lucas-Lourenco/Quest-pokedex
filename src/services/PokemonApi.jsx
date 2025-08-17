import axios from 'axios';

export async function
PokemonApi(offset=0){
    try{
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);

        const details = response.data.results;
        

        const detailPromises = details.map(pokemon=>axios.get(pokemon.url));
        const detailsResponses = await Promise.all(detailPromises);
        
        const pokemonData = detailsResponses.map(detailsPokemon=> detailsPokemon.data);
        console.log("dados detalhados dos pokemons",pokemonData);
        return pokemonData;
    }
catch(error){
    console.error(`erro: ${error.message}`);}
    
}
    
