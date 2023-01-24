// Importaciones
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Componentes
import UsuarioModal from '../../components/privados/UsuarioModal.jsx';
import Usuario from '../../components/privados/Usuario.jsx';
import UserCard from '../../components/privados/usuarios/UserCard.jsx';
import ToggleHeart from '../../components/privados/utils/toggleHeart.jsx';


import clienteAxios from '../../config/axios.jsx';

// Hooks
import useUsuarios from '../../hooks/useUsuarios.jsx';

const Usuarios = () => {

    // Arreglo de usuarios
    let users = [];

    // Usuarios
    // const {usuarios, guardarUsuario} = useUsuarios();
    const [statusModal, setStatusModal] = useState('');
    const [datosUsuario, setDatosUsuario] = useState({});
    const [usuarios, setUsuarios] = useState([]);
    const [tipoVista, setTipoVista] = useState('Table');

    // console.log(usuarios)

    // Declarando el navegador
    const navigate = useNavigate();

    useEffect(() =>{
        buscarUsuariosDB();
        mostrarUsuarios();
    },[])

    const buscarUsuariosDB = async() =>{

        try {
            let {data} = await clienteAxios('/usuario/obtener-usuarios');
            setUsuarios(data);

            return data
        } catch (error) {
            console.log(error);
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
    
            if(contador == cedulas.length){
                console.log('Sin resultados')
                sinResultados.classList.remove('hidden');
                // sinResultados.classList.add('flex');
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
        let botonesEditar = document.querySelectorAll('.btn-ver-usuario');

        if(botonesEditar){
            botonesEditar.forEach( boton =>{
                boton.classList.remove('opacity-0');
                boton.classList.add('opacity-100');
                boton.classList.remove('hidden');
            })
        }

        if(modal){
            if(!modal.classList.contains('mostrar-modal')){
                modal.classList.remove('cerrar-modal');
                modal.classList.add('mostrar-modal');
            }
        }
    }

    const mostrarUsuarios = async() =>{

        const tablaUsuarios = document.querySelector('#body-table-usuarios');
        // const contenedorCartas = document.querySelector('#content-cards');

        console.log('borrando registros html')

        while(tablaUsuarios.firstChild){
            console.log('borrando')
            tablaUsuarios.removeChild(tablaUsuarios.firstChild);
        }

        let usuarios = await buscarUsuariosDB();
        console.log(usuarios);

        usuarios.forEach( datos => {

            
            let row = document.createElement('tr');
            row.classList.add('bg-gray-200');
            row.classList.add('hover:bg-gray-300');
            row.classList.add('cursor-pointer');
            row.classList.add('usuario-register');
            row.setAttribute('data-id', datos.id);
            row.setAttribute('data-cedula', datos.cedula);

            // contenedorCartas.classList.add('bg-gray-200');
            // contenedorCartas.classList.add('hover:bg-gray-300');
            // contenedorCartas.classList.add('cursor-pointer');
            // contenedorCartas.setAttribute('data-id', datos.id);
            // contenedorCartas.setAttribute('data-cedula', datos.cedula);
            
            // console.log(datos);
            let contenido = document.createElement('div');
            row.innerHTML = `
                <td class='p-1 border-x border-y border-black'>${datos.usuario}</td>
                <td class='border-x border-y border-black campoCedula'>${datos.cedula}</td>
                <td class='border-x border-y border-black'>${datos.rol}</td>
            `

            // contenedorCartas.innerHTML = `
            //     <div class='w-1/4 bg-white  p-5 rounded-lg shadow-lg font-bold flex flex-col justify-center justify-items-center content-center'>
            //         <div class='flex justify-center py-5'>
            //             <img src="/img/avatar-masculino.png" alt="avatar masculino" class='w-1/2' />
            //         </div>
            //         <div>
            //             <p class='text-color2'>
            //                 Usuario: <span class='font-normal text-black'>${datos.usuario}</span>
            //             </p>
            //             <p class='text-color2'>
            //                 Cedula: <span class='font-normal text-black'>${datos.cedula}</span>
            //             </p>
            //             <p class='text-color2'>
            //                 Rol: <span class='font-normal text-black'>${datos.rol}</span>
            //             </p>
            //         </div>
            //     </div>
            // `

            // row.appendChild(contenido);
            tablaUsuarios.appendChild(row);
            
            // console.log('agregando');
        })

        const usuariosRegister = document.querySelectorAll('.usuario-register');
        const customModal = document.querySelector('#custom-modal');

        usuariosRegister.forEach(usuario => {
            usuario.addEventListener('click', e => {
                let identificador;
                if(e.target.classList.contains('vermas-btn')){
                    identificador = e.target.parentElement.parentElement.getAttribute('data-id');
                }
                if(e.target.children.length <= 0){
                    identificador = e.target.parentElement.getAttribute('data-id');
                    // console.log(e.target.parentElement.getAttribute('data-id'));
                }
                else if(e.target.children.length > 0){
                    identificador = e.target.getAttribute('data-id');
                    // console.log(e.target.getAttribute('data-id'));
                }

                console.log(usuarios)

                usuarios.forEach( usuario => {
                    if(usuario.id === parseInt(identificador)){
                        if(customModal){
                            if(!customModal.classList.contains('mostrar-modal')){
                                setDatosUsuario(usuario);
                                setStatusModal('Ver un Usuario');
                                mostrarModal();
                            }
                        }
                    }
                });
            })
        })
    }

    const clickViewType = (vista) => {

        setTipoVista(vista)
    }

    return (
        <>
            <div className='w-full flex flex-col'>
                <UsuarioModal data={{statusModal, datosUsuario}}/>
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
                            onClick={() =>{
                                if(!document.querySelector('#custom-modal').classList.contains('borrando-usuario')){
                                    setStatusModal('Registrar un Usuario');
                                    mostrarModal();
                                }
                            }}
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
                <div className='w-full flex mx-auto flex-col lg:flex-row'>
                    {/* Tipo de Vista */}
                    <div className='w-1/6 flex flex-col items-center content-center bg-white mx-3 rounded-lg shadow-md h-36 justify-center mb-5'>
                        {/* titulo */}
                        <div>
                            <h3 className='text-2xl font-bold'>
                                Tipo de Vista
                            </h3>
                        </div>

                        {/* Tipo de Vista */}
                        <div className='py-1 my-1 w-5/6'>
                            <div className='flex justify-evenly font-bold'>
                                <div className={`${tipoVista === 'Table' ? 'bg-slate-100 text-black border border-stone-300':'bg-color3 hover:bg-color2 cursor-pointer text-white shadow-md'} text-center p-2 rounded-lg transition-all`} onClick={e => clickViewType('Table')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${tipoVista === 'Table' ? '#000' : '#fff'}`} className="w-6 h-6 mx-auto">
                                        <path fill-rule="evenodd" d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z" clip-rule="evenodd" />
                                    </svg>
                                    <p>
                                        Tabla
                                    </p>
                                </div>
                                
                                <div className={`${tipoVista === 'Cards' ? 'bg-slate-100 text-black border border-stone-300':'bg-color3 hover:bg-color2 cursor-pointer text-white shadow-md'} text-center p-2 rounded-lg transition-all`} onClick={e => clickViewType('Cards')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={`${tipoVista === 'Cards' ? '#000' : '#fff'}`} className="w-6 h-6 mx-auto">
                                        <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clip-rule="evenodd" />
                                    </svg>
                                    <p>
                                        Tarjetas
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className={`${tipoVista === 'Table' ? '':'hidden'} w-5/6 bg-white mx-3 rounded-lg shadow-md`}>
                        <table className='bg-color3 my-5 mx-auto w-5/6 rounded shadow-lg border-black border-x border-y'>
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
                        <div id="sinResultados" className='mx-auto hidden justify-center items-center flex-col text-center w-1/2 bg-white p-5 rounded-lg shadow'>
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

                    {/* Tarjetas */}
                    <div id="content-cards" className={`${tipoVista === 'Cards' ? '':'hidden'} w-5/6`}>
                        <div className='mx-2 w-5/6 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 h-5/6 overflow-scroll'>
                            {usuarios.length > 0 ? (
                                <>
                                    {usuarios.map( (usuario, i) => <UserCard key={usuario.id} datos={usuario}/>)}
                                </>
                            ):(
                                <>
                                
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuarios