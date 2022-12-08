// Importaciones
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Componentes
import UsuarioModal from '../../components/UsuarioModal.jsx';
import Usuario from '../../components/Usuario.jsx';
import clienteAxios from '../../config/axios.jsx';

// Hooks
import useUsuarios from '../../hooks/useUsuarios.jsx';

const Usuarios = () => {

    // Arreglo de usuarios
    let users = [];

    // Usuarios
    // const {usuarios, guardarUsuario} = useUsuarios();

    // console.log(usuarios)

    // Declarando el navegador
    const navigate = useNavigate();

    useEffect(() =>{
        buscarUsuariosDB();
    },[])

    const buscarUsuariosDB = async() =>{

        try {
            let {data} = await clienteAxios('/usuario/obtener-usuarios');
            users = data;
            return data
        } catch (error) {
            console.log(error);
        }
    }

    const clickFila = (e) =>{
        console.log('Llegando');
        console.log(e);

        const modal = document.querySelector('#custom-modal');

        if(!modal.classList.contains('mostrar-modal')){
            let id = e.parentElement.getAttribute('data-id');
            navigate(`/admin/perfil/${id}`);
        }
    }

    const buscador = (buscarIndividual) =>{

        const modal = document.querySelector('#custom-modal');

        if(!modal.classList.contains('mostrar-modal')){
            // Variables
            const buscador = document.querySelector('#buscadorCedula');
            const cedulas = document.querySelectorAll('.campoCedula');
            const buscarTodos = document.querySelector('#buscar-todos');
            const sinResultados = document.querySelector('#sinResultados');
    
            let contador = 0;
            
            cedulas.forEach( cedula => {
                // console.log(cedula.parentElement);
                if(cedula.textContent !== buscador.value){
                    // cedula.parentElement.classList.remove('flex');
                    cedula.parentElement.classList.add('hidden');
                    contador += 1
                }
            })
    
            if(contador == 5){
                sinResultados.classList.remove('hidden');
                sinResultados.ClassList.add('flex');
            }
        }


        // buscarTodos.style="display:block";

        // console.log(cedulas);


        // console.log(buscador.value)
    }

    const aparecerTodos = () =>{

        const modal = document.querySelector('#custom-modal');

        if(!modal.classList.contains('mostrar-modal')){
            // Variables
            const buscador = document.querySelector('#buscadorCedula');
            const cedulas = document.querySelectorAll('.campoCedula');
            const buscarTodos = document.querySelector('#buscar-todos');
            const sinResultados = document.querySelector('#sinResultados');

            sinResultados.classList.add('hidden')

            cedulas.forEach( cedula => {
                console.log(cedula.parentElement);
                cedula.parentElement.classList.remove('hidden');
                // cedula.parentElement.classList.add('flex');
                if(cedula.textContent !== buscador.value){
                    // cedula.parentElement.classList.add('flex');
                }
            })

            buscarTodos.style="display:none;";
        }
    }

    const mostrarModal = () =>{

        const modal = document.querySelector('#custom-modal');

        modal.classList.remove('cerrar-modal');
        modal.classList.add('mostrar-modal');
    }

    const mostrarUsuarios = async() =>{

        const tablaUsuarios = document.querySelector('#body-table-usuarios');

        while(tablaUsuarios.firstChild){
            tablaUsuarios.removeChild(tablaUsuarios.firstChild);
        }

        let usuarios = await buscarUsuariosDB();
        console.log(usuarios);

        usuarios.forEach( datos => {

            
            let row = document.createElement('tr');
            row.classList.add('bg-gray-200');
            row.classList.add('hover:bg-gray-300');
            row.classList.add('cursor-pointer');
            row.setAttribute('data-id', datos.id);
            
            // console.log(datos);
            let contenido = document.createElement('div');
            row.innerHTML = `
                <td className='p-1 border-x border-y border-black'>
                    ${datos.usuario}
                </td>
                <td className='border-x border-y border-black campoCedula'>
                    ${datos.cedula}
                </td>
                <td className='border-x border-y border-black'>
                    ${datos.rol}
                </td>
            `

            row.appendChild(contenido);
            tablaUsuarios.appendChild(row);
            // console.log('agregando');
        })
    }

    return (
        <>
            <div className='w-full flex flex-col bg-white'>
                <UsuarioModal/>
                {/* Contenedor Superior */}
                <div className='w-full flex justify-evenly py-5 my-5'>
                    {/* Titulo */}
                    <div className="text-center font-bold text-color2">
                        <h2 className='text-4xl font-bold'>
                            GEDOVOL    
                        </h2>    
                        <p>
                            USUARIOS
                        </p>
                    </div> 

                    {/* Buscador */}
                    <div className='flex items-center justify-between'>
                        <input 
                            id="buscadorCedula"
                            type="number" 
                            min="1" 
                            placeholder='Buscar por Cedula' 
                            className='block bg-white shadow w-full rounded-xl border-2 border-gray-400 p-3 pl-4 pr-12 sm:text-sm'/>
                        
                        <input 
                            type="button" 
                            value="Buscar" 
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all' 
                            onClick={buscador}/>

                        <input 
                            type="button" 
                            value="Nuevo Usuario" 
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all'
                            onClick={mostrarModal}
                            />

                            
                        <input 
                            type="button" 
                            value="Mostrar Todos los Usuarios"
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all'
                            onClick={mostrarUsuarios}
                            />
                    </div>

                </div>

                {/* Contenedor Medio */}
                <div className='w-full flex'>
                    {/* Tipo de Vista */}
                    <div className='w-1/6 flex flex-col items-center content-center'>
                        {/* titulo */}
                        <div>
                            <h3 className='text-2xl font-bold'>
                                Tipo de Vista
                            </h3>
                        </div>

                        {/* Tipo de Vista */}
                        <div className='py-1 my-1 ml-5 w-5/6'>
                            <div className='flex justify-start flex-col'>
                                <div>
                                    <input type="radio" name="tipoVista" id="tableRadio"  />
                                    <label htmlFor="tableRadio"> Tabla</label>
                                </div>
                                <div>
                                    <input type="radio" name="tipoVista" id="cardsRadio" />
                                    <label htmlFor="cardsRadio"> Tarjetas</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="w-5/6">
                        <table className='bg-color3 m-5 w-5/6 rounded shadow-lg border-black border-x border-y'>
                            <thead className='p-4 text-white'>
                                <tr>
                                    <th className='p-4 border-x border-black'>
                                        Usuario
                                    </th>
                                    <th className='p-4 border-x border-black'>
                                        Cedula
                                    </th>
                                    <th className='border-x border-black'>
                                        Rol
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="body-table-usuarios" className='text-center p-4'>
                                {/* <Usuario
                                    usuario={buscarUsuariosDB()}
                                /> */}
                            </tbody>
                        </table>
                        <div id="sinResultados" className='mx-auto hidden justify-center items-center flex-col text-center w-1/2 bg-white'>
                            <h2 className='text-xl font-bold py-2'>
                                No se Encontraron resultados de su busqueda.
                            </h2>
                            <p className='py-2'>
                                Intente con otra Cedula
                            </p>
                            <input 
                                type="button" 
                                value="Mostrar Todos los Registros"
                                className='py-2 bg-color3 hover:bg-color2 transition-all rounded-lg font-bold w-1/2 text-white shadow-lg cursor-pointer'
                                onClick={aparecerTodos}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuarios