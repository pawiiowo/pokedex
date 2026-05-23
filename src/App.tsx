import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PokemonList } from './pages/PokemonList';
import { PokemonDetail } from './pages/PokemonDetail';
import { PokemonCompare } from './pages/PokemonCompare'; // importamos la nueva pantalla del comparador

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ruta raiz para ver la pokedex principal */}
        <Route path="/" element={<PokemonList />} />
        
        {/* ruta para ver el detalle de un pokemon por su nombre */}
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        
        {/* ruta exacta para el comparador de pokemon que hacia falta */}
        <Route path="/compare" element={<PokemonCompare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;