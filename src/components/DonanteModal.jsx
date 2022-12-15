import React from 'react'
import { useState } from 'react';
import clienteAxios from '../config/axios.jsx';

// Compontentes
import Alerta from './Alerta.jsx';

// Hooks
import useUsuarios from '../hooks/useUsuarios.jsx';

const DonanteModal = () => {

    // UseStates
    const [usuario, setUsuario] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
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
        setCorreo('');
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
        if(usuario === '' || cedula === '' || correo== '' || password === '' || rol === ''){            
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
            let {data} = await clienteAxios.post('/usuario/registrar-donante', {usuario, cedula, correo, password, rol});

            // console.log('resultado');
            // console.log(resultado);    

            if(data.error){
                setAlerta({error:true, msg: data.message});
            }else{

                // Estableciendo valores nulos a los campos
                // setUsuario('');
                // setCedula('');
                // setCorreo('');
                // setPassword('');
                // setRol('');

                // Mostrando mensaje
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
                <div className="absolute w-2/3 bg-color2 flex justify-self-center p-5 rounded-lg shadow-2xl">
                    {/* Formulario */}
                    <div className='w-full'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="text-center">
                                    <h2 className='font-bold text-2xl text-white'>
                                        Registrar un Donante
                                    </h2>
                                </div>

                                {/* Primera seccion */}
                                <div className='flex mt-2 p-2 '>
                                    <div className='flex flex-col py-2 ml-5'>
                                        <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                            Nombre
                                        </label>
                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                            placeholder='ej. Luis' 
                                            type="text" 
                                            autoComplete='off'
                                            value={usuario}
                                            
                                            />
                                    </div>

                                    <div className='flex flex-col py-2 ml-5'>
                                        <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                            Apellido
                                        </label>
                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                            placeholder='ej.Acosta' 
                                            type="text" 
                                            autoComplete='off'
                                            value={usuario}
                                            onChange={e => setUsuario(e.target.value)}
                                            />
                                    </div>

                                    <div className='flex flex-col py-2 ml-5'>
                                        <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                            Cedula
                                        </label>
                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                            placeholder='ej.12345678 ' 
                                            type="text" 
                                            autoComplete='off'
                                            value={usuario}
                                            onChange={e => setUsuario(e.target.value)}
                                            />
                                    </div>
                                    <div className='flex flex-col py-2 ml-5'>
                                        <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                            Telefono
                                        </label>
                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                            placeholder='ej.04243709647' 
                                            type="text" 
                                            autoComplete='off'
                                            value={usuario}
                                            onChange={e => setUsuario(e.target.value)}
                                            />
                                    </div>
                                   
                                </div>

                            </div>

                            <div className='flex mt-1 p-2 justify-between'>
                            <div className='flex flex-col py-2 ml-5'>
                                        <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                            Sexo
                                        </label>
                                        <div>
                                            <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                Masculino
                                            </label>
                                            <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white items-center'>
                                                Femenino
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className=' flex flex-col py-2 ml-5'>
                                        <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                            Correo
                                        </label>
                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                            placeholder='ej.ejemplo@ejemplo.com' 
                                            type="text" 
                                            autoComplete='off'
                                            value={usuario}
                                            onChange={e => setUsuario(e.target.value)}
                                            />
                                    </div>
                                    <div className='flex flex-col py-2 ml-5 w-2/5'>
                                        <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                            Dirección
                                        </label>
                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                            placeholder='ej.calle 5 casa 2' 
                                            type="text" 
                                            autoComplete='off'
                                            value={usuario}
                                            onChange={e => setUsuario(e.target.value)}
                                            />
                                    </div>
                            </div>

                            <div className='w-2/8 border-b-2'></div>

                            <div className='w-full mt-5 flex justify-between'>
                                <input 
                                    type="button" 
                                    value="Cancelar" 
                                    className='w-1/6 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all' 
                                    onClick={cerrarModal}/>
                                <input 
                                    type="submit" 
                                    value="Siguiente" 
                                    className='w-1/6 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all'
                                    />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DonanteModal