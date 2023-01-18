import {useState, useEffect} from 'react'

const Formularios = () => {

    const [formularios, setFormularios] = useState([])

    useEffect(() => {
        
        const obtenerFormularios = ()=>{
            console.log('formuarlios')
        }
    }, [])
    

    return (
        <>
            <div className='w-full flex flex-col'>
                {/* <UsuarioModal data={{statusModal, datosUsuario}}/> */}
                {/* Contenedor Superior */}
                <div className='w-full flex justify-evenly py-5 my-5'>
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
                            className='block bg-white shadow w-full rounded-xl border-2 border-gray-400 p-3 pl-4 pr-12 sm:text-sm'/>
                        
                        {/* <input 
                            type="button" 
                            value="Buscar" 
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all' 
                            onClick={buscador}/> */}

                        {/* <input 
                            type="button" 
                            value="Nuevo Usuario" 
                            className='ml-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all'
                            onClick={() =>{
                                if(!document.querySelector('#custom-modal').classList.contains('borrando-usuario')){
                                    setStatusModal('Registrar un Usuario');
                                    mostrarModal();
                                }
                            }}
                            /> */}

                            
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
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjetas */}
                    <div id="content-cards" className='w-full'>
                        <div className={`${formularios.length > 0 ? 'grid grid-cols-4 gap-2 h-96 w-full overflow-scroll white-custom-scroll':'flex h-60 w-1/2 justify-center'} m-5 mx-auto`}>
                            { formularios.length > 0 ? (
                                <>
                                    
                                </>
                            ):
                            (   
                                <>
                                    <div className='w-full bg-white rounded-lg shadow-lg uppercase mx-auto font-bold text-center flex flex-col items-center'>
                                        <h2 className='mx-auto my-5'>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Formularios