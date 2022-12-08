import {useContext} from 'react'
import UsuariosContext from '../context/UsuariosProvider.jsx';

const useUsuarios = () => {
    return useContext(UsuariosContext)
}

export default useUsuarios