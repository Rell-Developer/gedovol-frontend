import React, { useState, useEffect } from 'react'
import clienteAxios from '../../../config/axios';
import NotificationCard from './NotificationCard';

import {Link} from 'react-router-dom'

const ModalNotificaciones = () => {


    // useStates
    const [todosBtn, setTodosBtn] = useState(true);
    const [leidosBtn, setLeidosBtn] = useState(false);
    const [noLeidosBtn, setNoLeidosBtn] = useState(false);

    const [dataNotificaciones, setDataNotificaciones] = useState([]);


    useEffect(() => {
        busquedaNotificaciones();
        estilosBtnDinamicos();
    }, [todosBtn, leidosBtn, noLeidosBtn]);
    
    const estilosBtnDinamicos = () =>{

        let btnTodos = document.querySelector('#todosBtn');
        let btnLeidos = document.querySelector('#leidosBtn');
        let btnNoLeidos = document.querySelector('#noLeidosBtn');

        let botones = [btnTodos, btnLeidos, btnNoLeidos];

        let tarjetas = document.querySelectorAll('.notification-card');

        
        if(todosBtn){
            
            botones.forEach( btn => {
                btn.classList.remove('bg-color3');
                btn.classList.remove('text-white');
                btn.classList.remove('font-bold');
            });

            btnTodos.classList.add('bg-color3');
            btnTodos.classList.add('text-white');
            btnTodos.classList.add('font-bold');

            for(let i = 0; i < tarjetas.length; i++){
                tarjetas[i].classList.remove('hidden');
            }
        }

        if(leidosBtn){
            
            
            botones.forEach( btn => {
                btn.classList.remove('bg-color3');
                btn.classList.remove('text-white');
                btn.classList.remove('font-bold');
            });
            
            btnLeidos.classList.add('bg-color3');
            btnLeidos.classList.add('text-white');
            btnLeidos.classList.add('font-bold');

            
            for(let i = 0; i < tarjetas.length; i++){
                if(tarjetas[i].getAttribute('data-leido') !== 'Leido'){
                    tarjetas[i].classList.add('hidden');
                }else{
                    tarjetas[i].classList.remove('hidden');
                }
            }
        }

        if(noLeidosBtn){
            
            botones.forEach( btn => {
                btn.classList.remove('bg-color3');
                btn.classList.remove('text-white');
                btn.classList.remove('font-bold');
            });
            
            btnNoLeidos.classList.add('bg-color3');
            btnNoLeidos.classList.add('text-white');
            btnNoLeidos.classList.add('font-bold');
            
            
            for(let i = 0; i < tarjetas.length; i++){
                if(tarjetas[i].getAttribute('data-leido') !== 'No-Leido'){
                    tarjetas[i].classList.add('hidden');
                }else{
                    tarjetas[i].classList.remove('hidden');
                }
            }
        }

        
    }

    const busquedaNotificaciones = async() =>{

        let contenedor = document.querySelector('#contenedor-notificaciones');

        console.log('actualizando notificaciones')
        console.log(contenedor)
        if(contenedor){
            // while(contenedor.firstChild){
            //     contenedor.removeChild(contenedor.firstChild);
            // }

            let {data} = await clienteAxios('/notificacion/obtener-notificaciones', {limite: 6});

            setDataNotificaciones(data);
        }
    }
    
    return (
        <>
            <div id="modal-notificaciones" className='bg-white p-5 border rounded-lg shadow-xl w-2/5 transition-all h-96 opacity-100'>
                <h2 className='text-center text-2xl font-bold mb-5'>
                    Notificaciones
                </h2>

                {/* Botones */}
                <div className="flex justify-evenly my-3">
                    <div 
                        id="todosBtn" 
                        className='bg-color1 active:bg-color2 active:text-white active:font-bold cursor-pointer py-1 px-3 rounded-xl shadow transition-all'
                        onClick={()=>{
                            setTodosBtn(true);
                            setLeidosBtn(false);
                            setNoLeidosBtn(false);
                        }}
                    >
                        Todos
                    </div>
                    <div 
                        id="leidosBtn" 
                        className='bg-color1 active:bg-color2 active:text-white active:font-bold cursor-pointer py-1 px-3 rounded-xl shadow transition-all'
                        onClick={()=>{
                            setTodosBtn(false);
                            setLeidosBtn(true);
                            setNoLeidosBtn(false);
                        }}    
                    >
                        Leidos
                    </div>
                    <div 
                        id="noLeidosBtn" 
                        className='bg-color1 active:bg-color2 active:text-white active:font-bold cursor-pointer py-1 px-3 rounded-xl shadow transition-all'
                        onClick={()=>{
                            setTodosBtn(false);
                            setLeidosBtn(false);
                            setNoLeidosBtn(true);
                        }}    
                    >
                        No Leidos
                    </div>
                </div>

                <hr className='mb-2'/>

                {/* Contenedor de notificaciones */}
                <div id="contenedor-notificaciones" className='w-full px-2 overflow-scroll h-full'>
                    { dataNotificaciones.length ?

                        (
                            <>
                                { dataNotificaciones.map( notificacion => (
                                    <Link
                                        to="/admin/notificaciones"
                                    >
                                        <NotificationCard 
                                            key={notificacion.id}
                                            notificacion={notificacion}
                                        />
                                    </Link>
                                ))}
                            </>
                        ):
                        (
                            <>
                                <h2 className="text-center font-bold text-2xl">
                                    No hay notificaciones recientes
                                </h2>
                            </>

                        )
                    
                    }
                    {/* <div className="flex px-3 py-4 bg-color1 items-center rounded-md border shadow cursor-pointer transition-all hover:bg-red-200 active:bg-red-300 my-2">
                        <div className='from-red-400 to-red-700 bg-gradient-to-br rounded-full p-2'>
                            <svg className="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                        </div>

                        <div className='flex'>
                            <div className='flex justify-center'>
                                <svg className="w-8 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                </svg>
                            </div>

                            <div>
                                <p>
                                    Roque ha creado un nuevo usuario con rol Administrador
                                </p>
                                <p className='text-sm text-gray-500 font-bold'>
                                    2022-12-29
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex px-3 py-4 bg-color1 items-center rounded-md border shadow cursor-pointer transition-all hover:bg-red-200 active:bg-red-300 my-2">
                        <div className='from-red-400 to-red-700 bg-gradient-to-br rounded-full p-2'>
                            <svg className="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                        </div>

                        <div className='flex'>
                            <div className='flex justify-center'>
                                <svg className="w-8 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                </svg>
                            </div>

                            <div>
                                <p>
                                    Roque ha creado un nuevo usuario con rol Administrador
                                </p>
                                <p className='text-sm text-gray-500 font-bold'>
                                    2022-12-29
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex px-3 py-4 bg-color1 items-center rounded-md border shadow cursor-pointer transition-all hover:bg-red-200 active:bg-red-300 my-2">
                        <div className='from-red-400 to-red-700 bg-gradient-to-br rounded-full p-2'>
                            <svg className="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                        </div>

                        <div className='flex'>
                            <div className='flex justify-center'>
                                <svg className="w-8 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                </svg>
                            </div>

                            <div>
                                <p>
                                    Roque ha creado un nuevo usuario con rol Administrador
                                </p>
                                <p className='text-sm text-gray-500 font-bold'>
                                    2022-12-29
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex px-3 py-4 bg-color1 items-center rounded-md border shadow cursor-pointer transition-all hover:bg-red-200 active:bg-red-300 my-2">
                        <div className='from-red-400 to-red-700 bg-gradient-to-br rounded-full p-2'>
                            <svg className="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                        </div>

                        <div className='flex'>
                            <div className='flex justify-center'>
                                <svg className="w-8 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                </svg>
                            </div>

                            <div>
                                <p>
                                    Roque ha creado un nuevo usuario con rol Administrador
                                </p>
                                <p className='text-sm text-gray-500 font-bold'>
                                    2022-12-29
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex px-3 py-4 bg-color1 items-center rounded-md border shadow cursor-pointer transition-all hover:bg-red-200 active:bg-red-300 my-2">
                        <div className='from-red-400 to-red-700 bg-gradient-to-br rounded-full p-2'>
                            <svg className="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                        </div>

                        <div className='flex'>
                            <div className='flex justify-center'>
                                <svg className="w-8 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                </svg>
                            </div>

                            <div>
                                <p>
                                    Roque ha creado un nuevo usuario con rol Administrador
                                </p>
                                <p className='text-sm text-gray-500 font-bold'>
                                    2022-12-29
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex px-3 py-4 bg-color1 items-center rounded-md border shadow cursor-pointer transition-all hover:bg-red-200 active:bg-red-300 my-2">
                        <div className='from-red-400 to-red-700 bg-gradient-to-br rounded-full p-2'>
                            <svg className="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                            </svg>
                        </div>

                        <div className='flex'>
                            <div className='flex justify-center'>
                                <svg className="w-8 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                </svg>
                            </div>

                            <div>
                                <p>
                                    Roque ha creado un nuevo usuario con rol Administrador
                                </p>
                                <p className='text-sm text-gray-500 font-bold'>
                                    2022-12-29
                                </p>
                            </div>
                        </div>
                </div>*/}

                    <Link
                        to="/admin/notificaciones"
                    >
                        <div className='text-center flex justify-center my-4 '>
                            <h2 className="font-bold cursor-pointer transition-all text-sm">
                                Ver todas las notificaciones
                            </h2>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ModalNotificaciones