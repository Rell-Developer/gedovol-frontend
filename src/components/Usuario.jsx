import React from 'react'
import { useEffect } from 'react'

const Usuario = ({usuario}) => {

    useEffect(()=>{
        setTimeout(() => {
            console.log(usuario);
        }, 3000);
    },[]);

    return (
        <>
            <tr className=' bg-gray-200 hover:bg-gray-300 cursor-pointer' data-id="1" onClick={e => clickFila(e.target)}>
                <td className='p-1 border-x border-y border-black'>
                    Roque Emilio
                </td>
                <td className='border-x border-y border-black campoCedula'>
                    28124589
                </td>
                <td className='border-x border-y border-black'>
                    Administrador
                </td>
            </tr>
        </>
    )
}

export default Usuario