import { useEffect, useState } from 'react';
import { getPokemons, getPokemonTypes } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { useNavigate } from 'react-router-dom'; // import del hook useNavigate para poder navegar a la pantalla de detalle al hacer click en una tarjeta

export const PokemonList = () => {
  const [list, setList] = useState<Pokemon[]>([]);
  const navigate = useNavigate(); // se obtiene la funcion navigate para poder usarla en el onclick de cada tarjeta

  const [types, setTypes] = useState<string[]>([]); // se guarda la lista de tipos que da la api
  const [searchText, setSearchText] = useState<string>(''); // lo que la persona va escribiendo en la caja de busqueda
  const [selectedType, setSelectedType] = useState<string>(''); // el tipo de pokemon que se elija en el menu desplegable

  // se intenta leer si ya habia favoritos guardados en el navegador si no empieza con una lista vacia
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('pokefavoritos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    getPokemons().then(setList);
    getPokemonTypes().then(setTypes); // cuando cargue la pagina se hace un request para lso tipos 
  }, []);

  // funcion para agregar o quitar de la lista de favoritos
  const toggleFavorito = (pokemonName: string) => {
    let updatedFavorites: string[];
    
    if (favorites.includes(pokemonName)) {
      // si ya era favorito se quita de la lista
      updatedFavorites = favorites.filter(name => name !== pokemonName);
    } else {
      // si no era favorito se agrega a la lista
      updatedFavorites = [...favorites, pokemonName];
    }
    
    setFavorites(updatedFavorites); // se actualiza el estado en react
    localStorage.setItem('pokefavoritos', JSON.stringify(updatedFavorites)); // se guarda en el navegador para que no se borre al recargar
  };

  // se usa para que el filtro funcione rapido sin alentar la pagina con muchos requests
  const getTiposPorId = (name: string): string[] => {
    const diccionarioTipos: { [key: string]: string[] } = {
      bulbasaur: ['grass', 'poison'], ivysaur: ['grass', 'poison'], venusaur: ['grass', 'poison'],
      charmander: ['fire'], charmeleon: ['fire'], charizard: ['fire', 'flying'],
      squirtle: ['water'], wartortle: ['water'], blastoise: ['water'],
      caterpie: ['bug'], metapod: ['bug'], butterfree: ['bug', 'flying'],
      weedle: ['bug', 'poison'], kakuna: ['bug', 'poison'], beedrill: ['bug', 'poison'],
      pidgey: ['normal', 'flying'], pidgeotto: ['normal', 'flying'], pidgeot: ['normal', 'flying'],
      rattata: ['normal'], raticate: ['normal']
    };
    return diccionarioTipos[name.toLowerCase()] || [];
  };

  // se filtra la lista original usando lo que se escribió o seleccionó en la pantalla
  const filteredPokemons = list.filter((pokemon) => {
    // validacion para que se pase todo a minusculas 
    const matchesSearch = pokemon.name.toLowerCase().includes(searchText.toLowerCase());
    
    // ok si no se selecciona ningún tipo, se muestran todos
    // si eligen un tipo, se compara con el diccionario convertido a minusculas para que sirva por si solo
    const pokemonTypes = getTiposPorId(pokemon.name);
    const matchesType = selectedType === "" || pokemonTypes.includes(selectedType.toLowerCase()); 

    // si cumple con las dos cosas entonces si se muestra en la pantalla
    return matchesSearch && matchesType;
  });

  return (
    <div style={{ padding: '40px', fontFamily: 'Comic Sans MS', backgroundColor: '#EEBDD6', minHeight: '100vh' }}>
      <h1 style={{ color: '#66ABE0', textAlign: 'center' }}>Pokédex - Clase 3</h1>

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '30px' }}>
        
        <input 
          type="text" 
          placeholder="Buscar Pokémon por nombre..." 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // cada que se escriba una letra se actualiza el estado
          style={{ padding: '10px', borderRadius: '10px', border: '2px solid #66ABE0', width: '250px' }}
        />

        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          style={{ padding: '10px', borderRadius: '10px', border: '2px solid #66ABE0', textTransform: 'capitalize' }}
        >
          <option value="">Todos los tipos</option>
          {types.map((type) => (
            // pasamos el value en minusculas
            <option key={type} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>
      </div>

      {filteredPokemons.length === 0 && (
        <div style={{ textAlign: 'center', color: '#66ABE0', fontSize: '20px', marginTop: '50px', fontWeight: 'bold' }}>
           Ups! No se encontro ningún Pokémon con esos criterios. Intentálo de nuevo.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        {filteredPokemons.map((p) => {
          // se checa si este pokemon esta guardado en favoritos
          const esFavoritoReal = favorites.includes(p.name);

          return (
            <div key={p.name} style={{ position: 'relative' }}>
              <div onClick={() => navigate(`/pokemon/${p.name}`)} style={{ cursor: 'pointer' }}>
                <PokemonCard pokemon={p} esFavorito={esFavoritoReal} />
              </div>

              {/* guardar o quitar de favoritos */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // que al dar click al boton no se navegue al detalle
                  toggleFavorito(p.name);
                }}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'white',
                  border: '1px solid #66ABE0',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  boxShadow: '0px 2px 5px rgba(0,0,0,0.1)'
                }}
              >
                {esFavoritoReal ? '❤︎' : '♡'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};