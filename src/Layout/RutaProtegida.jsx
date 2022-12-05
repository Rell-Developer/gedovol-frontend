import React from 'react';
import Navegador from '../components/Navegador.jsx';
import Usuarios from '../paginas/privadas/Usuarios.jsx';


const RutaProtegida = () => {
    return (
        <>
            <main className='w-full flex'>
                <Navegador/>
                {/* <Outlet/> */}
                <Usuarios/>
            </main>
        </>
    )
}

export default RutaProtegida