import type { Pokemon, PokemonResponse } from "../types/pokemon"; 

// funcion que va por los datos a la pokeapi
export const getPokemons = async (): Promise<Pokemon[]> => {
  // tomar los primeros 20 pokemon
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

// funcion para traer la info de un solo pokemon (peso, altura, etc)
export const getPokemonDetail = async (name: string) => {
  // se busca al pokemon por su nombre en la api
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  
  // se convierte a objeto para usarlo en la pantalla de detalle
  const data = await response.json();

  return data;
};

// funcion para agarrar los tipos de pokemon
export const getPokemonTypes = async (): Promise<string[]> => {

  // peticion a la api 
  const response = await fetch("https://pokeapi.co/api/v2/type");
  const data = await response.json();

  // se devuelve una lista solo con los nombres de los tipos
  // recordar que map es como un for pero devuelve una lista nueva con los datos cambiados, sin los datos extras
  return data.results.map((t: any) => t.name);
};