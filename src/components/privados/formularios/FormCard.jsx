import React from 'react'

const FormCard = ({data}) => {
    return (
        <>
            <div className='w-5/6 mx-auto lg:w-64 bg-white p-5 rounded-lg shadow-lg font-bold'>
                <div>
                    <p className='text-color2'>
                        Donante: <span className='font-normal text-black'>Roque Emilio Lopez Loreto</span>
                    </p>
                    <p className='text-color2'>
                        Cedula: <span className='font-normal text-black'>28012038</span>
                    </p>
                    <p className='text-color2'>
                        Fecha: <span className='font-normal text-black'>10/12/2022</span>
                    </p>
                </div>

                <div className='flex flex-col mt-3'>
                    <button className='w-full bg-color4 my-1 rounded-md py-2 text-white'>
                        Ver Formulario
                    </button>
                    
                    <button className='w-full bg-color3 my-1 rounded-md py-2 text-white'>
                        Eliminar
                    </button>
                </div>
            </div>  
        </>
    )
}

export default FormCard