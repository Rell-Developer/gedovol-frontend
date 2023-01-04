// Librerias
import { useState, useEffect } from "react";

// Axios
import clienteAxios from "../../config/axios";

// Componentes
import Alerta from '../../components/publicos/Alerta.jsx';
import RedHeartSpinner from '../../components/publicos/RedHeartSpinner.jsx';

const Perfil = () => {

    // useStates
    const [usuario, setUsuario] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [rol, setRol] = useState('');
    const [confirmado, setConfirmado] = useState(false);
    
    const [password, setPassword] = useState('');
    const [nuevoPassword, setNuevoPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [editando, setEditando] = useState(false);
    const [cambiarPassword, setcambiarPassword] = useState(false);

    const [alerta, setAlerta] = useState({});

    useEffect(() =>{

        busquedaPerfil();
    },[])

    const busquedaPerfil = async() =>{

        try {
            let id = JSON.parse( localStorage.getItem('data')).id;
            console.log(id)
            let {data} = await clienteAxios(`/usuario/buscar-perfil/${id}`);
            console.log(data)
            datosPerfil(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const datosPerfil = (data) =>{
        setUsuario(data.usuario);
        setCedula(data.cedula);
        setCorreo(data.correo);
        setRol(data.rol);
        setConfirmado(data.confirmado);
    }

    const botonEditar = async() =>{

        if(editando){

            // Verificacion de los campos
            if(usuario === "" || cedula === "" || correo === "" || correo === null || usuario === null || cedula === null){
                setAlerta({error: true,msg:'Todos los campos son obligatorios'});
                setTimeout(() => setAlerta({}), 3000);
                return
            }

            try {

                let divsDinamicos = document.querySelectorAll('.contenido-dinamico');
                let spinner = document.querySelector('#div-spinner');
                let btns = document.querySelectorAll('.div-btn');

                divsDinamicos.forEach( div => {
                    div.classList.add('hidden');
                });

                spinner.classList.add('flex');
                spinner.classList.remove('hidden');

                ocultarBotones('agregar-hidden', btns);

                let id = JSON.parse( localStorage.getItem('data')).id;

                // Se realiza la petición http para actualizar los datos del usuario
                let {data} = await clienteAxios.put('/usuario/actualizar-usuario', {usuario, cedula,correo, rol, id});

                setTimeout(async() => {
                    
                    // Se ha encontrado un error y se muestra por pantalla un mensaje
                    if(data.error){
                        await busquedaPerfil();
                        setAlerta({error: true,msg:data.message});
                    }else{
                        setAlerta({msg:data.message});
                    }
                    
                    divsDinamicos.forEach( div => {
                        div.classList.remove('hidden');
                    });
    
                    spinner.classList.remove('flex');
                    spinner.classList.add('hidden');
    
                    setTimeout(() => setAlerta({}), 3000);

                    ocultarBotones('ocultar-hidden', btns);
                }, 2000);
                
            } catch (error) {
                console.log(error.message);
            }

            setEditando(false);
        }else{
            setEditando(true);
        }
    }

    const cambiarPass = async() =>{

        if(password === "" || nuevoPassword === "" || repetirPassword === ""){
            setAlerta({error: true,msg:'Todos los campos son obligatorios'});
            setTimeout(() => setAlerta({}), 3000);
            return
        }

        if(nuevoPassword !== repetirPassword){
            setAlerta({error: true,msg:'Al repetir la contraseña debe ser igual a la nueva contraseña'});
            setTimeout(() => setAlerta({}), 3000);
            return
        }

        // si la contraseña tiene menos de 7 caracteres
        if(nuevoPassword.length < 6){
            setAlerta({msg:"La contraseña debe tener más de 6 caracteres", error: true});
            setTimeout(() => setAlerta({}), 3000);
            return
        }

        try {

            let divsDinamicos = document.querySelectorAll('.contenido-dinamico');
            let spinner = document.querySelector('#div-spinner');
            let btns = document.querySelectorAll('.div-btn');

            divsDinamicos.forEach( div => {
                div.classList.add('hidden');
            });

            spinner.classList.add('flex');
            spinner.classList.remove('hidden');

            ocultarBotones('agregar-hidden', btns);

            let id = JSON.parse( localStorage.getItem('data')).id;
            let {data} = await clienteAxios.put('/usuario/cambiar-password', {password, nuevoPassword, id});

            setTimeout(async() => {
                
                // Se ha encontrado un error y se muestra por pantalla un mensaje
                if(data.error){
                    setAlerta({error: true,msg:data.message});
                }else{
                    setAlerta({msg:data.message});
                }
                
                divsDinamicos.forEach( div => {
                    div.classList.remove('hidden');
                });

                spinner.classList.remove('flex');
                spinner.classList.add('hidden');

                setTimeout(() => setAlerta({}), 3000);

                ocultarBotones('ocultar-hidden', btns);

                
                setPassword('');
                setNuevoPassword('');
                setRepetirPassword('');

                setEditando(false);
                setcambiarPassword(false);
            }, 2000);

        } catch (error) {
            console.log(error.message);
        }
    }

    const ocultarBotones = (accion, btns) =>{
        if(accion == 'agregar-hidden'){
            btns.forEach( divBtn => divBtn.classList.add('hidden'));
        }else{
            btns.forEach( divBtn => divBtn.classList.remove('hidden'));
        }
    }

    let {msg} = alerta;

    // Retorno de renderizado
    return (
        <>
            {msg && <Alerta alerta={alerta}/>}

            <div className="w-full flex justify-between p-5 bg-color1">
                {/* Perfil de Usuario */}
                <div className="bg-white w-9/12 mx-2 rounded-lg flex flex-col justify-around">

                    {!cambiarPassword ? 
                        <>
                            {/* Información Personal */}
                            <div className="mx-5 contenido-dinamico">
                                {/* Titulo */}
                                <div>
                                    <h2 className="text-2xl font-bold uppercase text-color3">
                                        Información Personal
                                    </h2>
                                </div>

                                {/* Contenido */}
                                <div className="flex justify-around w-full my-3">
                                    <div>
                                        <h3 className="font-bold my-3 text-xl">
                                            Nombre de Usuario
                                        </h3>

                                        {!editando ? 
                                            <h3 className="text-xl">
                                                {usuario}
                                            </h3>
                                        :null}

                                        {editando &&
                                        
                                            <input 
                                                className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200 transition-all' 
                                                placeholder='Ingrese su usuario' 
                                                type="text" 
                                                autoComplete='off'
                                                value={usuario}
                                                onChange={e => setUsuario(e.target.value)}
                                            />
                                        }
                                    </div>

                                    <div>
                                        <h3 className="font-bold my-3 text-xl">
                                            Cédula de Identidad
                                        </h3>

                                        {!editando ? 
                                            <h3 className="text-xl">
                                                {cedula}
                                            </h3>
                                        :null}

                                        {editando &&
                                        
                                            <input 
                                                className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                                placeholder='Ingrese su Cedula. Ejemplo: 20123456' 
                                                type="number" 
                                                autoComplete='off'
                                                min="1"
                                                value={cedula}
                                                onChange={e => setCedula(e.target.value)}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Información de Contacto */}
                            <div className="mx-5 contenido-dinamico">
                                {/* Titulo */}
                                <div>
                                    <h2 className="text-2xl font-bold uppercase text-color3">
                                        Información de Contacto
                                    </h2>
                                </div>

                                {/* Contenido */}
                                <div className="flex justify-around w-full my-3">
                                    <div>
                                        <h3 
                                            className="font-bold my-3 text-xl"
                                        >
                                            Correo Electronico
                                        </h3>

                                        {!editando ? 
                                            <h3 className="text-xl">
                                                {correo}
                                            </h3>
                                        :null}
                                        

                                        {editando &&
                                        
                                            <input 
                                                className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200' 
                                                placeholder='Ingrese el correo electronico' 
                                                type="email" 
                                                autoComplete='off'
                                                value={correo}
                                                onChange={e => setCorreo(e.target.value)}
                                            />
                                        }
                                    </div>

                                    <div>
                                        <h3 
                                            className="font-bold my-3 text-xl"
                                        >
                                            N° de Telefono #1
                                        </h3>

                                        {!editando ? 
                                            <h3 className="text-xl">
                                                0412-2356870
                                            </h3>
                                        :null}
                                    </div>
                                </div>
                            </div>
                        </>
                    :
                        <>
                            {/* Cambiar Contraseña */}
                            <div className="mx-auto text-center contenido-dinamico">
                                {/* Titulo */}
                                <div>
                                    <h2 className="text-3xl font-bold uppercase text-color3">
                                        Cambio de Contraseña
                                    </h2>
                                </div>

                                {/* Contenido */}
                                <div className="flex flex-col justify-around w-full my-3">
                                    <div>
                                        <h3 
                                            className="font-bold my-5 text-xl"
                                        >
                                            Ingrese su Actual Contraseña
                                        </h3>

                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200 w-full' 
                                            type="password" 
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <h3 
                                            className="font-bold my-5 text-xl"
                                        >
                                            Ingrese su Nueva Contraseña
                                        </h3>

                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200 w-full' 
                                            type="password" 
                                            value={nuevoPassword}
                                            onChange={e => setNuevoPassword(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <h3 
                                            className="font-bold my-5 text-xl"
                                        >
                                            Repita su Nueva Contraseña
                                        </h3>

                                        <input 
                                            className='bg-white p-1 text-sm rounded-lg border-4 border-gray-200 w-full'
                                            type="password" 
                                            value={repetirPassword}
                                            onChange={e => setRepetirPassword(e.target.value)}
                                        />
                                    </div>

                                </div>
                            </div>
                        </>
                    }

                    <div id="div-spinner" className="mx-auto flex-col content-center hidden">
                        <RedHeartSpinner/>
                        <h2 className="font-bold">
                            Cargando...
                        </h2>
                    </div>
                </div>

                {/* Contenedor de Imagen y Nombre de Usuario */}
                <div className="bg-white flex flex-col p-5 justify-center text-center justify-items-center w-1/4 mx-2 rounded-lg">
                    <div className='w-full flex justify-center'>
                        <svg className="w-1/2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                        </svg>
                    </div>

                    <div>
                        <h2 className="font-bold text-3xl flex items-center text-center justify-center">
                            {usuario}
                            {confirmado ? 
                                <svg class="w-6 h-6" fill="#D80404" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                                </svg>
                            : null}
                        </h2>
                    </div>

                    <div className="my-2">
                        <h2 className="font-bold text-xl">
                            {cedula}
                        </h2>
                    </div>

                    <div>
                        <h2>
                            {rol}
                        </h2>
                    </div>

                    <div className="my-5">
                        {!cambiarPassword ?
                            <div className="div-btn">
                                <button
                                    className="bg-color3 p-3 font-bold text-white rounded-lg shadow my-2"
                                    onClick={()=> botonEditar()}
                                >
                                    {editando ? 'Guardar Cambios': 'Editar Perfil'}
                                </button>
                            </div>
                        : null}

                        {cambiarPassword ? 
                            <div className="div-btn">
                                <button
                                    className="bg-color3 p-3 font-bold text-white rounded-lg shadow my-2"
                                    onClick={() => cambiarPass()}
                                >
                                    Guardar Contraseña
                                </button>
                            </div>
                        :null}

                        {!editando ?
                            <div className="div-btn">
                                <button
                                    className="bg-color3 p-3 font-bold text-white rounded-lg shadow my-2"
                                    onClick={() => setcambiarPassword(!cambiarPassword)}
                                >
                                    {cambiarPassword ? 'Cancelar Cambios': 'Cambiar Contraseña'}
                                </button>
                            </div>
                        :
                            <div className="div-btn">
                                <button
                                    className="bg-color3 p-3 font-bold text-white rounded-lg shadow my-2"
                                    onClick={()=> setEditando(!editando)}
                                >
                                    Cancelar Cambios
                                </button>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default Perfil