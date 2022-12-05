import React from 'react';
import Navegador from '../components/Navegador.jsx';
import Usuarios from '../paginas/privadas/Usuarios.jsx';
import Footer from '../components/Footer.jsx';

const RutaProtegida = () => {
    return (
        <>
            <main className='w-full flex'>
                <Navegador/>
                {/* <Outlet/> */}
                <div className='flex flex-col w-full bg-white'>
                    <div style={{height: "90vh"}}>
                        <Usuarios/>
                    </div>
                    <div style={{height: "10vh"}}>
                        <Footer/>   
                    </div>
                </div>
            </main>
        </>
    )
}

export default RutaProtegida