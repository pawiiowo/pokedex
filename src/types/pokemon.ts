// este es como el molde para que no se pase ningun dato
export interface Pokemon {
  name: string;
  url: string;
}

// aqui se guarda lo que te da la api en la lista
export interface PokemonResponse {
  results: Pokemon[];
}