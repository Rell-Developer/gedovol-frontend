// Importaciones
import { useState, useEffect } from "react";

// Axios
import clienteAxios from "../../config/axios";

// Componentes
import HeartSpinner from "../publicos/HeartSpinner.jsx";

// Helpers
import dataLocalStorage from '../../helpers/dataLocalStorage.js';

const PreguntaConfirmar = ({data}) => {

    // Variables, destructuring
    let {ruta, mensaje, cedula} = data;

    // useStates
    const [rutaAccion, setRutaAccion] = useState('');

    // Funcion que se ejecuta con la dependencia de "ruta"
    useEffect(()=>{

        // Se asigna la ruta con el valor que viene de usuario modal
        const asignarRuta = () =>{
            // Se asgina un valor nuevo al useState
            setRutaAccion(ruta);
        }

        // Se llama la funcion
        asignarRuta();
    }, [ruta]);

    // Funcion de acciones
    const acciones = async(e) =>{

        // Se prevee la accion por defecto
        e.preventDefault();

        // Si la ruta de acciones es borrar un usuario
        if(rutaAccion == 'borrar-usuario'){
            
            // Variables de éste componente
            let botones = document.querySelector('#botones-confirmar');
            let texto = document.querySelector('#texto-confirmar');
            let divSpinner = document.querySelector('#div-spinner');

            // Botones del componente custom-modal
            let botonesEditar = document.querySelectorAll('.btn-ver-usuario');
            
            // El modal custom
            const customModal = document.querySelector('#custom-modal');

            // Si existen los botones del modal
            if(botonesEditar){
                // Recorre todos los botones
                botonesEditar.forEach( boton =>{
                    // Se le quita la opacidad a los botones
                    boton.classList.remove('opacity-100');
                    boton.classList.add('opacity-0');

                    // Luego de 100 milisegundos, los botones se ocultaran
                    setTimeout(() => {
                        boton.classList.add('hidden');
                    }, 100);
                })
            }

            // Se le agrega una clase para seguridad en el frontend al momento de borrar al usuario
            customModal.classList.add('borrando-usuario');

            // Se oculta el texto y los botones de éste componente
            texto.classList.add('hidden');
            botones.classList.add('hidden');

            // Se muestra el spinner
            divSpinner.classList.remove('hidden');

            let dato = dataLocalStorage('data')

            // Se realiza el query para borrar al usuario            
            let {data} = await clienteAxios.post(`/usuario/borrar-usuario`,{cedula, identificador_responsable: dato.id});
            
            // Luego de  3 segundos de espera
            setTimeout(() => {
                
                // Se cierra el modal de usuario
                cerrarModalUsuario();

                // Obteneiendo todos los registros de usuarios
                let usuariosHTML = document.querySelector('#body-table-usuarios').children;

                // borrando al usuario de la tabla y tarjetas
                if(usuariosHTML.length > 0){
                    // Recorriendo todos los usuarios
                    for(let i = 0; i < usuariosHTML.length; i++){
                        // Si el nodo html tiene en us data la cedula del usuario, se borrara
                        if(usuariosHTML[i].getAttribute('data-cedula') == cedula){
                            // Se borra el nodo html
                            usuariosHTML[i].remove();            
                        }
                    }
                }

                // Se borra la clase de seguridad
                customModal.classList.remove('borrando-usuario');

                // Se guarda en una variable el componente div
                let modalMensaje = document.querySelector('#alerta-confirmar-div');

                // Se cambia el texto del componente por el mensaje que trajo el backend
                texto.textContent = data.message;

                // Se oculta el spinner
                divSpinner.classList.add('hidden');

                // Se muestra el texto
                texto.classList.remove('hidden');
                
                // Si no hubo error alguno
                if(!data.error){

                    // Se cambia de color el modal para que se note que es un mensaje positivo
                    // Se quita el color rojo
                    modalMensaje.classList.remove('from-red-500')
                    modalMensaje.classList.remove('to-red-600')
                    
                    // Se agrega el color a indigo
                    modalMensaje.classList.add('from-indigo-500')
                    modalMensaje.classList.add('to-indigo-600')
                }

                // Luego de 3 segundos
                setTimeout(() => {
                    // Se baja la opacidad del componente entero 
                    modalMensaje.classList.remove('opacity-100');
                    modalMensaje.classList.add('opacity-0');

                    // Luego de 200 milisegundos
                    setTimeout(() => {
                        // Se vuelve a color de color rojo el mensaje
                        // Se quita el colro indigo
                        modalMensaje.classList.remove('from-indigo-500')
                        modalMensaje.classList.remove('to-indigo-600')
        
                        // se agrega el color rojo
                        modalMensaje.classList.add('from-red-500')
                        modalMensaje.classList.add('to-red-600')
        
                        // Cambiamos el texto por el valor del mensaje por defecto
                        texto.textContent = mensaje;

                        // Y vuelven aparecer los botones de este componente de confirmacion
                        botones.classList.remove('hidden');
                    }, 200);
                }, 3000);
            }, 3000);
        }
    }

    // Funcion para hacer desaparecer este componente
    const desaparecerModal = (e) =>{
        // Se prevee la accion por defecto
        e.preventDefault();
        
        //  Se guarda en una variable el componente
        let modal = document.querySelector('#alerta-confirmar-div');

        // Se le baja la opacidad a 0
        modal.classList.remove("opacity-100");
        modal.classList.add('opacity-0');
    }

    // Funcion para cerrar el modal
    const cerrarModalUsuario = () =>{

        // Variables
        const customModal = document.querySelector('#custom-modal');
        
        // Intercambiando las clases
        customModal.classList.remove('mostrar-modal');
        customModal.classList.add('cerrar-modal');
    }

    return (
        <>
            {/* Contenedor del mensaje entero */}
            <div id="alerta-confirmar-div" className={`from-red-500 to-red-600 bg-gradient-to-br text-center rounded-lg 
            uppercase text-white text-sm font-bold mb-10 absolute my-36 p-4 ml-10 mt-10 shadow-xl z-10 w-1/6 transition-all
            opacity-0
            `}>
                {/* Mensaje del contenedor */}
                <h2 id="texto-confirmar">
                    {mensaje}
                </h2>

                {/* Botones de confirmacion o negacion */}
                <div id="botones-confirmar" className="w-full flex justify-between mt-5 transition-all">
                    <button
                        className='w-1/4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all'
                        onClick={e => acciones(e)}
                    >
                        Sí
                    </button>

                    <button
                        className='w-1/4 bg-color4 hover:bg-neutral-900 text-white py-2 rounded-lg font-bold cursor-pointer transition-all'
                        onClick={desaparecerModal}
                    >
                        No
                    </button>
                </div>

                {/* Spinner Personalizado */}
                <div id="div-spinner" className="hidden">
                    <HeartSpinner/>  
                </div>
            </div>
        </>
    )
}

export default PreguntaConfirmar