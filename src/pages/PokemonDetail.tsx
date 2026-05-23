import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // import de hooks para los parametros de la url y navegacion
import { getPokemonDetail } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';

export const PokemonDetail = () => {
  const { name } = useParams<{ name: string }>(); // tomar el nombre desde la url
  const navigate = useNavigate(); // regresar a la pantalla anterior
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (name) {
      getPokemonDetail(name).then((data) => {
        if (data) setPokemon(data);
      });
    }
  }, [name]);

  if (!pokemon) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Comic Sans MS', backgroundColor: '#EEBDD6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ color: '#66ABE0' }}>Cargando datos del Pokémon...</h2>
      </div>
    );
  }

  const labelStats = ['Vida (HP)', 'Ataque', 'Defensa', 'Velocidad'];

  return (
    <div style={{ padding: '40px', fontFamily: 'Comic Sans MS', backgroundColor: '#EEBDD6', minHeight: '100vh', textAlign: 'center' }}>
      
      <button 
        onClick={() => navigate('/')}
        style={{
          padding: '10px 15px',
          borderRadius: '10px',
          border: '2px solid #66ABE0',
          backgroundColor: 'white',
          color: '#66ABE0',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '30px'
        }}
      >
        ⬅ Volver a Pokedex
      </button>

      <div style={{ backgroundColor: 'white', border: '2px solid #66ABE0', borderRadius: '20px', padding: '30px', maxWidth: '400px', margin: '0 auto', boxShadow: '0px 4px 10px rgba(0,0,0,0.05)' }}>
        <p style={{ color: '#66ABE0', fontSize: '20px', fontWeight: 'bold', margin: '0' }}>#{pokemon.id}</p>
        <img src={pokemon.image} alt={pokemon.name} style={{ width: '180px', height: '180px' }} />
        <h1 style={{ color: '#66ABE0', textTransform: 'capitalize', margin: '10px 0' }}>{pokemon.name}</h1>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '25px' }}>
          {pokemon.types.map((type) => (
            <span key={type} style={{ backgroundColor: '#FFF5F8', color: '#66ABE0', padding: '5px 12px', borderRadius: '10px', fontSize: '14px', textTransform: 'capitalize', border: '1px solid #EEBDD6', fontWeight: 'bold' }}>
              {type}
            </span>
          ))}
        </div>

        <h3 style={{ color: '#66ABE0', marginBottom: '10px' }}>Estadisticas Base</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {labelStats.map((label, index) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 10px', backgroundColor: '#FFF5F8', borderRadius: '8px', border: '1px solid #EFEFEF' }}>
              <span style={{ color: '#66ABE0', fontWeight: 'bold' }}>{label}:</span>
              <span style={{ fontWeight: 'bold', color: '#333' }}>{pokemon.stats[index]}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};