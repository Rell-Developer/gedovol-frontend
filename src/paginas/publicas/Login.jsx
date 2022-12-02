import React from 'react'
import { useState } from 'react';

// Componentes
import Footer from '../../components/Footer';
import Alerta from '../../components/Alerta';

const Login = () => {

    // Variables y UseStates
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    
    // Mensaje de Alerta
    const {msg} = alerta

    // Funciones
    const handleSubmit = (e) =>{
        // Preveniendo la accion del formulario
        e.preventDefault();

        // Validacion
        if(usuario === '' || password === ''){
            setAlerta({msg:'Todos los campos son obligatorios', error: true});
            return
        }

        // Validacion de la contraseña
        if(password.length < 6){
            setAlerta({msg:'La contraseña debe tener más de 6 caracteres', error: true});
            return
        }

        // Pasa la validacion
        console.log('Buscando en la base de datos');
    }

    // Retorno de Contenido
    return (
        <>
            {/* Aparece el mensaje */}
            {msg && <Alerta alerta={alerta}/>}

            <div className='flex justify-between flex-col'>
                {/* Encabezado */}
                <header className='w-full flex justify-center bg-color2 h-24 shadow-lg'>
                    <div className='flex items-center'>
                        <img src="/img/logo-blanco.png" alt="logo" className="w-1/6"/>
                        <h2 className='mx-2 text-white font-bold text-4xl'>
                            GEDOVOL
                        </h2>
                    </div>
                </header>

                {/* Contenedor */}
                <main className='w-full h-full bg-color1 flex justify-center items-center my-5'> 
                    <div className='bg-color2 w-1/3 p-14 py-20 m-10 rounded-lg shadow-lg'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="text-center">
                                    <h2 className='font-bold text-4xl text-white'>
                                        Bienvenido
                                    </h2>
                                </div>

                                <div className='flex flex-col py-5'>
                                    <label htmlFor="" className='text-white font-bold text-xl py-2 flex items-center'>
                                        <svg className="w-8 h-8 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                        Usuario
                                    </label>
                                    <input 
                                        className='bg-white p-2 rounded-lg border-4 border-gray-200' 
                                        placeholder='Ingrese su usuario' 
                                        type="text" 
                                        autoComplete='off'
                                        value={usuario}
                                        onChange={e => setUsuario(e.target.value)}
                                        />
                                </div>

                                <div className='flex flex-col py-5'>
                                    <label htmlFor="" className='text-white font-bold text-xl py-2 flex items-center'>
                                        <svg className="w-8 h-8 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                        Contraseña
                                    </label>
                                    <input 
                                        className='bg-white p-2 rounded-lg border-4 border-gray-200' 
                                        placeholder='Ingrese su contraseña'
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        />
                                </div>
                            </div>

                            <div className='w-full mt-5 flex justify-center'>
                                <input type="submit" value="Ingresar" className='w-3/4 bg-color4 text-white py-4 rounded-lg font-bold cursor-pointer'/>
                            </div>
                        </form>
                    </div>
                </main>
                
                {/* Creditos  */}
                <Footer/>
            </div>
        </>
    )
}

export default Login