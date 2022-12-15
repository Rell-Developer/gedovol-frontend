import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react'
// import './App.css'

// Context
import { AuthProvider } from './context/AuthProvider.jsx';
// import { UsuariosProvider } from './context/usuariosProvider.jsx';

// Paginas Públicas
import Login from './paginas/publicas/Login.jsx'
import Desarrolladores from './paginas/publicas/Desarrolladores.jsx'
import RutaProtegida from './Layout/RutaProtegida.jsx';
import ConfirmarCuenta from './paginas/publicas/ConfirmarCuenta.jsx';
import Error404 from './paginas/publicas/Error404.jsx';

// Paginas Privadas
import Usuarios from './paginas/privadas/Usuarios.jsx';
import Donantes from './paginas/privadas/Donantes.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <UsuariosProvider> */}
            {/* Rutas Publicas  */}
            <Routes>
              <Route path="/">
                <Route index element={<Login/>}/>
                <Route path="desarrolladores" element={<Desarrolladores/>}/>
                <Route path='confirmar/:token' element={<ConfirmarCuenta/>}/>
                <Route path='*' element={<Error404/>}/>
              </Route>

              <Route path='/admin' element={<RutaProtegida/>}>
                <Route index element={<Donantes/>}/>
                <Route path='usuarios' element={<Usuarios/>}/>
              </Route>
            </Routes>
          {/* </UsuariosProvider> */}
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
