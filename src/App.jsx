import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import './App.css'

// Paginas Públicas
import Login from './paginas/publicas/Login.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
    </>
  )
}

export default App
