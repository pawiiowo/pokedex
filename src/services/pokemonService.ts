import type { Pokemon, PokemonResponse } from "../types/pokemon"; 

// funcion que va por los datos a la pokeapi
export const getPokemons = async (): Promise<Pokemon[]> => {
  // tomar los primeros 20 pokemons 
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  
  // pasar a json para poder usarlo
  const data: PokemonResponse = await response.json();

  // se transforma la lista para ponerles la imagen
  return data.results.map((pokemon, index) => { // map es como un ciclo y devuelve una nueva lista con los datos cambiados
    const id = index + 1;

    return {
      ...pokemon, // se mantiene el nombre y la url USAMOS EL SPREAD OPERATOR bravo!!!
      // el link de la imagen se obtiene con el id
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
  });
};