import {useState} from 'react'

// Componentes
import RedHeartSpinner from '../../publicos/RedHeartSpinner.jsx';

// Config
import clienteAxios from '../../../config/axios.jsx';

const FormCard = ({formulario}) => {

    // UseStates
    const [eliminar, setEliminar] = useState(false);
    const [eliminando, setEliminando] = useState(false);
    const [mensaje, setMensaje] = useState('')

    // Funciones
    const handlerDelete = async(e) => {
        setEliminando(true);
        console.log('llegando al handlerdelete')

        try {
            
            let {data} = await clienteAxios.delete(`/formulario/eliminar-formulario/${formulario.id}`);
            // let data =  { error : true , message: 'No se encontró el formulario en la base de datos'};

            console.log(data)
            if(data.error){
                setTimeout(() => {
                    setMensaje(data.message);
                    setTimeout(() => {
                        setEliminar(false);
                        setEliminando(false);
                        setMensaje('');
                        return
                    }, 2500);
                }, 2500);
            }

            setTimeout(() => {
                setMensaje(data.message);

                let card = e.parentElement.parentElement.parentElement;
                
                setTimeout(() => card.remove(), 2000);
            }, 2500);
        } catch (error) {
            console.log(error.message);
            setTimeout(() => {
                setMensaje(error.message);
                setTimeout(() => {
                    setEliminar(false);
                    setEliminando(false);
                    setMensaje('');
                }, 2500);
            }, 2500);
        }
    }

    // Retorno
    return (
        <>
            <div 
                className={`${mensaje !== '' ? 'bg-gradient-to-r from-color2 to-color3':'bg-white'} w-5/6 mx-auto my-2 lg:my-0 lg:w-64 bg-white p-5 rounded-lg shadow-lg font-bold h-60 flex flex-col justify-center`}
            >
                {mensaje === '' ? (
                    <>
                        <div className={`${eliminar || eliminando ? 'hidden':''} w-full`}>
                            <div>
                                <p className='text-color2'>
                                    Donante: <span className='font-normal text-black'>Nombre del Donante</span>
                                </p>
                                <p className='text-color2'>
                                    Cedula: <span className='font-normal text-black'>{formulario.donante_id}</span>
                                </p>
                                <p className='text-color2'>
                                    Fecha: <span className='font-normal text-black'>{formulario.fechaDonacion}</span>
                                </p>
                            </div>

                            <div className='flex flex-col mt-3'>
                                <button className='bg-color3 hover:bg-color2 transition-all rounded-lg font-bold text-white p-2 my-1 usuario-register vermas-btn'>
                                    Ver Formulario
                                </button>
                                
                                <button 
                                    className='bg-black hover:text-color2 hover:bg-slate-100 border border-black hover:border-color2 transition-all rounded-lg font-bold text-white p-2 my-1'
                                    onClick={e => setEliminar(true)}    
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>

                        <div className={`${!eliminar || eliminando ? 'hidden':''} w-full text-center`}>
                            <h2 className='uppercase my-2'>
                                ¿Esta seguro de <span className='text-color2'>Eliminar</span> este formulario?
                            </h2>

                            <div 
                                className='w-full flex flex-col'
                            >
                                <button
                                    className='bg-black hover:text-color2 hover:bg-slate-100 border border-black hover:border-color2 transition-all rounded-lg font-bold text-white p-2 my-1'
                                    onClick={e => handlerDelete(e.target)}
                                >
                                    Sí
                                </button>
                                <button
                                    className='bg-color3 hover:bg-color2 transition-all rounded-lg font-bold text-white p-2 my-1'
                                    onClick={e => setEliminando(false)}
                                >
                                    No
                                </button>
                            </div>
                        </div>

                        <div className={`${eliminando ? '':'hidden'} text-center`}>
                            <RedHeartSpinner/>
                            <h2 className='uppercase my-1'>
                                Eliminando...
                            </h2>
                        </div>
                    </>
                ):(
                    <div className={`${mensaje == '' ? 'hidden':''} text-center`}>
                        <h2 className='uppercase text-white'>
                            {mensaje}
                        </h2>
                    </div>
                )}

            </div>  
        </>
    )
}

export default FormCard