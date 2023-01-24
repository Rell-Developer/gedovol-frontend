import React from 'react'

const UserCard = ({datos}) => {
    return (
        <>
            <div 
                data-id={datos.id}
                data-cedula={datos.cedula}
                className='w-full bg-white  p-5 rounded-lg shadow-lg font-bold flex flex-col justify-center justify-items-center content-center'
            >
                <div class='flex justify-center py-5'>
                    <img src="/img/avatar-masculino.png" alt="avatar masculino" className='w-10' />
                </div>
                <div>
                    <p class='text-color2'>
                        Usuario: <span className='font-normal text-black'>{datos.usuario}</span>
                    </p>
                    <p class='text-color2'>
                        Cedula: <span className='font-normal text-black'>{datos.cedula}</span>
                    </p>
                    <p class='text-color2'>
                        Rol: <span className='font-normal text-black'>{datos.rol}</span>
                    </p>
                </div>

                <div className='flex flex-col my-2'>
                    <button className='bg-color3 hover:bg-color2 transition-all rounded-lg font-bold text-white p-2 my-1 usuario-register vermas-btn'>
                        Ver Usuario
                    </button>
                    <button className='bg-black hover:text-color2 hover:bg-slate-100 border border-black hover:border-color2 transition-all rounded-lg font-bold text-white p-2 my-1'>
                        Eliminar
                    </button>
                </div>
            </div>
        </>
    )
}

export default UserCard