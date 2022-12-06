import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navegador = () => {
    // Declarando el navegador
    const navigate = useNavigate();

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

        console.log(navegador);
        console.log(e.target);

        if(svg.classList.contains('cerrado')){
            navegador.classList.remove('w-24');
            navegador.classList.add('w-1/6');

            opciones[0].textContent = 'Ocultar';
            opciones[1].textContent = 'Donantes';
            opciones[2].textContent = 'Usuarios';
            opciones[3].textContent = 'Salir';

            svg.style="transform: rotate(360deg);";

            svg.classList.remove('cerrado');
        }else{

            navegador.classList.remove('w-1/6');
            navegador.classList.add('w-24');

            opciones[0].textContent = '';
            opciones[1].textContent = '';
            opciones[2].textContent = '';
            opciones[3].textContent = '';

            svg.style="transform: rotate(180deg);";
            svg.classList.add('cerrado');
        }
    }

    return (
        <>
            <section id="navegador"
                className="w-1/6 h-full pt-2 bg-color2 text-white flex flex-col font-bold justify-between transition-all"
                style={{ height: "100vh" }}
            >
                <div>
                    <div className="px-4 py-1">
                        <div className="p-4 hover:bg-red-600 hover:bg-opacity-60 hover:border-r-4 flex transition-all cursor-pointer" onClick={despliegueNav}>
                            <div id="despliegue-btn" className="mr-5 cursor-pointer">
                                <svg id="despliegue-svg" className="w-6 h-6 transition-all" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <li className="titulos-opciones list-none">
                                Ocultar
                            </li>
                        </div>
                        <hr className="my-2" />
                    </div>
                    <div className="px-4 py-1">
                        <div className="p-4  hover:border-r-4 hover:bg-opacity-75 flex transition-all cursor-pointer">
                            <div className="mr-5">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <li className="titulos-opciones list-none">Donantes</li>
                        </div>
                    </div>
                    <div className="px-4 py-1">
                        <div className="p-4 hover:border-r-4 hover:bg-opacity-75 flex transition-all cursor-pointer">
                            <div className="mr-5">
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                </svg>
                            </div>
                            <li className="titulos-opciones list-none">Usuarios</li>
                        </div>
                    </div>
                </div>

                <div>
                    <hr className="my-2" />
                    <div className="px-4 py-1">
                        <div className="p-4 hover:border-r-4 hover:bg-opacity-75 flex transition-all cursor-pointer" onClick={cerrarSesion}>
                            <div className="mr-5">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6"
                                >
                                <path
                                    fill-rule="evenodd"
                                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                                    clip-rule="evenodd"
                                />
                                </svg>
                            </div>
                            <li className="titulos-opciones list-none">Salir</li>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Navegador