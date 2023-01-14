import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import clienteAxios from '../../config/axios.jsx';

// Hooks y Context
import useAuth from '../../hooks/useAuth.jsx';

// Componentes
import Header from '../../components/publicos/Header';
import Footer from '../../components/publicos/Footer';
import Alerta from '../../components/publicos/Alerta';
import HeartSpinner from '../../components/publicos/HeartSpinner.jsx';
import ContenedorHeartSpinner from '../../components/publicos/ContenedorHeartSpinner.jsx';

const Login = () => {

    // Variables y UseStates
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [loading, setLoading] = useState(false);
    
    // Hooks
    const {auth, setAuth} = useAuth();

    // Mensaje de Alerta
    const {msg} = alerta

    // Decalarando el navegador
    const navigate = useNavigate();


    // Funciones
    const handleSubmit = async (e) =>{
        // Preveniendo la accion del formulario
        e.preventDefault();

        // Validacion
        if(usuario === '' || password === ''){
            setAlerta({msg:'Todos los campos son obligatorios', error: true});
            return
        }

        // Validacion de la contraseña
        if(password.length < 6){
            setAlerta({msg:'La contraseña debe tener más de 6 caracteres', error: true});
            return
        }

        try {            
            // Usuario Cargando
            setLoading(true);

            // Realizando Peticion
            let {data} = await clienteAxios.post('/usuario/login', {usuario, password});

            setTimeout(() => {
                //Si existe algun error en la consulta
                if(data.error){
                    // Se crea el mensaje de error
                    setAlerta({error: true, msg: data.message});
    
                    // Luego de tres segundos se esconde
                    setTimeout(() => setAlerta({}), 3000);
                    setLoading(false);
                    return
                }
    
                // Guardado en el localStorage en caso de que ingrese el usuario
                localStorage.setItem('data', JSON.stringify(data));
                navigate('/admin');
            }, 1500);
        } catch (error) {
            console.log(error.message);
            return
        }

        // Pasa la validacion
        console.log('Buscando en la base de datos');
        // if(usuario === 'admin@admin.com' && password === 'admin12345'){
        //     navigate('/admin/usuarios');
        // }
    }

    // Verificar si tiene sesion
    const tieneSesion = () =>{

        let data = JSON.parse(localStorage.getItem('data'));

        if(data.token){
            setAuth(data);
            navigate('/admin');
        }
    }

    // if(localStorage.getItem('data')){
    //     tieneSesion();
    // }

    // Retorno de Contenido
    return (
        <>
            {/* Aparece el mensaje */}
            {msg && <Alerta alerta={alerta}/>}

            <div className='flex justify-between flex-col'>
                {/* Encabezado */}
                <Header/>

                {/* Contenedor */}
                <main className='w-full h-full bg-color1 lg:flex lg:justify-center lg:items-center my-5'> 
                    <div className='bg-color2 py-4 w-5/6 lg:w-2/5 lg:p-14 mx-auto my-5 lg:m-10 rounded-xl shadow-lg'>
                        {!loading ? (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <div className="text-center">
                                        <h2 className='font-bold text-3xl lg:text-4xl text-white'>
                                            Bienvenido
                                        </h2>
                                    </div>

                                    <div className='flex flex-col py-2 lg:py-5 w-5/6 mx-auto'>
                                        <label htmlFor="" className='text-white font-bold lg:text-xl py-2 flex items-center'>
                                            <svg className="w-6 h-6 lg:w-8 lg:h-8 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                            Usuario
                                        </label>
                                        <input 
                                            className='bg-white w-full p-2 rounded-lg border-4 border-gray-200' 
                                            placeholder='Ingrese su usuario' 
                                            type="text" 
                                            autoComplete='off'
                                            value={usuario}
                                            onChange={e => setUsuario(e.target.value)}
                                            />
                                    </div>

                                    <div className='flex flex-col py-2 lg:py-5 w-5/6 mx-auto'>
                                        <label htmlFor="" className='text-white font-bold lg:text-xl py-2 flex items-center'>
                                            <svg className="w-6 h-6 lg:w-8 lg:h-8 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                            Contraseña
                                        </label>
                                        <input 
                                            className='bg-white w-full p-2 rounded-lg border-4 border-gray-200' 
                                            placeholder='Ingrese su contraseña'
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            />
                                    </div>
                                </div>

                                <div className='w-full mt-5 flex justify-center'>
                                    <input type="submit" value="Ingresar" className='w-3/4 bg-color4 text-white py-2 lg:py-4 rounded-lg font-bold cursor-pointer'/>
                                </div>

                                <p className='text-center mt-10 text-white'>
                                    ¿Olvidaste tu contraseña?,  
                                    <Link
                                        to="/olvide-password"
                                    >
                                        <span className='font-bold transition-all hover:text-pink-300'> Recuperala aquí.</span>
                                    </Link>
                                </p>
                            </form>
                        ):(
                            <>
                                <div className='text-center font-bold text-white'>
                                    <HeartSpinner />
                                    <h2>
                                        Cargando...
                                    </h2>
                                </div>
                            </>
                        )}
                    </div>
                </main>
                
                {/* Creditos  */}
                <Footer/>
            </div>
        </>
    )
}

export default Login