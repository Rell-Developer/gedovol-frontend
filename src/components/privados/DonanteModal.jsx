import React from 'react'
import { useState } from 'react';
import clienteAxios from '../../config/axios.jsx';

// Compontentes
import Alerta from '../publicos/Alerta.jsx';

// Hooks
import useUsuarios from '../../hooks/useUsuarios.jsx';

const DonanteModal = (donantes) => {

    // UseStates


    // Componente Alerta
  

    // Hooks
    // const {guardarUsuario} = useUsuarios();

    // Funcion para cerrar el modal
    const cerrarModal = () =>{

        // Variables
        const modal = document.querySelector('#custom-modal');

        // Estableciendo valores nulos a los campos

        // Intercambiando las clases
        modal.classList.remove('mostrar-modal');
        modal.classList.add('cerrar-modal');
    }

    // Funcion para el formulario
    const handleSubmit = (e) =>{
        // Preeviene la accion por defecto
        e.preventDefault();

        
        // const mensaje = document.querySelector('#alerta-div');

        // Verificacion de los campos vacios
     
     

        // Guardando al usuario
        // Con hooks
        // guardarUsuario({usuario, cedula, password, rol});
        
    }

    // Declaracion del mensaje
    return (
        <>
           {/*  {msg && <Alerta alerta={alerta}/>} */}
            <div id="custom-modal" className="flex justify-center w-full cerrar-modal translate-all ">
                <div className="absolute w-2/3 bg-color2 flex justify-self-center p-5 rounded-lg shadow-2xl">
                    {/* Formulario */}
                    <div className='w-full'>
                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                {/* Contenedor 1 */}
                                <div >
                                <div>
                                    <div className="text-center">
                                        <h2 className='font-bold text-2xl text-white'>
                                            Registrar un Donante
                                        </h2>
                                    </div>

                                    {/* Primera seccion */}
                                    <div className='flex mt-2 p-2 '>
                                        <div className='flex flex-col py-2'>
                                            <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                                Nombre
                                            </label>
                                            <input 
                                                className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                                placeholder='ej. Luis' 
                                                type="text" 
                                                autoComplete='off'
                                               
                                              
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
                                                
                                               
                                                />
                                        </div>
                                </div>

                                {/* Borde NO TOCAR */}
                                <div className='w-2/8 border-b-2'></div>

                                <div className='flex mt-1 p-2 justify-between'>
                                    <div className='flex flex-col py-2 ml-5'>
                                                <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                                    Tipo de Sangre
                                                </label>
                                                <div>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        A+
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        B+
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        AB+
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        O+
                                                    </label> 
                                                    <div className='flex py-2 justify-between'>
                                                    <div>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        A-
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        B-
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        AB-
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        O-
                                                    </label>
                                                    </div>
                                                    
                                                    </div>
                                                </div>  

                                    </div> 

                                    <div className='flex flex-col py-2 ml-5'>
                                                <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                                    Ha Donado Sangre Ultimamente?
                                                </label>
                                                <div>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        Si
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white items-center'>
                                                        No
                                                    </label>

                                                    <input 
                                                className='bg-white p-0 text-sm w-6 ml-5 rounded-lg border-4 border-gray-200'
                                                type="date" 
                                                name="bday" 
                                                required pattern="\d{4}-\d{2}-\d{2}" 

                                                />
                                                </div>
                                    </div>

                                    <div className='flex flex-col py-2 ml-8'>
                                                <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                                    Estado
                                                </label>
                                                <div>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-3 items-center'>
                                                        Acto
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white items-center'>
                                                        No Acto
                                                    </label>
                                                </div>
                                    </div>
                                </div>

                                <div className='flex mt-0 p-2 justify-between'>
                                    <div className='flex flex-col py-2 ml-5'>
                                                <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                                    Se Ha Tatuado en los Ultimos 6 Meses?
                                                </label>
                                                <div>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        Si
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white items-center'>
                                                        No
                                                <input 
                                                className='bg-white p-0 text-sm w-6 ml-5 rounded-lg border-4 border-gray-200'
                                                type="date" 
                                                name="bday" 
                                                />
        

                                                    </label>
                                                </div>
                                    </div>
                                        
                                        <div className=' flex flex-col py-2 ml-5'>
                                            <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                                Ha Tenido Alguna Enfermedad Veneria
                                            </label>
                                            <div>
                                            <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white mr-2 items-center'>
                                                        Si
                                                    </label>
                                                    <input type="radio" value="Male" name="gender" /> <label htmlFor="" className='text-white items-center'>
                                                        No
                                                    </label>

                                            <input 
                                                className='bg-white p-1 text-sm rounded-lg ml-5 border-4 border-gray-200' 
                                                placeholder='Cual Emfermedad' 
                                                type="text" 
                                                autoComplete='off'

                                               
                                                />
                                            </div>
                                        </div>
                                </div>
                              
                            </div>

                            </div>
                         

                            <div className='w-full mt-5 flex justify-between'>
                                <input 
                                    type="button" 
                                    value="Cancelar" 
                                    className='w-2/8 p-4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all' 
                                    onClick={cerrarModal}/>
                                <input 
                                    type="submit" 
                                    value="Guardar" 
                                    className='w-2/8 p-4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all'
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