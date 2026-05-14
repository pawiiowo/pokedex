import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPokemonDetail } from '../services/pokemonService';

export const PokemonDetail = () => {
  const { name } = useParams(); // hook de react router, extrae el nombre del pokemon de la URL 
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    // cuando carga la pagina, se piden los datos de ese pokemon especifico
    if (name) {
      getPokemonDetail(name).then(setPokemon);
    }
  }, [name]);

  // mientras carga la API, se muestra un mensaje
  if (!pokemon) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Cargando datos...</div>;

  return (
    <div style={{ padding: '40px', fontFamily: 'Comic Sans MS', backgroundColor: '#EEBDD6', minHeight: '100vh', textAlign: 'center' }}>
      
      {/* button para regresar a la lista principal */}
      <button 
        onClick={() => navigate('/')} 
        style={{ marginBottom: '20px', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', border: 'none', backgroundColor: '#66ABE0', color: 'white', fontWeight: 'bold' }}
      >
        Volver al listado
      </button>
      
      <div style={{ background: 'white', padding: '30px', borderRadius: '20px', display: 'inline-block', border: '3px solid #66ABE0', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#66ABE0', textTransform: 'capitalize', fontSize: '32px' }}>{pokemon.name}</h1>
        
        <img src={pokemon.sprites.front_default} alt={pokemon.name} style={{ width: '200px', height: '200px' }} />
        
        <div style={{ textAlign: 'left', marginTop: '20px', color: '#333' }}>
          <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.map((a: any) => a.ability.name).join(', ')}</p>
          <p><strong>Tipos:</strong> {pokemon.types.map((t: any) => t.type.name).join(', ')}</p>
          
          <h3 style={{ borderBottom: '2px solid #EEBDD6', paddingBottom: '5px', marginTop: '20px' }}>Estadísticas Base:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pokemon.stats.map((s: any) => (
              <li key={s.stat.name} style={{ marginBottom: '5px' }}>
                <strong>{s.stat.name.toUpperCase()}:</strong> {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};