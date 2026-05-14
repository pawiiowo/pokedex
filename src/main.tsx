import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // import para usar BrowserRouter, permite a la app leer la URL del browser
import App from './App'
import './index.css'

// funciona como el punto de entrada de la aplicacion, donde se monta el componente App dentro del DOM
// se envuelve con BrowserRouter para que toda la app pueda usar la navegación entre paginas
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)