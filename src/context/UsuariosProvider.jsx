import { createContext, useEffect, useState } from "react"
import clienteAxios from "../config/axios.jsx"

const UsuariosContext = createContext();

const UsuariosProvider = ({children}) => {

    const [usuarios, setUsuarios] = useState([]);

    const guardarUsuario = async(usuario)=>{
        console.log(usuario);

        // try {
            
        //     // Peticion http
        //     let {data} = await clienteAxios.post('/usuario/registrar-usuario', {usuario, cedula, password, rol});

        //     // console.log('resultado');
        //     // console.log(resultado);

        //     if(data.error){
        //         setAlerta({error:true, msg: data.message});
        //     }else{
        //         setAlerta({msg: data.message});
        //     }

        //     setTimeout(() => setAlerta({}), 3000);
        // } catch (error) {
        //     console.log(error.message);
        // }
    }

    return (
        <UsuariosContext.Provider
            value={{
                usuarios,
                guardarUsuario
            }}
        >
            {children}
        </UsuariosContext.Provider>
    )
}

export{
    UsuariosProvider
}

export default UsuariosContext;