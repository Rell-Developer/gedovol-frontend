import React from 'react'
import { useState } from 'react';
import clienteAxios from '../../config/axios.jsx';

// Compontentes
import Alerta from '../publicos/Alerta.jsx';
import PreguntaConfirmar from './PreguntaConfirmar.jsx';
import HeartSpinner from '../publicos/HeartSpinner.jsx';

// Hooks
// import useUsuarios from '../../hooks/useUsuarios.jsx';
import { useEffect } from 'react';

// Helpers
import dataLocalStorage from '../../helpers/dataLocalStorage.js';
import emailValidator from '../../helpers/emailValidator.js';

import Usuario from './Usuario.jsx';

const UsuarioModal = ({data}) => {

    // Destructuring de los datos
    let {statusModal, datosUsuario} = data;
    let datos = datosUsuario;

    // UseStates
    const [usuario, setUsuario] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');

    const [titulo, setTitulo]= useState(statusModal);
    const [borrar, setBorrar] = useState(false);

    // Componente Alerta
    const [alerta, setAlerta] = useState({});

    // console.log('El status del modal es:');
    // console.log(data)
    // console.log(statusModal);

    // Hooks
    // const {guardarUsuario} = useUsuarios();

    useEffect((()=>{
        
        const verificacionDatos = () =>{
            if(statusModal !== ' Registrar un Usuario'){
                // Estableciendo valores a los campos
                setUsuario(datos.usuario);
                setCedula(datos.cedula);
                setCorreo(datos.correo);
                setPassword('***********');
                setRol(datos.rol);
            }
            
            if(statusModal == 'Registrar un Usuario'){                
                // Estableciendo valores nulos a los campos
                formReset();
            }
        }

        setTitulo(statusModal)

        verificacionDatos();
    }),[statusModal,datosUsuario]);

    // Funcion para cerrar el modal
    const cerrarModal = () =>{

        aparicionModalConfirmar('desaparecer');
        // setBorrar(false);

        // Variables
        const customModal = document.querySelector('#custom-modal');
        
        // Estableciendo valores nulos a los campos
        formReset();
        
        // Intercambiando las clases
        customModal.classList.remove('mostrar-modal');
        customModal.classList.add('cerrar-modal');
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
        
        // Verificacion si el correo es valido
        if(!emailValidator(correo)){
            // Establece el valor del mensaje de alerta
            setAlerta({msg:"Correo Inválido, ingrese un correo válido y en minúsculas", error: true});
            
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
            
            let datos = dataLocalStorage('data');
            let form = document.querySelector('#user-form');
            let loading_heart = document.querySelector('#loading-heart');

            form.classList.remove('hidden');
            form.classList.add('hidden');

            loading_heart.classList.remove('hidden');

            // Peticion http
            let {data} = await clienteAxios.post('/usuario/registrar-usuario', {usuario, cedula, correo, password, rol, usuario_id:datos.id});

            setTimeout(() => {
                
                // Verificando si hay un error
                // Se mostrara un mensaje de lo ocurrido
                if(data.error){
                    setAlerta({error:true, msg: data.message});
                }else{
                    // Mostrando mensaje
                    setAlerta({msg: data.message});
                }
    
                
                form.classList.remove('hidden');
    
                loading_heart.classList.add('hidden');
    
                // El mensaje desaparecerá en 3 segundos
                setTimeout(() => setAlerta({}), 3000);
            }, 1500);
        } catch (error) {
            // Si ocurre un error, se mostrará en consola del navegador
            console.log(error.message);
        }
    }

    const actualizarUsuario = async(e) =>{
        // Se prevee la accion por defecto
        e.preventDefault();

        // Try catch para mostrar mensaje de error en caso lo haya
        try {

            // Tomando el identificador del usuario a actualizar
            let id = datos.id;
            
            // Actualizar los datos del usuario
            let {data} = await clienteAxios.put('/usuario/actualizar-usuario', {usuario, cedula, correo: correo.toLowerCase(), rol, id});

            // Verificando si hay algun error
            if(data.error){
                // Mostrando mensaje de error
                setAlerta({error: true, msg: data.message});
                
                // El mensaje desaparecerá en 3 segundos
                setTimeout(() => setAlerta({}), 3000);

                // Retornando para que no siga el codigo
                return
            }

            // Mostrando mensaje de error
            setAlerta({ msg: data.message });
            
            // El mensaje desaparecerá en 3 segundos
            setTimeout(() => setAlerta({}), 3000);

            // El modal desaparecerá en 50 milisegundos
            setTimeout(() => cerrarModal(), 50);

            // Refrescar la tabla de usuarios
            // mostrarUsuarios();
        } catch (error) {
            // Se muestra el mensaje de errro por la consola del navegador
            console.error(error.message);
        }
    }

    const formReset = () =>{
        // Estableciendo valores nulos a los campos
        setUsuario('');
        setCedula('');
        setCorreo('');
        setPassword('');
        setRol('');
    }

    const buscarUsuariosDB = async() =>{

        try {
            let {data} = await clienteAxios('/usuario/obtener-usuarios');
            // users = data;
            return data
        } catch (error) {
            console.log(error);
        }
    }

    
    const mostrarUsuarios = async() =>{

        const tablaUsuarios = document.querySelector('#body-table-usuarios');
        const contenedorCartas = document.querySelector('#content-cards');

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
            row.classList.add('usuario-register');
            row.setAttribute('data-id', datos.id);

            contenedorCartas.classList.add('bg-gray-200');
            contenedorCartas.classList.add('hover:bg-gray-300');
            contenedorCartas.classList.add('cursor-pointer');
            contenedorCartas.setAttribute('data-id', datos.id);
            
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

            contenedorCartas.innerHTML = `
                <div class='w-1/4 bg-white  p-5 rounded-lg shadow-lg font-bold flex flex-col justify-center justify-items-center content-center'>
                    <div class='flex justify-center py-5'>
                        <img src="/img/avatar-masculino.png" alt="avatar masculino" class='w-1/2' />
                    </div>
                    <div>
                        <p class='text-color2'>
                            Usuario: <span class='font-normal text-black'>${datos.usuario}</span>
                        </p>
                        <p class='text-color2'>
                            Cedula: <span class='font-normal text-black'>${datos.cedula}</span>
                        </p>
                        <p class='text-color2'>
                            Rol: <span class='font-normal text-black'>${datos.rol}</span>
                        </p>
                    </div>
                </div>
            `

            // row.appendChild(contenido);
            tablaUsuarios.appendChild(row);
            
            // console.log('agregando');
        })

        const usuariosRegister = document.querySelectorAll('.usuario-register');

        usuariosRegister.forEach(usuario => {
            usuario.addEventListener('click', e => {
                let identificador;
                if(e.target.children.length <= 0){
                    identificador = e.target.parentElement.getAttribute('data-id');
                    console.log(e.target.parentElement.getAttribute('data-id'));
                }
                else if(e.target.children.length > 0){
                    identificador = e.target.getAttribute('data-id');
                    console.log(e.target.getAttribute('data-id'));
                }


                usuarios.forEach( usuario => {
                    if(usuario.id === parseInt(identificador)){
                        // console.log(usuario);
                        // console.log('Informacion de Datos antes de cambiarlo');
                        // console.log(datosUsuario);
                        setDatosUsuario(usuario);
                        // console.log('Informacion de Datos despues de cambiarlo');
                        // console.log(datosUsuario);
                        setStatusModal('Ver un Usuario');
                        mostrarModal();


                        // <UsuarioModal data={{statusModal, datos}}/>
                    }
                });
            })
        })
    }

    const aparicionModalConfirmar = (accion) =>{
        let modal = document.querySelector('#alerta-confirmar-div');
        if(accion == 'aparecer'){
            modal.classList.remove("opacity-0");
            modal.classList.add('opacity-100');
            setBorrar(true);
        }
        else{
            modal.classList.remove("opacity-100");
            modal.classList.add('opacity-0');
            setBorrar(false);
        }
    }

    // Declaracion del mensaje
    const {msg} = alerta;

    return (
        <>
            {msg && <Alerta alerta={alerta}/>}
            <PreguntaConfirmar data={{mensaje:'¿Está segur@ de borrar a este usuario?', ruta:'borrar-usuario', id:5, cedula}}/>
            <div id="custom-modal" className="flex justify-center w-full cerrar-modal translate-all">
                <div className="absolute w-2/5 bg-color2 flex justify-self-center p-10 rounded-lg shadow-2xl">
                    {/* Formulario */}
                    <div className='w-full'>
                        <form id="user-form" onSubmit={handleSubmit}>
                            <div>
                                <div className="text-center">
                                    <h2 className='font-bold text-2xl text-white'>
                                        {titulo}
                                    </h2>
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                        <svg className="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                        Usuario
                                    </label>
                                    {titulo !== 'Ver un Usuario' ? (
                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                            placeholder='Ingrese su usuario' 
                                            type="text" 
                                            autoComplete='off'
                                            value={usuario}
                                            onChange={e => setUsuario(e.target.value)}
                                        />
                                    ): 
                                        <h3 className='text-white font-bold py-2 flex items-center'>
                                            {usuario}
                                        </h3>
                                    }
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                        {/* <svg className="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg> */}
                                        <svg class="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                        Cedula
                                    </label>
                                    {titulo !== 'Ver un Usuario' ? (
                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                            placeholder='Ingrese su Cedula. Ejemplo: 20123456' 
                                            type="number" 
                                            autoComplete='off'
                                            min="1"
                                            value={cedula}
                                            onChange={e => setCedula(e.target.value)}
                                        />
                                    ): 
                                        <h3 className='text-white font-bold py-2 flex items-center'>
                                            {cedula}
                                        </h3>
                                    }
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                        {/* <svg className="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="w-6 h-6">
                                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                        </svg>

                                        Correo Electronico
                                    </label>
                                    {titulo !== 'Ver un Usuario' ? (
                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                            placeholder='Ingrese el correo electronico' 
                                            type="email" 
                                            autoComplete='off'
                                            value={correo}
                                            onChange={e => setCorreo(e.target.value)}
                                        />
                                    ): 
                                        <h3 className='text-white font-bold py-2 flex items-center'>
                                            {correo}
                                        </h3>
                                    }
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                        <svg className="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                        Contraseña
                                    </label>
                                    {titulo === 'Registrar un Usuario' ? (
                                        <input 
                                            className='bg-white p-1 rounded-lg text-sm border-4 border-gray-200' 
                                            placeholder='Ingrese su contraseña'
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    ): 
                                        <h3 className='text-white font-bold py-2 flex items-center'>
                                            {password}
                                        </h3>
                                    }
                                </div>

                                <div className='flex flex-col py-2'>
                                    <label htmlFor="" className='text-white font-bold py-2 flex items-center'>
                                        {/* <svg className="w-6 h-6 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg> */}
                                        <svg class="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                                        Rol
                                    </label>
                                    
                                    {titulo !== 'Ver un Usuario' ? (
                                        
                                        <select name="" id="" className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' value={rol} onChange={e => setRol(e.target.value)}>
                                            <option value="" className="text-gray-500">Seleccione un Rol</option>
                                            <option value="administrador">Administrador</option>
                                            <option value="secretario">Secretario</option>
                                            <option value="visitante">Visitante</option>
                                        </select>
                                    ): 
                                        <h3 className='text-white font-bold py-2 flex items-center'>
                                            {rol}
                                        </h3>
                                    }
                                </div>
                            </div>

                            <div className='w-full mt-5 flex justify-between'>
                                <input 
                                    type="button" 
                                    value={statusModal !== 'Ver un Usuario' ? 'Cancelar': 'Cerrar'}
                                    className='w-1/4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all btn-ver-usuario' 
                                    onClick={cerrarModal}/>

                                {titulo === 'Ver un Usuario' ? 
                                    <button
                                        type="button"
                                        className='w-1/4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all btn-ver-usuario'
                                        onClick={e => {
                                            aparicionModalConfirmar('desaparecer')
                                            setTitulo("Editar Usuario")}}
                                    >
                                        Editar
                                    </button>
                                : null}

                                {titulo === 'Editar Usuario' ? 
                                    <input 
                                        type="button" 
                                        value="Guardar" 
                                        className='w-1/4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all'
                                        onClick={actualizarUsuario}
                                        />
                                : null}

                                {titulo === 'Registrar un Usuario' ? 
                                    <input 
                                        type="submit" 
                                        value="Guardar" 
                                        className='w-1/4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all'
                                        />
                                : null}
                                
                                {titulo === 'Ver un Usuario' ? 
                                    <input 
                                        type="button" 
                                        value="Borrar" 
                                        className='w-1/4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all btn-ver-usuario'
                                        onClick={e => aparicionModalConfirmar('aparecer')}
                                        />
                                : null}
                            </div>
                        </form>

                        <div id="loading-heart" className="w-full flex-col justify-center hidden">
                            <div className="mx-auto text-center">
                                <HeartSpinner/>
                            </div>
                            <h2 className="text-center font-bold text-white">
                                Cargando, espere un momento...
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsuarioModal