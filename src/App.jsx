import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react'
// import './App.css'

// Paginas Públicas
import Login from './paginas/publicas/Login.jsx'
import Desarrolladores from './paginas/publicas/Desarrolladores.jsx'
import RutaProtegida from './Layout/RutaProtegida.jsx';
import Error404 from './paginas/publicas/Error404.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        {/* Rutas Publicas  */}
        <Routes>
          <Route path="/">
            <Route index element={<Login/>}/>
            <Route path="/desarrolladores" element={<Desarrolladores/>}/>
            <Route path='/admin/usuarios' element={<RutaProtegida/>}/>
            <Route path='*' element={<Error404/>}/>
          </Route>

          {/* <Route path='/admin'>
            <Route/>
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
