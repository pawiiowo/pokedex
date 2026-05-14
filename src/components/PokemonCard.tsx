import type { Pokemon } from '../types/pokemon';

// se define que necesita el componente para funcionar
interface Props {
  pokemon: Pokemon;
  esFavorito: boolean;
}

// card que muestra el nombre y la imagen del pokémon
export const PokemonCard = ({ pokemon, esFavorito }: Props) => {
  return (
    <div style={{ 
      padding: '15px', 
      border: esFavorito ? '4px solid #fce45d' : '2px solid #7d85c6', 
      borderRadius: '10px',
      textAlign: 'center',
      background: esFavorito ? '#F9F0AA' : '#8D93C8',
      fontWeight: 'bold',
      position: 'relative',
      fontFamily: 'Comic Sans MS'
    }}>
      {esFavorito && (
        <span style={{
          position: 'absolute', top: '-10px', right: '-10px',
          background: '#ffffff', color: '#000000', fontSize: '10px',
          padding: '2px 8px', borderRadius: '10px', border: '1px solid #ffffff'
        }}>
          mi favorito (de estos 20)
        </span>
      )}
      <img 
        src={pokemon.image} 
        alt={pokemon.name} 
        style={{ width: '100px', height: '100px', display: 'block', margin: '0 auto 10px' }} 
      />
      
      {pokemon.name}
    </div>
  );
}