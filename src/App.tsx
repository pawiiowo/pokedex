import { useEffect, useState } from 'react';
import { getPokemons } from './services/pokemonService';
import type { Pokemon } from './types/pokemon';

function App() {
  // guardar los pokemons para que react los pinte
  const [list, setList] = useState<Pokemon[]>([]);

  const miFavorito = "rattata";

  useEffect(() => {
    getPokemons().then(setList);
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Comic Sans MS', backgroundColor: '#EEBDD6', minHeight: '100vh' }}>
      <h1 style={{ color: '#66ABE0', textAlign: 'center' }}>Pokédex - Clase 1</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
        gap: '20px' 
      }}>
        {list.map((p) => {
          const esFavorito = p.name === miFavorito;

          return (
            <div key={p.name} style={{ 
              padding: '15px', 
              border: esFavorito ? '4px solid #fce45d' : '2px solid #7d85c6', 
              borderRadius: '10px',
              textAlign: 'center',
              background: esFavorito ? '#F9F0AA' : '#8D93C8',
              fontWeight: 'bold',
              position: 'relative'
            }}>
              {esFavorito && (
                <span style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#ffffff',
                  color: '#000000',
                  fontSize: '10px',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  border: '1px solid #ffffff'
                }}>
                  mi favorito (de estos 20)
                </span>
              )}
              
              {p.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;