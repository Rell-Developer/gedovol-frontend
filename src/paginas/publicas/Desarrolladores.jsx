import React from 'react'
import {Link} from 'react-router-dom';

const Desarrolladores = () => {
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
            <div className='w-full pb-10'>
                {/* Desarrolladores */}
                <div className='w-full'>
                    {/* Titulo */}
                    <div className='w-full py-10'>
                        <h1 className='text-4xl text-color2 font-bold text-center'>
                            Desarrolladores
                        </h1>
                    </div>

                    {/* Tarjetas */}
                    <div className='w-full flex justify-evenly'>

                        {/* Tarjeta 1 */}
                        <div className='w-1/4 bg-white  p-5 rounded-lg shadow-lg font-bold flex flex-col justify-center justify-items-center content-center'>
                            <div className='flex justify-center py-5'>
                                <img src="/img/avatar-masculino.png" alt="avatar masculino" className='w-1/2' />
                            </div>
                            {/* <div>
                            </div> */}
                            <div>
                                <p className='text-color2'>
                                    Nombre y Apellido: <span className='font-normal text-black'>Victor Maldonado</span>
                                </p>
                                <p className='text-color2'>
                                    Rol: <span className='font-normal text-black'>Desarrollador Backend</span>
                                </p>
                                <p className='text-color2'>
                                    Correo: <span className='font-normal text-black'>victoramaldonadog@gmail.com</span>
                                </p>
                                <p className='text-color2'>
                                    Telegram: <span className='font-normal text-black'>@VictorM42069</span>
                                </p>
                                <p className='text-color2'>
                                    Github: 
                                    <span className='font-normal text-black'>
                                        <a href="https://github.com/KOH1918" target="_blank"> @KOH1918</a>
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className='w-1/4 bg-white  p-5 rounded-lg shadow-lg font-bold flex flex-col justify-center justify-items-center content-center'>
                            <div className='flex justify-center py-5'>
                                <img src="/img/avatar-femenino.png" alt="avatar femenino" className='w-1/2' />
                            </div>
                            <div>
                                <p className='text-color2'>
                                    Nombre y Apellido: <span className='font-normal text-black'>Adriana Moncada</span>
                                </p>
                                <p className='text-color2'>
                                    Rol: <span className='font-normal text-black'>Desarrolladora Frontend</span>
                                </p>
                                <p className='text-color2'>
                                    Correo: <span className='font-normal text-black'>moncadaadriana2@gmail.com</span>
                                </p>
                                <p className='text-color2'>
                                    Telegram: <span className='font-normal text-black'>@adrimoncada</span>
                                </p>
                                <p className='text-color2'>
                                    Github:
                                    <span className='font-normal text-black'>
                                        <a href="https://github.com/Adrimoncada2" target="_blank"> @Adrimoncada2</a>
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className='w-1/4 bg-white  p-5 rounded-lg shadow-lg font-bold flex flex-col justify-center justify-items-center content-center'>
                            <div className='flex justify-center py-5'>
                                <img src="/img/avatar-masculino.png" alt="avatar masculino" className='w-1/2' />
                            </div>
                            <div>
                                <p className='text-color2'>
                                    Nombre y Apellido: <span className='font-normal text-black'>Roque Lopez</span>
                                </p>
                                <p className='text-color2'>
                                    Rol: <span className='font-normal text-black'>Desarrollador Fullstack</span>
                                </p>
                                <p className='text-color2'>
                                    Correo: <span className='font-normal text-black'>roquel371@gmail.com</span>
                                </p>
                                <p className='text-color2'>
                                    Telegram: <span className='font-normal text-black'>@RoqueLopez</span>
                                </p>
                                <p className='text-color2'>
                                    Github: 
                                    <span className='font-normal text-black'>
                                        <a href="https://github.com/Rell-Developer" target="_blank"> @Rell-Developer</a>     
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tutora */}
                <div className='w-full'>
                    {/* Titulo */}
                    <div className='w-full py-10'>
                        <h1 className='text-4xl text-color2 font-bold text-center'>
                            Tutora
                        </h1>
                    </div>

                    {/* Tarjetas */}
                    <div className='w-full flex justify-center'>

                        {/* Tarjeta 1 */}
                        <div className='w-1/4 bg-white  p-5 rounded-lg shadow-lg font-bold flex flex-col justify-center justify-items-center content-center'>
                            <div className='flex justify-center py-5'>
                                <img src="/img/avatar-femenino.png" alt="avatar femenino" className='w-1/2' />
                            </div>
                            <div>
                                <p className='text-color2'>
                                    Nombre y Apellido: <span className='font-normal text-black'>Adriana Roa</span>
                                </p>
                                <p className='text-color2'>
                                    Rol: <span className='font-normal text-black'>Tutora</span>
                                </p>
                                {/* <p className='text-color2'>
                                    Correo: <span className='font-normal text-black'>victoramaldonadog@gmail.com</span>
                                </p> */}
                                <p className='text-color2'>
                                    Telegram: <span className='font-normal text-black'>@Roa45</span>
                                </p>
                                {/* <p className='text-color2'>
                                    Github: 
                                    <span className='font-normal text-black'>
                                        <a href="https://github.com/KOH1918" target="_blank"> @KOH1918</a>
                                    </span>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Desarrolladores