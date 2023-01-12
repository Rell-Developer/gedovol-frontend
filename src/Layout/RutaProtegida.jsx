import Navegador from '../components/publicos/Navegador.jsx';
import Usuarios from '../paginas/privadas/Usuarios.jsx';
import Donantes from '../paginas/privadas/Donantes.jsx';
import Footer from '../components/publicos/Footer.jsx';
import BurbujaNotificacion from '../components/privados/notificaciones/BurbujaNotificacion.jsx';

import CuentaNoConfirmada from '../paginas/privadas/CuentaNoConfirmada.jsx';

import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../hooks/useAuth.jsx';
import ModalNotificaciones from '../components/privados/notificaciones/ModalNotificaciones.jsx';

const RutaProtegida = () => {

    const {auth, cargando} = useAuth();   

    // console.log(auth);

    if(cargando) return 'Cargando...'

    let data = JSON.parse(localStorage.getItem('data'));
    

    // Retorno HTML
    return (
        <>
            {
                data ? 
                    data.confirmado ? (
                        <main className='w-full flex'>
                            <Navegador/>
                            <div className='flex flex-col w-full bg-color1'>
                                <div className="flex content-center" style={{height: "90vh"}}>
                                
                                    {data.token ? <Outlet />: <Navigate to="/" />}
                                    
                                    <div className={`${data.rol !== 'administrador' ? 'hidden' : ''} w-5/6 bg-red flex justify-end absolute mt-3`}>
                                        <ModalNotificaciones/>
                                    </div>
                                </div>
                                <div style={{height: "10vh"}}>
                                    <div className={`${data.rol !== 'administrador' ? 'hidden' : ''} w-full bg-red flex justify-end`}>
                                        <BurbujaNotificacion/>
                                    </div>
                                    <Footer/>   
                                </div>
                            </div>
                        </main>
                    ):
                        <CuentaNoConfirmada/>
                : <Navigate to="/" />               
            }
            {/* <main className='w-full flex'>
                <Navegador/>
                <div className='flex flex-col w-full bg-white'>
                    <div style={{height: "90vh"}}>
                    
                        {auth?.token ? <Outlet />: <Navigate to="/" />}
                    </div>
                    <div style={{height: "10vh"}}>
                        <Footer/>   
                    </div>
                </div>
            </main> */}
        </>
    )
}

export default RutaProtegida