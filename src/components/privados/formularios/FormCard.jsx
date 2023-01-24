import React from 'react'

const FormCard = ({formulario}) => {

    console.log(formulario)
    return (
        <>
            <div className='w-5/6 mx-auto my-2 lg:my-0 lg:w-64 bg-white p-5 rounded-lg shadow-lg font-bold'>
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