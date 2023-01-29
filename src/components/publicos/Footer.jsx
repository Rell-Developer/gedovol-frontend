import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className='w-full flex justify-center bg-transparent'>
                <Link to="/desarrolladores">
                    <h4 className='md:text-md lg:text-xl font-bold py-3 cursor-pointer text-center'>
                        Proyecto Desarrollado por <span className="text-color2">Grupo 4</span> en la Asignatura <span className="text-color2">Sistemas de Informacion 3.</span>
                    </h4>
                </Link>
            </footer>
        </>
    )
}

export default Footer