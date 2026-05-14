import { Routes, Route } from 'react-router-dom';
import { PokemonList } from './pages/PokemonList';
import { PokemonDetail } from './pages/PokemonDetail';

function App() {
  return (
    <Routes>
      {/* cuando la dirección sea la principal, carga la lista*/}
      <Route path="/" element={<PokemonList />} />
      
      {/* cuando la dirección tenga un nombre de pokemon, carga la pantalla de detalle */}
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  );
}

export default App;