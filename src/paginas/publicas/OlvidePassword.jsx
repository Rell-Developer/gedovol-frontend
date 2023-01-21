// Importaciones
import { useState } from "react";

// Componentes
// Publicos
import Header from "../../components/publicos/Header.jsx";
import Footer from "../../components/publicos/Footer.jsx";
import Alerta from "../../components/publicos/Alerta.jsx";
import HeartSpinner from "../../components/publicos/HeartSpinner.jsx";

// Helpers
import emailValidator from "../../helpers/emailValidator.js";

// Config
import clienteAxios from "../../config/axios.jsx";

const OlvidePassword = () => {

    // UseStates
    const [email, setEmail]= useState('');
    const [alerta, setAlerta] = useState({});
    const [sendEmail, setSendEmail] = useState(false);
    const [msgBackend, setMsgBackend] = useState("");

    // Funcion para enviar datos del formulario
    const handleSubmit = async(e) =>{
        // Prevenir el efecto por default
        e.preventDefault();

        // Verificaciones
        // si el campo está vacio
        if(email === ''){
            setAlerta({msg: 'El campo es obligatorio', error: true});
            setTimeout(() => setAlerta({}), 2500);
            return
        }

        // Verificacion del email
        if(!emailValidator(email)){
            setAlerta({msg: 'Email no válido, por favor, verifique y en minúsculas', error: true});
            setTimeout(() => setAlerta({}), 2500);
            return
        }

        try {
            
            setSendEmail(true);
            let {data} = await clienteAxios.post('/usuario/olvide-password', {email});

            setTimeout(() => {
                if(data.error){
                    setAlerta({msg: data.message, error: true});
                    setTimeout(() => setAlerta({}), 2500);
                    setSendEmail(false);
                    return
                }
    
                setMsgBackend(data.message);
            }, 1500);
        } catch (error) {
            console.error(error.message);
        }
    }


    // Obteneiendo el msg de la alerta
    const {msg} = alerta
    // Retorno a renderizar
    return (
        <>
            {/* Encabezado */}
            <Header/>
        
            { msg && <Alerta alerta={alerta}/>}
            {/* Contenedor */}
            <section className='w-full h-full bg-color1 lg:flex lg:justify-center lg:items-center my-5'> 
                <div className='bg-color2 py-4 w-5/6 lg:w-2/5 lg:p-14 mx-auto my-5 lg:m-10 rounded-xl shadow-lg'>
                    { !sendEmail ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <div className="text-center">
                                    <h2 className='font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white'>
                                        Ingresa tu email para recuparar tu contraseña
                                    </h2>
                                </div>

                                <div className='flex flex-col py-2 lg:py-5 w-5/6 mx-auto'>
                                    <label htmlFor="" className='text-white font-bold lg:text-xl py-2 flex items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 lg:w-8 lg:h-8 flex mr-1">
                                            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                        </svg>

                                        Correo Electronico
                                    </label>
                                    <input 
                                        className='bg-white p-2 rounded-lg border-4 border-gray-200' 
                                        placeholder='Ingrese su correo electronico' 
                                        type="email" 
                                        autoComplete='off'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        />
                                </div>
                            </div>

                            <div className='w-full mt-5 flex justify-center'>
                                <input type="submit" value="Ingresar" className='w-3/4 bg-color4 text-white py-2 lg:py-4 rounded-lg font-bold cursor-pointer'/>
                            </div>
                        </form>
                    ):(
                        <>
                            <div className={`${msgBackend === '' ? 'hidden':''} text-white text-center`}>
                                <h2 className={`text-2xl uppercase font-bold`}>
                                    {msgBackend}
                                </h2>
                            </div>
                            <div className="text-center">
                                <HeartSpinner/>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Pie de Pagina */}
            <Footer/>
        </>
    )
}

export default OlvidePassword