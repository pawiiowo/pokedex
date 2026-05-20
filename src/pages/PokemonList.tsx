import { useEffect, useState } from 'react';
import { getPokemons, getPokemonTypes } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { useNavigate } from 'react-router-dom'; // import del hook useNavigate para poder navegar a la pantalla de detalle al hacer click en una tarjeta

export const PokemonList = () => {
  const [list, setList] = useState<Pokemon[]>([]);
  const navigate = useNavigate(); // se obtiene la funcion navigate para poder usarla en el onclick de cada tarjeta
  const miFavorito = "rattata";

  const [types, setTypes] = useState<string[]>([]); // se guarda la lista de tipos que da la api
  const [searchText, setSearchText] = useState<string>(''); // lo que la persona va escribiendo en la caja de busqueda
  const [selectedType, setSelectedType] = useState<string>(''); // el tipo de pokemon que se elija en el menu desplegable

  useEffect(() => {
    getPokemons().then(setList);
    getPokemonTypes().then(setTypes); // cuando cargue la pagina se hace un request para lso tipos 
  }, []);

  // se filtra la lista original usando lo que se escriba o seleccione en la pantalla
  const filteredPokemons = list.filter((pokemon) => {
    // validacion para la busqueda, se pasa a minuscula lo que sea que se escriba
    const matchesSearch = pokemon.name.toLowerCase().includes(searchText.toLowerCase());
    
    // el filtro por tipo lo dejo en true para completarlo despues
    const matchesType = true; 

    // si se hace match lo que escribe o el tipo, se muestra, si no se esconde
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
            // un mapa para que cada tipo sea una opcion del menu
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {filteredPokemons.length === 0 && (
        <div style={{ textAlign: 'center', color: '#66ABE0', fontSize: '20px', marginTop: '50px', fontWeight: 'bold' }}>
           Ups! No se encontro ningún Pokémon con ese nombre. Intentálo de nuevo.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        {filteredPokemons.map((p) => (
          <div key={p.name} onClick={() => navigate(`/pokemon/${p.name}`)} style={{ cursor: 'pointer' }}>
            <PokemonCard pokemon={p} esFavorito={p.name === miFavorito} />
          </div>
        ))}
      </div>
    </div>
  );
};