import React from 'react'
import {Link} from 'react-router-dom';

const CuentaNoConfirmada = () => {
    return (
        <>
            <header className='w-full flex justify-center bg-color2 h-24 shadow-lg'>
                <Link to="/admin" className='items-center flex'>
                    <div className='flex items-center'>
                            <img src="/img/logo-blanco.png" alt="logo" className="w-1/6"/>
                            <h2 className='mx-2 text-white font-bold text-4xl'>
                                GEDOVOL
                            </h2>
                    </div>
                </Link>
            </header>
            <section className="w-full bg-color1 flex justify-center content-center items-center mt-5">
                <div className="mt-5 text-center bg-white p-10 rounded-lg shadow-lg">
                    <div>
                        <h2 className="text-4xl font-bold">
                            Tu cuenta aún no está confirmada
                        </h2>
                        <p className="w-5/6 text-center my-5 mx-auto">
                            Para poder usar el sistema GEDOVOL se necesita que tu cuenta esté confirmada, por favor, revise su correo electronico.
                        </p>

                        <p>En caso de que no haya llegado un correo electronico para confirmar su cuenta, comuniquese con los administradores del sistema.</p>
                    </div>

                    <div className="mt-10">
                        <Link
                            to="/"
                            className="bg-color2 p-4 text-white font-bold rounded-lg shadow-md"
                            onClick={e=> localStorage.removeItem('data')}
                        >
                            Regresar al Inicio
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CuentaNoConfirmada