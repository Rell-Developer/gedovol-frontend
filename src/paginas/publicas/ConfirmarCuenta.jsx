import { useState } from "react";
import { Link } from "react-router-dom";

// ===== Componentes =====
import Alerta from '../../components/Alerta.jsx';
import Footer from "../../components/Footer.jsx";
import clienteAxios from "../../config/axios.jsx";

const confirmarCuenta = () => {

    // useStates
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    // === Componentes ===
    const [alerta, setAlerta] = useState({});
    
    // ========= Funciones =========
    const handleSubmit = async(e) =>{
        e.preventDefault();

        // Verificaciones
        if(password === '' || repetirPassword === ''){
            setAlerta({msg:"Todos los campos son obligatorios", error: true});
            return
        }

        // si la contraseña tiene menos de 7 caracteres
        if(password.length < 6){
            setAlerta({msg:"La contraseña debe tener más de 6 caracteres", error: true});
            return
        }

        // Si las contraseñas no coinciden
        if(password !== repetirPassword){
            setAlerta({msg:"Las contraseñas no coinciden", error: true});
            return
        }

        let token = 'dasdasdad'

        // Cambiando la contraseña
        let {data} = await clienteAxios.put(`/usuario/cambiar-password`, {password, token});

        if(!data){
            setAlerta({msg:'Ha Ocurrido un Problema Interno', error: true});
            return
        }
        if(data.error){
            setAlerta({msg:data.message, error: true});
            return
        }

        setAlerta({msg:data.message})
    }


    // Obteniendo el mensaje de la alerta
    const {msg} = alerta;
    return (
        <>
            {/* Aparece el mensaje */}
            {msg && <Alerta alerta={alerta}/>}

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
            <section className='w-full flex flex-col justify-evenly items-center content-center' style={{height: "80vh"}}>
                {/* Titulo */}
                <div className='my-5 flex items-center'>
                    {/* <img src="/img/no-hay-resultados.png" alt="" width="60" className="mx-2"/> */}
                    <h2 className='text-4xl font-bold mx-2'>Cambia tu contraseña y Confirmarás tu cuenta</h2>
                </div>

                {/* Contenido */}
                <div className='flex flex-col justify-center items-center content-center justify-items-center w-3/5'>

                    {/* Descripcion */}
                    <div className='flex'>
                        <form action="" className="bg-color2 p-14 rounded-xl shadow-lg" onSubmit={handleSubmit}>
                            <div>
                                <div className='flex flex-col py-5'>
                                    <label htmlFor="" className='text-white font-bold text-xl py-2 flex items-center'>
                                        <svg className="w-8 h-8 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                        Contraseña
                                    </label>
                                    <input 
                                        className='bg-white p-2 rounded-lg border-4 border-gray-200' 
                                        placeholder='Ingrese su contraseña'
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        />
                                </div>

                                <div className='flex flex-col py-5'>
                                    <label htmlFor="" className='text-white font-bold text-xl py-2 flex items-center'>
                                        <svg className="w-8 h-8 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                        Repita la Contraseña
                                    </label>
                                    <input 
                                        className='bg-white p-2 rounded-lg border-4 border-gray-200' 
                                        placeholder='Ingrese su contraseña'
                                        type="password"
                                        value={repetirPassword}
                                        onChange={e => setRepetirPassword(e.target.value)}
                                        />
                                </div>
                            </div>

                            <div className='w-full mt-5 flex justify-center'>
                                <input type="submit" value="Guardar Contraseña" className='w-3/4 bg-color4 text-white py-4 rounded-lg font-bold cursor-pointer'/>
                            </div>
                        </form>
                    </div>


                    {/* Boton de Retorno */}
                    {/* <Link
                        to="/admin"
                    >
                        <button
                            className='ml-5 mt-5 cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow-lg transition-all' 
                        >
                            Regresar al Inicio
                        </button>
                    </Link> */}
                </div>
            </section>
            {/* Creditos */}
            {/* <Footer/> */}
        </>
    )
}

export default confirmarCuenta