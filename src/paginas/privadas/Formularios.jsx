import {useState, useEffect} from 'react'
import RedHeartSpinner from '../../components/publicos/RedHeartSpinner.jsx';
import { useNavigate } from 'react-router-dom';

import clienteAxios from '../../config/axios.jsx';
import FormCard from '../../components/privados/formularios/FormCard.jsx';

const Formularios = () => {

    const [formularios, setFormularios] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        
        const obtenerFormularios = ()=>{

            setTimeout(async() => {
                try {
                    
                    let {data} = await clienteAxios('/formulario/obtener-formularios');

                    console.log(data);
                    setFormularios(data);
                    setLoading(false);
                } catch (error) {
                    console.log(error.message);
                }
            }, 1500);
        }

        obtenerFormularios();
    }, [])
    
    const buscarCedula = (cedula) =>{
        const cards = document.querySelectorAll('.cardForm');

        if(cedula !== ''){
            cards.forEach( card => card.getAttribute('data-cedula') !== cedula ? card.classList.add('hidden'): card.classList.remove('hidden'));
        }else{
            cards.forEach( card => card.classList.remove('hidden'));
        }
    }

    const buscarFecha = (Fecha) =>{
        const cards = document.querySelectorAll('.cardForm');
        console.log(Fecha);

        if(Fecha !== ''){
            cards.forEach( card => card.getAttribute('data-fecha') !== Fecha ? card.classList.add('hidden'): card.classList.remove('hidden'));
        }else{
            cards.forEach( card => card.classList.remove('hidden'));
        }
    }

    return (
        <>
            <div className='w-full flex flex-col'>
                {/* <UsuarioModal data={{statusModal, datosUsuario}}/> */}
                {/* Contenedor Superior */}
                <div className='w-full flex justify-evenly md:py-2 lg:py-5 md:my-2 lg:my-5'>
                    {/* Titulo */}
                    <div className="text-center font-bold text-color2">
                        <h2 className='text-4xl font-bold'>
                            GEDOVOL    
                        </h2>    
                        <p>
                            FORMULARIOS
                        </p>
                    </div> 

                    {/* Buscador */}
                    <div className='flex items-center justify-between'>
                        <input 
                            id="buscadorCedula"
                            type="number" 
                            min="1" 
                            placeholder='Buscar por Cedula' 
                            className='block bg-white shadow w-full rounded-xl border-2 border-gray-400 p-3 pl-4 pr-12 sm:text-sm'
                            onChange={e => buscarCedula(e.target.value)}
                        />
                        
                        {/* <input 
                            type="button" 
                            value="Buscar" 
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all' 
                            onClick={buscador}/> */}

                        <button
                            className='w-1/2 flex ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all'
                            onClick={e => navigate("/admin/nuevo-formulario")}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                <line x1="12" y1="11" x2="12" y2="17" />
                                <line x1="9" y1="14" x2="15" y2="14" />
                            </svg>
                            Nuevo Formulario
                        </button>
{/* 
                        <input 
                            type="button" 
                            value="Nuevo Formulario" 
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all'
                            />

                             */}
                        {/* <input 
                            type="button" 
                            value="Mostrar Todos los Usuarios"
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all'
                            onClick={mostrarUsuarios}
                            /> */}
                    </div>

                </div>

                {/* Contenedor Medio */}
                <div className='w-full flex flex-col'>
                    {/* Tipo de Vista */}
                    <div className='w-full flex flex-col items-center content-center'>
                        {/* titulo */}
                        <div>
                            <h3 className='text-2xl font-bold'>
                                Filtro
                            </h3>
                        </div>

                        {/* Tipo de Vista */}
                        <div className='py-1 my-1 ml-5 w-5/6'>
                            <div className='flex justify-start flex-col'>
                                <div className='flex flex-col justify-center items-center'>
                                    <label htmlFor="tableRadio" className='font-bold'>Fecha</label>
                                    <input 
                                        id="tableRadio" 
                                        type="date" 
                                        name="tipoVista" 
                                        className='p-2 border bg-white rounded-lg shadow'
                                        onChange={e => buscarFecha(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjetas */}
                    <div id="content-cards" className='w-full md:h-60'>
                        {loading ? (
                            <div className="bg-white rounded-lg shadow-lg w-1/4 text-center p-5 mx-auto m-5">
                                <RedHeartSpinner/>
                                <h2 className='font-bold'>
                                    Cargando formularios...
                                </h2>
                            </div>
                        ):
                        (
                            <>
                                <div className={`${formularios.length > 0 ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-1 xl:gap-2 w-full overflow-scroll red-custom-scroll':'flex w-1/2 justify-center'} md:h-64 xl:h-96 m-2 lg:m-5 mx-auto`}>
                                    { formularios.length > 0 ? (
                                        <>
                                            {formularios.map((formulario,index) => <FormCard formulario={formulario} key={index}/>)}
                                        </>
                                    ):
                                    (   
                                        <>
                                            <div className='w-1/2 bg-white rounded-lg shadow-lg uppercase mx-auto font-bold text-center flex flex-col items-center justify-center'>
                                                <h2 className='mx-auto my-2'>
                                                    No hay formularios registrados.
                                                </h2>

                                                <div className="mx-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-broken" width="88" height="88" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                                        <path d="M12 7l-2 4l4 3l-2 4v3" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Formularios