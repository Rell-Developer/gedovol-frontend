import React from 'react'
import { useState } from 'react';
import clienteAxios from '../config/axios.jsx';

// Compontentes
import Alerta from './Alerta.jsx';

// Hooks
import useUsuarios from '../hooks/useUsuarios.jsx';

const UsuarioModal = () => {

    // UseStates
    const [usuario, setUsuario] = useState('');
    const [cedula, setCedula] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');

    // Componente Alerta
    const [alerta, setAlerta] = useState({});

    // Hooks
    // const {guardarUsuario} = useUsuarios();

    // Funcion para cerrar el modal
    const cerrarModal = () =>{

        // Variables
        const modal = document.querySelector('#custom-modal');

        // Estableciendo valores nulos a los campos
        setUsuario('');
        setCedula('');
        setPassword('');
        setRol('');

        // Intercambiando las clases
        modal.classList.remove('mostrar-modal');
        modal.classList.add('cerrar-modal');
    }

    // Funcion para el formulario
    const handleSubmit = async(e) =>{
        // Preeviene la accion por defecto
        e.preventDefault();

        
        // const mensaje = document.querySelector('#alerta-div');

        // Verificacion de los campos vacios
        if(usuario === '' || cedula === '' || password === '' || rol === ''){            
            // Establece el valor del mensaje de alerta
            setAlerta({msg: 'Todos los campos son obligatorios', error: true});

            // Establece el tiempo de duracion para quitar el mensaje
            setTimeout(() => setAlerta({}), 2500);

            // Retorno para no ejecutar más el codigo
            return
        }

        // Verificacion del tamaño de la contraseña
        if(password.length < 6){
            // Establece el valor del mensaje de alerta
            setAlerta({msg:"La contraseña debe tener más de 6 caracteres", error: true});
            
            // Establece el tiempo de duracion para quitar el mensaje
            setTimeout(() => setAlerta({}), 2500);

            // Retorno para no ejecutar más el codigo
            return
        }

        // Guardando al usuario
        // Con hooks
        // guardarUsuario({usuario, cedula, password, rol});
        
        // Sin hooks
        try {
            
            // Peticion http
            let {data} = await clienteAxios.post('/usuario/registrar-usuario', {usuario, cedula, password, rol});

            // console.log('resultado');
            // console.log(resultado);    

            if(data.error){
                setAlerta({error:true, msg: data.message});
            }else{
                setAlerta({msg: data.message});
            }

            setTimeout(() => setAlerta({}), 3000);
        } catch (error) {
            console.log(error.message);
        }
    }

    // Declaracion del mensaje
    const {msg} = alerta;

    return (
        <>
            {msg && <Alerta alerta={alerta}/>}
            <div id="custom-modal" className="flex justify-center w-full cerrar-modal translate-all">
                <div className="absolute w-2/5 bg-color2 flex justify-self-center p-10 rounded-lg shadow-2xl">
                    {/* Formulario */}
                    <div className='w-full'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="text-center">
                                    <h2 className='font-bold text-2xl text-white'>
                                        Registrar un Usuario
                                    </h2>
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                        <svg className="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                        Usuario
                                    </label>
                                    <input 
                                        className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                        placeholder='Ingrese su usuario' 
                                        type="text" 
                                        autoComplete='off'
                                        value={usuario}
                                        onChange={e => setUsuario(e.target.value)}
                                        />
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                        {/* <svg className="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg> */}
                                        <svg class="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                        Cedula
                                    </label>
                                    <input 
                                        className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                        placeholder='Ingrese su Cedula. Ejemplo: 20123456' 
                                        type="number" 
                                        autoComplete='off'
                                        min="1"
                                        value={cedula}
                                        onChange={e => setCedula(e.target.value)}
                                        />
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                        <svg className="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                        Contraseña
                                    </label>
                                    <input 
                                        className='bg-white p-1 rounded-lg text-sm border-4 border-gray-200' 
                                        placeholder='Ingrese su contraseña'
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        />
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                        {/* <svg className="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg> */}
                                        <svg class="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                                        Rol
                                    </label>
                                    <select name="" id="" className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' value={rol} onChange={e => setRol(e.target.value)}>
                                        <option value="" className="text-gray-500">Seleccione un Rol</option>
                                        <option value="administrador">Administrador</option>
                                        <option value="secretario">Secretario</option>
                                        <option value="visitante">Visitante</option>
                                    </select>
                                </div>
                            </div>

                            <div className='w-full mt-5 flex justify-between'>
                                <input 
                                    type="button" 
                                    value="Cancelar" 
                                    className='w-1/4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all' 
                                    onClick={cerrarModal}/>
                                <input 
                                    type="submit" 
                                    value="Guardar" 
                                    className='w-1/4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all'
                                    />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsuarioModal