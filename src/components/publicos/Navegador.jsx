import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Navegador = () => {

    // useStates
    const [profile, setProfile] = useState({});
    const [unfolded, setUnfolded] = useState(false);
    
    // Declarando el navegador
    const navigate = useNavigate();

    useEffect(()=>{

        const asignacionProfile = () =>{
            let data = JSON.parse( localStorage.getItem('data'));
            let unfoldedLS = localStorage.getItem('unfolded');

            console.log('unfolded?')
            console.log(unfoldedLS);

            unfoldedLS ? setUnfolded(unfoldedLS): setUnfolded(false);
            if(unfoldedLS){
                if(unfoldedLS === 'true'){
                    setUnfolded(unfoldedLS);
                    const svg = document.querySelector('#despliegue-svg');   
                    svg.style="transform: rotate(180deg);";
                }else{
                    setUnfolded(false);
                    const svg = document.querySelector('#despliegue-svg');       
                }
            }else{
                setUnfolded(false);
                const svg = document.querySelector('#despliegue-svg');   
                // svg.style="transform: rotate(180deg);";
            }
            
            console.log('use efect redirigiendo')
            data ? setProfile(data): navigate('/');

        }

        asignacionProfile();
    },[]);


    // Metodo para cerrar sesion
    const cerrarSesion = () => {

        // Borrando el token del localStorage
        localStorage.removeItem('data');

        // Redigiriendo a la ruta principal pública , el cual es el login
        navigate('/');
    }

    // Funcion para el despliegue del nav
    const despliegueNav = (e) =>{

        // Variables
        const navegador = document.querySelector('#navegador');
        const opciones = document.querySelectorAll('.titulos-opciones');
        const svg = document.querySelector('#despliegue-svg');

        // console.log(navegador);
        // console.log(e.target);

        if(svg.classList.contains('cerrado')){
            
            
            // navegador.classList.remove('w-24');
            // navegador.classList.add('w-1/6');
            
            setUnfolded(false);

            opciones[0].textContent = 'Ocultar';
            opciones[1].textContent = 'Donantes';

            if(profile.rol === 'administrador'){
                opciones[2].textContent = 'Formularios';
                opciones[3].textContent = 'Usuarios';
                opciones[4].textContent = JSON.parse(localStorage.getItem('data')).usuario;
            }else{
                opciones[2].textContent = JSON.parse(localStorage.getItem('data')).usuario;
                opciones[3].textContent = 'Formularios';
            }
            opciones[ opciones.length - 1 ].textContent = 'Salir';
            
            
            let modalNotificaciones = document.querySelector('#modal-notificaciones');
            modalNotificaciones ? modalNotificaciones.classList.remove('posicion-despliegue-nav'): null;
            
            svg.style="transform: rotate(360deg);";

            svg.classList.remove('cerrado');

            localStorage.setItem('unfolded', false)
        }else{

            // navegador.classList.remove('w-1/6');
            // navegador.classList.add('w-24');

            setUnfolded(true);

            opciones.forEach( opcion => opcion.textContent = '');

            svg.style="transform: rotate(180deg);";
            svg.classList.add('cerrado');

            let modalNotificaciones = document.querySelector('#modal-notificaciones');
            modalNotificaciones ? modalNotificaciones.classList.add('posicion-despliegue-nav'): null;
            localStorage.setItem('unfolded', true)
        }
    }

    // Nombre de Usuario
    const nombreUsuario = () =>{

        let nombre = JSON.parse(localStorage.getItem('data')).usuario;
        console.log(nombre)

        return nombre
    }

    return (
        <>
            <section id="navegador"
                className={`${unfolded ? 'w-full md:w-24':'w-full md:w-1/6'} h-20 pt-2 bg-color2 text-white flex flex-row justify-center md:flex-col font-bold md:justify-between transition-all`}
                style={{ height: "87vh" }}
            >
                <div className="flex flex-row md:flex-col h-20">
                    <div className={`hidden md:block px-4 py-1`}>
                        <div className="p-4 hover:bg-red-600 hover:bg-opacity-60 hover:border-r-4 flex transition-all cursor-pointer" onClick={ e => despliegueNav()}>
                            <div id="despliegue-btn" className="mr-5 cursor-pointer">
                                <svg id="despliegue-svg" className="w-6 h-6 transition-all" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <li className="titulos-opciones list-none">
                                {unfolded ? '':'Ocultar'}
                            </li>
                        </div>
                        <hr className="my-2" />
                    </div>
                    <div className="mx-3 py-3 md:mx-0 md:px-4 md:py-1">
                        <Link
                            to="/admin"    
                        >
                            <div className="md:p-4  hover:border-r-4 hover:bg-opacity-75 flex transition-all cursor-pointer">
                                <div className="mr-5">
                                    <svg className="w-8 h-8 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <li className="titulos-opciones list-none">{unfolded ? '':'Donantes'}</li>
                            </div>
                        </Link>
                    </div>

                    <div className="mx-3 py-3 md:mx-0 md:px-4 md:py-1">
                        <Link
                            to="/admin/formularios"    
                        >
                            <div className="md:p-4  hover:border-r-4 hover:bg-opacity-75 flex transition-all cursor-pointer">
                                    <div className="mr-5">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-6 md:h-6">
                                            <path fill-rule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clip-rule="evenodd" />
                                            <path fill-rule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                                        </svg>

                                    </div>
                                    <li className="titulos-opciones list-none">{unfolded ? '':'Formularios'}</li>
                            </div>
                        </Link>
                    </div>

                    {
                        profile.rol === 'administrador' ?
                            <div className="mx-3 py-3 md:mx-0 md:px-4 md:py-1">
                                <Link
                                    to="/admin/usuarios"
                                >
                                    <div className="md:p-4 hover:border-r-4 hover:bg-opacity-75 flex transition-all cursor-pointer">
                                            <div className="mr-5">
                                                <svg class="w-8 h-8 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                                </svg>
                                            </div>
                                            <li className="titulos-opciones list-none">{unfolded ? '':'Usuarios'}</li>
                                    </div>
                                </Link>
                            </div>
                        :null
                    }
                </div>

                <div className="flex flex-row md:flex-col h-20">
                    <div className="mx-3 py-3 md:mx-0 md:px-4 md:py-1">
                        <Link
                            to="/admin/perfil"
                        >
                            <div className="md:p-4 hover:border-r-4 hover:bg-opacity-75 flex transition-all cursor-pointer">
                                <div className="mr-5">
                                    <svg className="w-8 h-8 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <li className="titulos-opciones list-none">{unfolded ? '' :`${nombreUsuario()}`}</li>
                            </div>
                        </Link>
                    </div>
                    <hr className="my-2" />
                    <div className="mx-3 py-3 md:mx-0 md:px-4 md:py-1">
                        <div className="md:p-4 hover:border-r-4 hover:bg-opacity-75 flex transition-all cursor-pointer" onClick={cerrarSesion}>
                            <div className="mr-5">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-8 h-8 md:w-6 md:h-6"
                                >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                />
                                </svg>
                            </div>
                            <li className="titulos-opciones list-none">{unfolded ? '':'Salir'}</li>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Navegador