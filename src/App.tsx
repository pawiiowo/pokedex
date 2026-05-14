import { useEffect, useState } from 'react';
import { getPokemons } from './services/pokemonService';
import type { Pokemon } from './types/pokemon';
import { PokemonCard } from './components/PokemonCard';

function App() {
  // guardar los pokemons para que react los pinte
  const [list, setList] = useState<Pokemon[]>([]);
  const miFavorito = "rattata";

  useEffect(() => {
    getPokemons().then(setList);
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Comic Sans MS', backgroundColor: '#EEBDD6', minHeight: '100vh' }}>
      <h1 style={{ color: '#66ABE0', textAlign: 'center' }}>Pokédex - Clase 2</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
        gap: '20px' 
      }}>
        {list.map((p) => (
          <PokemonCard 
            key={p.name} 
            pokemon={p} 
            esFavorito={p.name === miFavorito} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;