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
import OlvidePassword from './paginas/publicas/OlvidePassword.jsx';
import RecuperarPassword from './paginas/publicas/RecuperarPassword.jsx';
import Error404 from './paginas/publicas/Error404.jsx';

// Paginas Privadas
import Usuarios from './paginas/privadas/Usuarios.jsx';
import Donantes from './paginas/privadas/Donantes.jsx';
import Perfil from './paginas/privadas/Perfil.jsx';
import Notificaciones from './paginas/privadas/Notificaciones.jsx';
import Formularios from './paginas/privadas/Formularios.jsx';
import NewForm from './paginas/privadas/NewForm.jsx';
import VerFormulario from './paginas/privadas/formularios/VerFormulario.jsx';

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
                <Route path="olvide-password" element={<OlvidePassword/>}/>
                <Route path="recuperar-password/:token" element={<RecuperarPassword/>}/>
                <Route path='*' element={<Error404/>}/>
              </Route>

              <Route path='/admin' element={<RutaProtegida/>}>
                <Route index element={<Donantes/>}/>
                <Route path="formularios" element={<Formularios/>}/>
                <Route path='nuevo-formulario' element={<NewForm/>}/>
                <Route path='ver-formulario/:id' element={<VerFormulario/>}/>
                <Route path='usuarios' element={<Usuarios/>}/>
                <Route path='perfil' element={<Perfil/>}/>
                <Route path='notificaciones' element={<Notificaciones/>}/>
              </Route>
            </Routes>
          {/* </UsuariosProvider> */}
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
