import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// ===== Componentes =====
import Alerta from '../../components/publicos/Alerta.jsx';
import Header from "../../components/publicos/Header.jsx";
import Footer from "../../components/publicos/Footer.jsx";
import ContenedorHeartSpinner from "../../components/publicos/ContenedorHeartSpinner.jsx";
import TokenInvalidoMSG from "../../components/publicos/TokenInvalidoMSG.jsx";

// Config
import clienteAxios from "../../config/axios.jsx";

const confirmarCuenta = () => {

    // useStates
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [tokenValido, settokenValido] = useState(null);
    const [redireccion, setRedireccion] = useState(false);
    const [loading, setLoading] = useState(true);
    
    // useParams
    const params = useParams();
    const {token} = params;
    // console.log('El token en parametros')
    // console.log(token)

    // useNavigate
    const navigate = useNavigate();
    
    // === Componentes ===
    const [alerta, setAlerta] = useState({});

    // === UseEffects ===
    useEffect(()=>{

        const comprobarToken = async() =>{
            try {
                
                // Peticion HTTP
                const {data} = await clienteAxios(`/usuario/confirmar-cuenta/${token}`);
                console.log(data)

                setTimeout(() => {  
                    
                    // Si se encuentra un error
                    if(data.error){
                        settokenValido(false);
                        setLoading(false)
                        return
                    }
    
                    // Cambiando valores para que se muestre el formulario
                    setLoading(false);
                    settokenValido(true);
                }, 1500);
            } catch (error) {
                // Mostrando mensaje de error por consola
                console.log(error.message);
            }
        }

        comprobarToken();
    }, []);
    
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

        try {
            // Mostrando componente de cargando
            setLoading(true);

            // Cambiando la contraseña
            let {data} = await clienteAxios.put(`/usuario/resetear-password`, {password, token, accion: 'confirmacion-usuario'});
    
            setTimeout(async() => {
                
                // Ocultando el componente de cargando
                setLoading(false);

                // Se muestra el mensaje de alerta de error
                if(data.error){
                    setAlerta({msg:data.message, error: true});
                    return
                }
        
                // Redirigiendo
                setRedireccion(true);
        
                // Se manda a crear la notificacion
                // let actualizado = await clienteAxios.put(`/notificacion/cuenta-confirmada`, {});
        
                // Redirigiendo al inicio en 10s
                setTimeout(() => navigate('/'), 6000);
            }, 1500);
        } catch (error) {
            // Mostrando el mensaje de error por consola
            console.log(error.message);
        }

    }


    // Obteniendo el mensaje de la alerta
    const {msg} = alerta;
    return (
        <>
            {/* Aparece el mensaje */}
            {msg && <Alerta alerta={alerta}/>}

            {/* Encabezado */}
            <Header/>
            
            {/* Contenido */}
            <section className='w-full flex flex-col justify-evenly items-center content-center' style={{height: "80vh"}}>
                {!loading ? (
                    <>
                        {tokenValido ? (
                            <>
                                {/* Contenido */}
                                <div className='flex flex-col justify-center items-center content-center justify-items-center w-3/5'>
                                    {/* Descripcion */}
                                    <div className='flex'>
                                        <form action="" className='bg-color2 p-14 rounded-xl shadow-lg' onSubmit={handleSubmit}>
                                            {!redireccion ? (
                                                <>
                                                    {/* Titulo */}
                                                    <div className="text-white text-xl uppercase font-bold">
                                                        <h2>
                                                            Cambia tu Contraseña y Confirmaras tu cuenta 
                                                        </h2>
                                                    </div>
        
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
                                                        <input type="submit" value="Guardar Contraseña" className='w-full bg-color4 text-white py-4 rounded-lg font-bold cursor-pointer'/>
                                                    </div>
                                                
                                                </>
                                            ):(
                                                <div className='flex flex-col justify-center items-center content-center text-center'>
                                                    <h2 className="text-3xl text-white font-bold">
                                                        Tu Cuenta ha sido Confirmada con Éxito
                                                    </h2>
                                                    <h4 className="text-2xl text-white">
                                                        Te redirigiremos al inicio en un momento
                                                    </h4>
        
                                                    <div class="lds-heart">
                                                        <div></div>
                                                    </div>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </div>
                            </>
                        ):(
                            <>
                                <div className="bg-color2 py-4 w-5/6 lg:w-2/5 lg:p-14 mx-auto my-5 lg:m-10 rounded-xl shadow-lg text-white">
                                    {/* Contenedor de Token Invalido */}
                                    <TokenInvalidoMSG datos={{title:'Token Invalido o Inexistente',direction:'/'}}/>
                                </div>
                            </>
                        )}
                    </>
                ):(
                    <div className='flex flex-col justify-center items-center content-center justify-items-center w-3/5'>
                        <div className="flex">
                            <div className='bg-color2 p-14 rounded-xl shadow-lg'>
                                <ContenedorHeartSpinner/>
                            </div>
                        </div>
                    </div>
                )}
            </section>
            {/* Creditos */}
            <Footer/>
        </>
    )
}

export default confirmarCuenta