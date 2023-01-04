import React, {useState, useEffect} from 'react'

const BurbujaNotificacion = () => {

    const [aparicion, setAparicion]= useState(false);

    useEffect(() => {
        aparecerModalNotificaciones();
    }, [aparicion])
    

    const aparecerModalNotificaciones = () =>{

        const modalNotificaciones = document.querySelector('#modal-notificaciones');


        if(modalNotificaciones){
            if(aparicion){
                modalNotificaciones.classList.remove('hidden');
                modalNotificaciones.classList.add('opacity-100');

                setTimeout(() => modalNotificaciones.classList.remove('opacity-0'), 10);
                
            }else{
                modalNotificaciones.classList.remove('opacity-100');
                modalNotificaciones.classList.add('opacity-0');

                setTimeout(() => modalNotificaciones.classList.add('hidden'), 500);
            }
        }

        // document.addEventListener('click', (e)=>{
    
        //     if(aparicion){
        //         if(e.target !== modalNotificaciones){
        //             console.log('No es igual');
        //             if(modalNotificaciones.classList.contains('opacity-100')){
        //                 modalNotificaciones.classList.remove('opacity-100');
        //                 setTimeout(() => modalNotificaciones.classList.add('hidden'), 500);
        //             }
        //         }
        //     }
        // })
    }

    // const verificacionClick = () =>{
    //     let modalNotificaciones = document.querySelector('#modal-notificaciones');
    //     // console.log(data);
    
    //     document.addEventListener('click', (e)=>{
    
    //         if(e.target !== modalNotificaciones){
    //             console.log('No es igual');
    //             if(modalNotificaciones.classList.contains('opacity-100')){
    //                 modalNotificaciones.classList.remove('opacity-100');
    //                 setTimeout(() => modalNotificaciones.classList.add('hidden'), 500);
    //             }
    //         }
    //     })
    // }

    // verificacionClick();

    return (
        <>
            <div 
                className='bg-color3 p-2 rounded-full absolute cursor-pointer mr-5 shadow-lg hover:bg-color2 transition-all'
                onClick={()=>{setAparicion(!aparicion)}}    
            >
                <svg className="w-6 h-6" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
            </div>
        </>
    )
}

export default BurbujaNotificacion