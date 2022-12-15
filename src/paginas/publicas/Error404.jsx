// Importaciones
import React from 'react'
import { Link } from 'react-router-dom'

// Componentes Publicos
import Footer from '../../components/Footer'

const Error404 = () => {
    return (
        <>
            {/* Encabezado */}
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

            {/* Contenido */}
            <section className='w-full flex flex-col justify-between items-center content-center' style={{height: "80vh"}}>
                {/* Contenido de aviso */}
                <div className='flex flex-col justify-center items-center content-center justify-items-center mt-12 w-3/5 bg-white p-10 rounded-xl shadow-lg'>
                    {/* Titulo */}
                    <div className='my-2 flex items-center'>
                        <img src="/img/no-hay-resultados.png" alt="" width="60" className="mx-2"/>
                        <h2 className='text-5xl font-bold mx-2'>Pagina No Encontrada</h2>
                    </div>

                    {/* Descripcion */}
                    <div className='my-10 flex'>
                        <div>
                            <p className='my-5'>
                                No se ha encontrado la pagina busqueda. Esto se puede deber a: 
                            </p>

                            <ul className='my-5 ml-5 list-disc'>
                                <li>Mala conexión a internet.</li>
                                <li>El url está mal escrito.</li>
                                <li>El servidor está en mantenimiento.</li>
                            </ul>

                            <p className='my-5'>
                                Por favor, revise su conexión a internet, el url y vuelva a intentarlo más tarde.
                            </p>
                        </div>

                        <img src="/img/direcciones.png" alt="direccion" width="200" />
                    </div>

                    {/* Boton de Retorno */}
                    <Link
                        to="/admin"
                    >
                        <button
                            className='ml-5 mt-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow-lg transition-all' 
                        >
                            Regresar al Inicio
                        </button>
                    </Link>
                </div>
            </section>
            {/* Creditos */}
            <Footer/>
        </>
    )
}

export default Error404