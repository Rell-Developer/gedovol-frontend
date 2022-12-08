import Navegador from '../components/Navegador.jsx';
import Usuarios from '../paginas/privadas/Usuarios.jsx';
import Donantes from '../paginas/privadas/Donantes.jsx';
import Footer from '../components/Footer.jsx';


import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth.jsx';

const RutaProtegida = () => {

    const {auth, cargando} = useAuth();   

    // console.log(auth);

    if(cargando) return 'Cargando...'

    // Retorno HTML
    return (
        <>
            <main className='w-full flex'>
                <Navegador/>
                <div className='flex flex-col w-full bg-white'>
                    <div style={{height: "90vh"}}>
                    
                        {auth?.token ? <Outlet />: <Navigate to="/" />}
                    </div>
                    <div style={{height: "10vh"}}>
                        <Footer/>   
                    </div>
                </div>
            </main>
        </>
    )
}

export default RutaProtegida