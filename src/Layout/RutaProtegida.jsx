import React from 'react';
import Navegador from '../components/Navegador.jsx';
import Usuarios from '../paginas/privadas/Usuarios.jsx';
import Footer from '../components/Footer.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const RutaProtegida = () => {

    // Declaracion del navegador
    const navigate = useNavigate();

    // useEffect(()=> authSesion(), []);

    const authSesion = () =>{
        // Consulta del token
        let data = JSON.parse(localStorage.getItem('data'));
            
        // Verificacion si existe el token, encaso de que no, lo regresa al login
        if(!data.token){
            navigate('/');
        }
    }

    // Retorno HTML
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