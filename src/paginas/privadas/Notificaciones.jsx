import {useEffect, useState} from 'react'
import NotificationCard from '../../components/privados/notificaciones/NotificationCard';
import clienteAxios from '../../config/axios';

const Notificaciones = () => {

    const [dataNotificaciones, setDataNotificaciones] = useState([]);

    useEffect(() => {
        busquedaNotificaciones();
    }, []);

    const busquedaNotificaciones = async() =>{

        let contenedor = document.querySelector('#pagina-contenedor-notificaciones');

        console.log('actualizando notificaciones')
        console.log(contenedor);
        let {data} = await clienteAxios('/notificacion/obtener-notificaciones', {limite: 6});
        console.log(data)
        setDataNotificaciones(data);
        // if(contenedor){
        // }
    }
    

    return (
        <>
            <div className="w-full flex flex-col bg-color1">

                <div className="m-3 bg-white rounded-lg shadow">
                    {/* Titulo */}
                    <div>
                        <h2 className="text-2xl font-bold uppercase text-center my-5">
                            Todas las notificaciones
                        </h2>
                    </div>

                    {/* Botones interactivos  */}
                    <div className='w-full flex justify-end'>
                        <button
                            className="bg-color3 p-2 font-bold text-white rounded-lg text-sm mr-5"
                        >
                            Marcar todos como leidos
                        </button>
                    </div>

                    <hr className="my-2"/>

                    {/* Contenedor de Notificaciones */}
                    <div id="pagina-contenedor-notificaciones" className="w-full px-2 h-full">
                        {dataNotificaciones.length ? (
                            <>
                                {
                                    dataNotificaciones.map( notificacion =>(
                                        <NotificationCard 
                                            key={notificacion.id}
                                            notificacion={notificacion}
                                        />
                                    ))
                                }
                            </>
                        ):(
                            <>
                                <h2 className="text-center text-3xl font-bold my-10">
                                    No hay notificaciones
                                </h2>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notificaciones