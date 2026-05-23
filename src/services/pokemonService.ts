import type { Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// funcion que trae los 151 pokemon, incluye los detalles
export const getPokemons = async (): Promise<Pokemon[]> => {
// se usa primero una lista simple con los urls 
  const response = await fetch(`${BASE_URL}/pokemon?limit=151`);
  const data = await response.json();

  // mapeo para buscar el detalle en paralelo, usa promise all
  const detailedPromises = data.results.map(async (p: any) => {
    const res = await fetch(p.url);
    const detail = await res.json();

    // se regresa el pokemon ya con los detalles
    return {
      id: detail.id,
      name: detail.name,
      image: detail.sprites.front_default || '',
      // mapeamos los tipos reales que vienen de la api
      types: detail.types.map((t: any) => t.type.name),
      stats: [
        detail.stats[0].base_stat, 
        detail.stats[1].base_stat, 
        detail.stats[2].base_stat, 
        detail.stats[5].base_stat  
      ]
    };
  });

  return Promise.all(detailedPromises);
};

// aqui se toma la lista de tipos, se hace el request y se usa map para regresar solo los nombres de tipos
export const getPokemonTypes = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/type`);
  const data = await response.json();
  return data.results.map((t: any) => t.name);
};

// traer el detalle de un pokemon por su nombre
export const getPokemonDetail = async (name: string): Promise<Pokemon | undefined> => {
  const pokemons = await getPokemons();
  return pokemons.find(p => p.name.toLowerCase() === name.toLowerCase());
};