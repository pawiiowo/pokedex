import { useEffect, useState } from 'react';
import { getPokemons } from '../services/pokemonService';
import type { Pokemon } from '../types/pokemon';
import { useNavigate } from 'react-router-dom'; // import para regresar a la lista principal

export const PokemonCompare = () => {
  const navigate = useNavigate();
  const [list, setList] = useState<Pokemon[]>([]);
  
  // states para guardar el nombre de los dos pokemon en los menus
  const [pokemonA, setPokemonA] = useState<string>('');
  const [pokemonB, setPokemonB] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    getPokemons()
      .then(setList)
      .then(() => setLoading(false)); // apaga el loading cuando carguen todos 
  }, []);

  // buscar los objetos de la lista para poder pintarlos y obtener los datos
  const dataA = list.find(p => p.name.toLowerCase() === pokemonA.toLowerCase());
  const dataB = list.find(p => p.name.toLowerCase() === pokemonB.toLowerCase());

  const labels = ['Vida (HP)', 'Ataque', 'Defensa', 'Velocidad'];

  if (loading) {
    return (
      <div style={{ padding: '40px', fontFamily: 'Comic Sans MS', backgroundColor: '#EEBDD6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2 style={{ color: '#66ABE0' }}>Cargando...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'Comic Sans MS', backgroundColor: '#EEBDD6', minHeight: '100vh' }}>
      
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
          marginBottom: '20px'
        }}
      >
        Volver a la Pokedex
      </button>

      <h1 style={{ color: '#66ABE0', textAlign: 'center', marginBottom: '40px' }}> Comparador de Pokemon </h1>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
        
        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '15px', border: '2px solid #66ABE0', width: '200px' }}>
          <select 
            value={pokemonA} 
            onChange={(e) => setPokemonA(e.target.value)}
            style={{ padding: '10px', borderRadius: '10px', border: '2px solid #66ABE0', width: '100%', textTransform: 'capitalize' }}
          >
            <option value="">Elegir Pokemon A</option>
            {list.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          {dataA && <img src={dataA.image} alt={dataA.name} style={{ width: '120px', height: '120px', marginTop: '15px' }} />}
        </div>

        <div style={{ fontSize: '30px', color: '#66ABE0', fontWeight: 'bold' }}>VS</div>

        <div style={{ textAlign: 'center', backgroundColor: 'white', padding: '20px', borderRadius: '15px', border: '2px solid #66ABE0', width: '200px' }}>
          <select 
            value={pokemonB} 
            onChange={(e) => setPokemonB(e.target.value)}
            style={{ padding: '10px', borderRadius: '10px', border: '2px solid #66ABE0', width: '100%', textTransform: 'capitalize' }}
          >
            <option value="">Elegir Pokemon B</option>
            {list.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          {dataB && <img src={dataB.image} alt={dataB.name} style={{ width: '120px', height: '120px', marginTop: '15px' }} />}
        </div>

      </div>

      {dataA && dataA.stats && dataB && dataB.stats ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <table style={{ backgroundColor: 'white', borderRadius: '15px', borderCollapse: 'separate', borderSpacing: '0', border: '2px solid #66ABE0', width: '100%', maxWidth: '500px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ backgroundColor: '#66ABE0', color: 'white' }}>
                <th style={{ padding: '12px', textTransform: 'capitalize' }}>{dataA.name}</th>
                <th style={{ padding: '12px' }}>Estadistica</th>
                <th style={{ padding: '12px', textTransform: 'capitalize' }}>{dataB.name}</th>
              </tr>
            </thead>
            <tbody>
              {labels.map((label, index) => {
                const valA = dataA.stats[index];
                const valB = dataB.stats[index];

                const colorA = valA > valB ? '#D4EDDA' : 'white';
                const colorB = valB > valA ? '#D4EDDA' : 'white';
                const weightA = valA > valB ? 'bold' : 'normal';
                const weightB = valB > valA ? 'bold' : 'normal';

                return (
                  <tr key={label} style={{ textAlign: 'center' }}>
                    <td style={{ padding: '12px', backgroundColor: colorA, fontWeight: weightA, borderBottom: '1px solid #EFEFEF' }}>{valA}</td>
                    <td style={{ padding: '12px', color: '#66ABE0', fontWeight: 'bold', borderBottom: '1px solid #EFEFEF', backgroundColor: '#FFF5F8' }}>{label}</td>
                    <td style={{ padding: '12px', backgroundColor: colorB, fontWeight: weightB, borderBottom: '1px solid #EFEFEF' }}>{valB}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: '#66ABE0', fontSize: '18px', fontWeight: 'bold' }}>
          Por favor selecciona ambos Pokemon para comenzar la comparacion.
        </div>
      )}

    </div>
  );
};