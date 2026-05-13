import type { Pokemon, PokemonResponse } from "../types/pokemon"; 

// funcion que va por los datos a la pokeapi
export const getPokemons = async (): Promise<Pokemon[]> => {
  // tomar los primeros 20 pokemons 
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  
  // pasar a json para poder usarlo
  const data: PokemonResponse = await response.json();
  
  // regresar solo los resultados que es lo que nos sirve
  return data.results;
};