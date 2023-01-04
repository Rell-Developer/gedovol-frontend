import React from 'react'
import clienteAxios from '../../../config/axios';

const NotificationCard = ({notificacion}) => {

    const {id, descripcion, fecha, leido, tipo_id} = notificacion;

    const marcarLeido =  async(card) =>{
        console.log(card)

        if(card.getAttribute('data-leido') == 'No-Leido'){
            
            let actualizando = await clienteAxios.put('/notificacion/notificacion-leida', {id: parseInt(card.getAttribute('data-id'))});
            console.log(actualizando);



            if(!actualizando.error){
                card.classList.remove('bg-color1');
                card.classList.remove('hover:bg-red-200');
                card.classList.remove('active:bg-red-300');
    
                card.classList.add('bg-white');
                card.classList.add('hover:bg-gray-200');
                card.classList.add('active:bg-gray-300');

                card.removeAttribute('data-leido');
                card.setAttribute('data-leido', 'Leido')
            }
        }
    }

    return (
        <>
            <div 
                className={`${leido ? 'bg-slate-100 hover:bg-white active:bg-gray-100':'bg-color1 hover:bg-red-200 active:bg-red-300'} flex px-3 py-4 items-center rounded-md border shadow cursor-pointer transition-all my-2 notification-card`}
                data-leido={`${leido ? `Leido`:`No-Leido`}`}  
                data-id = {id}
                onMouseEnter={e => marcarLeido(e.target)} 
            >
                <div className='from-red-400 to-red-700 bg-gradient-to-br rounded-full p-2'>
                    <img src={`/public/svg/notification-${tipo_id}.svg`} alt="" className='w-12' />
                    {/* <svg className="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                    </svg> */}
                </div>

                <div className='flex'>
                    <div className='flex justify-center'>
                        <svg className="w-8 mx-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                        </svg>
                    </div>

                    <div className="text-sm">
                        <p className="text-sm">
                            {descripcion}
                        </p>
                        <p className='text-sm text-gray-500 font-bold'>
                            {fecha}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationCard