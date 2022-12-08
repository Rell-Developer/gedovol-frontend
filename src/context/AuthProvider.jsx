import React, {useState, useEffect, createContext} from 'react'

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    // Variables y states
    const [auth, setAuth] = useState({});


    // Retorno de contenido
    return (
        <AuthContext.Provider>
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider,
}

export default AuthContext