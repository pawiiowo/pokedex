import { useEffect, useState } from 'react';
import { getPokemons } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';
import { PokemonCard } from '../components/PokemonCard';
import { useNavigate } from 'react-router-dom'; // import del hook useNavigate para poder navegar a la pantalla de detalle al hacer click en una tarjeta

export const PokemonList = () => {
  const [list, setList] = useState<Pokemon[]>([]);
  const navigate = useNavigate(); // se obtiene la función navigate para poder usarla en el onClick de cada tarjeta
  const miFavorito = "rattata";

  useEffect(() => {
    getPokemons().then(setList);
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Comic Sans MS', backgroundColor: '#EEBDD6', minHeight: '100vh' }}>
      <h1 style={{ color: '#66ABE0', textAlign: 'center' }}>Pokédex - Clase 2</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
        {list.map((p) => (
          /* se envuelve la tarjeta con un div que al hacer click lleve al detalle */
          <div key={p.name} onClick={() => navigate(`/pokemon/${p.name}`)} style={{ cursor: 'pointer' }}>
            <PokemonCard pokemon={p} esFavorito={p.name === miFavorito} />
          </div>
        ))}
      </div>
    </div>
  );
};