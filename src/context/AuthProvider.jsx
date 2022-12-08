import React, {useState, useEffect, createContext} from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    // Variables y states
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    // Declaracion del navegador
    const navigate = useNavigate();

    useEffect(()=> authSesion(), []);

    const authSesion = () =>{
        // Consulta del token
        let data = JSON.parse(localStorage.getItem('data'));

        setAuth(data);
        setCargando(false);
            
        // Verificacion si existe el token, encaso de que no, lo regresa al login
        // if(!data.token){
        //     navigate('/');
        // }
    }

    // Retorno de contenido
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider,
}

export default AuthContext