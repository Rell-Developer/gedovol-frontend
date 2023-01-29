// Importaciones
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// Componentes
import DonanteModal from '../../components/privados/DonanteModal.jsx';
/* import UsuarioModal from '../../components/UsuarioModal.jsx';
import Usuario from '../../components/Usuario.jsx'; */
import clienteAxios from '../../config/axios.jsx';

const Donantes = () => {
    let donantes 
   
    // Declarando el navegador
    const navigate = useNavigate();

    useEffect(() =>{
        mostrarDonantes();
    },[donantes])

    const buscarUsuariosDB = async() =>{

       /*  try {
            let {data} = await clienteAxios('/usuario/obtener-usuarios');
            // users = data;
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
        } */
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

    const mostrarDonantes= () =>{

        const contenedorDonantes = document.querySelector("#contenedorDonantes");
       // Arreglo de usuarios
         donantes = [
            {
                id: Date.now(),
                nombre:"Pedro",
                apellido:"Acosta",
                cedula:'28176538',
                sexo: 'Masculino',
                tipoSangre: 'O+',
                estado : 'Acto',
                correo:  'Pedroj4567@gmail.com',
                direccion:'Calle don pedro',
                telefono: '04243709647',
                preguntas : [
                    {pregunta_1 : {
                        respuesta: 'si',
                        fecha: '10/08/2022'
                    }},
                    {pregunta_2:{
                        respuesta:'no',
                        fecha:''
                    }},
                    {pregunta_3:{
                        respuesta:'no',
                        valor:''
                    }}

                ]
            },
            {
                id: Date.now(),
                nombre:"Adriana",
                apellido:"Moncada",
                cedula:'18971831',
                sexo: 'Femenino',
                tipoSangre: 'A-',
                estado : 'Acto',
                correo:  'moncadaadriana2@gmail.com',
                direccion:'Urb, santa isabel',
                telefono: '0424144699751',
                preguntas : [
                    {pregunta_1 : {
                        respuesta: 'si',
                        fecha: '10/08/2022'
                    }},
                    {pregunta_2:{
                        respuesta:'no',
                        fecha:''
                    }},
                    {pregunta_3:{
                        respuesta:'no',
                        valor:''
                    }}

                ]
            },
            {
                id: Date.now(),
                nombre:"Roque",
                apellido:"Lopez",
                cedula:'228012038',
                sexo: 'Masculino',
                tipoSangre: 'B+',
                estado : 'Acto',
                correo:  'Pedroj4567@gmail.com',
                direccion:'Calle don pedro',
                telefono: '04243709647',
                preguntas : [
                    {pregunta_1 : {
                        respuesta: 'si',
                        fecha: '10/08/2022'
                    }},
                    {pregunta_2:{
                        respuesta:'no',
                        fecha:''
                    }},
                    {pregunta_3:{
                        respuesta:'no',
                        valor:''
                    }}

                ]
            },
            {
                id: Date.now(),
                nombre:"Roque",
                apellido:"Lopez",
                cedula:'228012038',
                sexo: 'Masculino',
                tipoSangre: 'B+',
                estado : 'Acto',
                correo:  'Pedroj4567@gmail.com',
                direccion:'Calle don pedro',
                telefono: '04243709647',
                preguntas : [
                    {pregunta_1 : {
                        respuesta: 'si',
                        fecha: '10/08/2022'
                    }},
                    {pregunta_2:{
                        respuesta:'no',
                        fecha:''
                    }},
                    {pregunta_3:{
                        respuesta:'no',
                        valor:''
                    }}

                ]
            }
        ]

        //limpiar elementos 
        while(contenedorDonantes.firstChild){
            contenedorDonantes.removeChild(contenedorDonantes.firstChild)
        }


        donantes.map((donante)=>{
            const {id,nombre,apellido,cedula,sexo} = donante;
            const carta = document.createElement('div');
            const contenedorDatos = document.createElement('div');
            const contenedorBotones = document.createElement('div');

            //contendor principal
            carta.classList.add("w-60" ,"flex"  ,"flex-col" ,"p-10", "m-2" ,"rounded-xl","bg-white",'border', 'border-grey')
            carta.dataset.id = id;

            //textos de la carta
            contenedorDatos.classList.add('flex','flex-col');
            //cuerpo de la carta 
            contenedorDatos.innerHTML += `
                <p class='text-black'><span class='font-bold'>Nombre y Apellido:</span>${nombre} ${apellido}</p>
                <p class='text-black'><span class='font-bold'>Cedula:</span>${cedula}</p>
                <p class='text-black'><span class='font-bold'>Sexo:</span>${sexo}</p>
            `;

            contenedorBotones.classList.add('w-full','mt-8','flex','justify-evenly');
            contenedorBotones.innerHTML += `
                <div class='mr-3'>
                <button class='bg-red-700 text-white px-8 py-2 capitalize  rounded-lg font-bold'>Ver</button>
                </div>
            
                <div>
                    <button class='bg-red-700 text-white px-5 py-2  rounded-lg font-bold'>Eliminar</button>
                </div>
            `

           
            carta.appendChild(contenedorDatos)
            carta.appendChild(contenedorBotones)
            contenedorDonantes.appendChild(carta)
        })





    }

    return (
        <>
            <div className='w-full flex flex-col bg-color1 rounded-l-3xl'>
                {/* <UsuarioModal/> */}
                {/* Contenedor Superior */}
                <DonanteModal data={donantes}/>
                <div className='w-full flex justify-evenly py-5 my-5'>
                    {/* Titulo */}
                    <div className="text-center font-bold text-color2">
                        <h2 className='text-4xl font-bold'>
                            GEDOVOL    
                        </h2>    
                        <p>
                            DONANTES
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
                            value="Nuevo Donante" 
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all'
                            onClick={mostrarModal}
                            />

                        <input 
                            type="button" 
                            value="Mostrar Todos los Donantes"
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all'
                            onClick={mostrarDonantes}
                            />
                    </div>
                </div>



                {/* Contenedor Medio */}
                <div className='bg-white w-5/6 rounded-lg mx-auto'>
                    {/* Tipo de Vista */}
                    <div className='w-full flex flex-col items-center content-center p-4'>
                        {/* titulo */}
                        <div className='w-full mx-auto'>
                            <h3 className='text-3xl text-center font-bold'>
                                Filtros
                            </h3>
                        </div>  
                        {/* Botones filtro */}
                        <div className='flex justify-evenly w-1/2   mt-4'>
                    
                            <div>
                                <button  className='ml-5 cursor-pointer p-3 bg-white shadow-xl border border-gray-400 hover:bg-color2 text-black font-bold rounded-lg shadow transition-all'>Sexo</button>
                            </div>
                            <div>
                                <button   className='ml-5 cursor-pointer p-3 bg-white shadow-xl border border-gray-400 hover:bg-color2 text-black font-bold rounded-lg shadow capitalize transition-all'>Tipo de Sangre</button>
                            </div>
                            <div>
                                <button  className='ml-5 cursor-pointer p-3 bg-white shadow-xl border border-gray-400 hover:bg-color2 text-black font-bold rounded-lg shadow transition-all'>Estatus</button>
                            </div>
                        </div>          
                    </div>

                    {/* div */}
                    <div className="w-full h-96 my-8">
                        {/* Contenido */}
                        <div className=' w-5/6 my-8 mx-auto justify-center grid grid-cols-3 overflow-y-scroll h-96' id='contenedorDonantes'>

                        </div>
                        {/* Mensaje de error  */}
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

export default Donantes