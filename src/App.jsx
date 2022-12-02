import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState } from 'react'
// import './App.css'

// Paginas Públicas
import Login from './paginas/publicas/Login.jsx'
import Desarrolladores from './paginas/publicas/Desarrolladores.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        {/* Rutas Publicas  */}
        <Routes>
          <Route path="/">
            <Route index element={<Login/>}/>
            <Route path="/desarrolladores" element={<Desarrolladores/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
