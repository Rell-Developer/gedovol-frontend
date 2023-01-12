// Importaciones
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


// Componentes
import Header from "../../components/publicos/Header.jsx";
import Alerta from "../../components/publicos/Alerta.jsx";
import Footer from "../../components/publicos/Footer.jsx";

// config para peticiones
import clienteAxios from "../../config/axios.jsx";

// Pagina
const RecuperarPassword = () => {

    // useStates
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(null);
    const [redireccion , setRedireccion] = useState(false);

    // Declaracion del navegador
    const navigate = useNavigate();

    // Obtencion de los parametros del URL
    const params = useParams();

    // useEffect
    useEffect(() => {
        const tokenVerify = async() => {

            setTimeout(async() => {
                // Obtenemos el token de los parametros
                const {token} = params;
                
                // Peticion de http para obtener si el token existe o no
                let {data} = await clienteAxios(`/usuario/buscar-token/${token}`);
    
                // Si detecta un error
                if(data.error){
                    setTokenValido(false);
                    return
                }
    
                setTokenValido(true);
            }, 2000);
        }

        tokenVerify();
    }, [])
    

    // Al responder el formulario
    const handleSubmit = async(e) => {
        
        e.preventDefault();

        // Verificando

        // Si alguno de los campos esta vacio
        if([password, repetirPassword].some( element => element === '')){
            setAlerta({msg:'Todos los campos son obligatorios', error:true});
            setTimeout(() => setAlerta({}), 2500);
            return
        }

        // Si la contraseña es menor a 6 caracteres
        if(password.length < 6){
            setAlerta({msg:'La contraseña debe tener más de 6 caracteres', error:true});
            setTimeout(() => setAlerta({}), 2500);
            return
        }

        // Si las contraseñas no coinciden
        if(password !== repetirPassword){
            setAlerta({msg:'Las contraseñas no son iguales', error:true});
            setTimeout(() => setAlerta({}), 2500);
            return
        }


        try {
            // se obtiene el token
            const {token} = params;

            // Peticion http para formatear la contraseña
            let {data} = await clienteAxios.put('/usuario/resetear-password', {password, token, accion: 'recuperacion-usuario'});
            
            // Colocando nulo el token para que salga la animacion del loading
            setTokenValido(null);
            
            setTimeout(() => {
                
                // Verificando si hay algun error
                if(data.error){
                    setTokenValido(true);
                    setAlerta({msg: data.message, error:true});
                    setTimeout(() => setAlerta({}), 2500);
                    return
                }

                document.querySelector('#formulario').classList.add('hidden');
                document.querySelector('#spinner-heart').classList.add('hidden');
                setRedireccion(true);

                setTimeout(() => navigate('/'), 5000);
            }, 3000);

        } catch (error) {
            console.log(error.message);
        }

        // Mensaje de 
        // setAlerta({msg:"Cambiando contraseña"});
        // setTimeout(() => setAlerta({}), 2500);
    }

    // Extrayendo el mensaje
    const {msg} = alerta;


    return (
        <>
            {/* Aparece el mensaje */}
            {msg && <Alerta alerta={alerta}/>}

            <div className="flex justify-between flex-col">
                {/* Encabezado */}
                <Header/>

                {/* Contenido */}
                <section className='w-full h-full bg-color1 flex justify-center items-center my-5' style={{height:"80vh"}}> 
                    <div className='bg-color2 w-1/3 p-14 py-20 m-10 rounded-lg shadow-lg'>
                        <form id="formulario" onSubmit={handleSubmit} className={`${tokenValido ? '':'hidden'}`}>
                            <div>
                                <div className="text-center">
                                    <h2 className='font-bold text-2xl text-white'>
                                        Recupere su Contraseña y no pierda su usuario
                                    </h2>
                                </div>

                                <div className='flex flex-col py-5'>
                                    <label htmlFor="" className='text-white font-bold text-xl py-2 flex items-center'>
                                        <svg className="w-8 h-8 flex" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                                        Nueva Contraseña
                                    </label>
                                    <input 
                                        className='bg-white p-2 rounded-lg border-4 border-gray-200' 
                                        placeholder='Ingrese su nueva contraseña'
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
                                        placeholder='Repita su nueva contraseña'
                                        type="password"
                                        value={repetirPassword}
                                        onChange={e => setRepetirPassword(e.target.value)}
                                        />
                                </div>
                            </div>

                            <div className='w-full mt-5 flex justify-center'>
                                <input type="submit" value="Ingresar" className='w-3/4 bg-color4 text-white py-4 rounded-lg font-bold cursor-pointer'/>
                            </div>
                        </form>

                        {   tokenValido != true &&
                            <div className="w-full flex flex-col justify-center text-white">
                                {tokenValido == null ? (
                                    <div id="spinner-heart" className="mx-auto">
                                        <div className="lds-heart">
                                            <div></div>
                                        </div>
                                        <h2>
                                            Cargando...
                                        </h2>
                                    </div>
                                ):(
                                    <>
                                        <div className="mx-auto flex flex-col justify-center">
                                            <h2 className="text-2xl uppercase font-bold">
                                                Token Invalido o Inexistente
                                            </h2>

                                            <div className="mx-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-broken" width="88" height="88" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                                    <path d="M12 7l-2 4l4 3l-2 4v3" />
                                                </svg>
                                            </div>

                                            <div className="mx-auto">
                                                <button
                                                    type="button"
                                                    className="bg-color1 py-2 px-4 text-black rounded-lg shadow mt-5 hover:bg-white transition-all"
                                                    onClick={e => navigate('/')}
                                                >
                                                    Regresar al Inicio
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        }

                        <div className={`${redireccion ? 'flex flex-col justify-center items-center content-center': 'hidden'}`}>
                            <h2 className="text-3xl text-white font-bold text-center mb-2 uppercase">
                                Se ha recuperado tu contraseña con éxito
                            </h2>
                            <h4 className="text-2xl text-white text-center">
                                Te redirigiremos al inicio en un momento
                            </h4>


                            <div class="lds-heart">
                                <div></div>
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Creditos  */}
                <Footer/>
            </div>
        </>
    )
}

export default RecuperarPassword