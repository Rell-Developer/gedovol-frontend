import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Componentes
// publicos
import Alerta from '../../../components/publicos/Alerta.jsx';
import RedHeartSpinner from '../../../components/publicos/RedHeartSpinner.jsx';

// Cliente Axios
import clienteAxios from '../../../config/axios.jsx';

const VerFormulario = () => {

    // UseStates
    const [values, setValues] = useState({
        donante:'',
        fechaDonadoUltimamente:'',
        fechaTatuadoUltimamente:'',
        enfermedadVenerea: '',
        estatus:'',
        seSienteBien:'',
        ingirioAlimentoUltimamente:'',
        rechazadoComoDonante:'',
        reaccionDonacion:'',
        conocioResultadosDonacion:'',
        diarreaGripeFiebreUltimamente:'',
        controlPorEnfermedad:'',
        sometidoCirugia:'',
        transfusionSangre:'',
        paludismoAlgunaVez:'',
        estadoAreaPaludicasUltimamente:'',
        hepatitisOrinaOscuraPielAmarrillaAlgunaVez:'',
        contactoConAlguienHepatitis:'',
        tieneTatuajesPiercings:'',
        recibidoHormona:'',
        tenidoFamiliaresEnfermedadTransplante:'',
        tomandoMedicamenteUltimamente:'',
        picadaChipoEnfermedadChagas:'',
        vacunacionesUltimoYear: '',
        tenidoRelacionesOtroHombre: '',
        relacionesProstitutasUltimamente: '',
        fechaDonacion:'',
        donante_id:'',
        ultima_donacion: '',
        ultimo_tatuaje:''
    });

    // Alerta
    const [alerta, setAlerta] = useState({});

    // UseStates para condicionales
    const [aparicionCalendarDonado, setAparacionCalendarDonadoUltimamente] = useState(false);
    const [aparicionCalendarTatuado, setAparacionCalendarTatuadoUltimamente] = useState(false);
    const [aparicionInputEnfermedadVenerea, setAparicionInputEnfermedadVenerea] = useState(false);
    const [segundaPaginado, setSegundaPaginado] = useState(false);
    const [loading, setLoading] = useState(true);
    const [msgGuardado, setMsgGuardado] = useState('');
    const [MSGError, setMSGError] = useState('');
    const [editando, setEditando] = useState(false);

    // Navegador
    const navigate = useNavigate();

    // Parametros
    const params = useParams();

    useEffect(()=>{

        console.log('en el nuevo jsx')


        buscarFormulario();
        setTimeout(() => setLoading(false), 1000);
    },[])
    
    const buscarFormulario = async() =>{
        console.log('Buscando datos');

        let {data} = await clienteAxios(`/formulario/obtener-formulario/${params.id}`);

        console.log(data);
        if(data.error){
            setMSGError(data.message);
            return
        }

        establecerValores(data);

    }

    // Al realizar un cambio en algun campo
    const actualizarInputs = (e) =>{
        //Destructuing y luego guardado de los datos
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }
    
    const cambioValorChecked = (e) =>{
        const {name, nextElementSibling} = e.target;
        setValues({
            ...values,
            [name]: nextElementSibling.textContent === ' Sí',
        });
    }

    const validarInputsBooleanos = ()=>{
        // Colocamos los valores del formulario en una variable para validar
        let objValidar = {...values};

        // Borrando propiedades para validar solo Inputs Booleanos
        delete objValidar.donante;
        delete objValidar.tipoSangre;
        delete objValidar.fechaDonadoUltimamente;
        delete objValidar.fechaTatuadoUltimamente;
        delete objValidar.enfermedadVenerea;
        delete objValidar.fechaDonacion;

        // Mutando el objeto a un array con sus valores
        objValidar = Object.values(objValidar);

        // Retorna false si al menos uno no ha sido seleccionado
        return objValidar.some(valor => valor !== '');
    }

    const handleSubmit = async() => {

        console.log(values.donante)

        if(!validarInputsBooleanos() || values.fechaDonacion === ''){
            setAlerta({msg:"Todos los campos son obligatorios", error:true});
            setTimeout(()=> setAlerta({}), 2000);
            return
        }

        try {
            setLoading(true);

            console.log(values);

            let {data} = await clienteAxios.put(`/formulario/actualizar-formulario/${params.id}`, values);

            setTimeout(() => {
                if(data.error){
                    setLoading(false);
                    setAlerta({msg: data.message, error:true});
                    setTimeout(()=> setAlerta({}), 2000);
                    return
                }
    
                setLoading(false);
                setMsgGuardado(data.message);

                setTimeout(() => navigate('/admin/formularios'), 1500);
            }, 1500);
        } catch (error) {
            console.log(error.message);
        }
    }

    const establecerValores = (data) =>{
        // Se crea una copia de la data
        let obj = {...data};

        // Se convierte las claves del objeto en un array y sus valores en otro
        let objValores = Object.values(obj);
        let objNames = Object.keys(values);

        // Se recorre el array para colocar los nuevos valores
        objNames.forEach((name, i) => values[name] = objValores[i])
    }

    const changesCancel = () =>{
        setLoading(true);
        setEditando(false);
        buscarFormulario();
        setTimeout(() => setLoading(false), 2000);
    }

    // Destructuring del mensaje del componente alerta
    const {msg} = alerta;

    return (
        <>
            <section
                className={`${MSGError !== '' ? 'justify-center':''} w-full m-5 p-5 flex flex-col bg-white rounded shadow`}
            >  
                {MSGError === '' ? (
                    <>
                        {/* HEADER */}
                        <div className={`${MSGError !== '' ? 'hidden':''} flex items-center`}>
                            {msg && <Alerta alerta={alerta}/>}
                            {/* Boton de atras */}
                            <div className={`${loading || msgGuardado !== '' ? 'hidden':''} flex items-center cursor-pointer w-24 transition-all hover:font-bold absolute`} onClick={e => navigate('/admin/formularios')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-back-up" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
                                </svg>
                                <p>
                                    Atras
                                </p>
                            </div>

                            <div className='text-center w-full'>
                                <h2 className='text-2xl font-bold text-color2'>
                                    {editando ? 'Editando':'Ver'} Formulario
                                </h2>
                            </div>

                            <div className={`${loading || msgGuardado !== '' ? 'hidden':''} flex self-end`}>
                                <div className="w-full flex justify-between">
                                    <button
                                        className={`${editando ? 'bg-black hover:text-color2 hover:bg-slate-100 border border-black hover:border-color2':'bg-color3 hover:bg-color2 '} w-full flex cursor-pointer p-3 text-white font-bold rounded-lg shadow transition-all mx-2`}
                                        onClick={e => !editando ? setEditando(true): changesCancel()}
                                    >
                                        {editando ? 'Cancelar':'Editar'}
                                    </button>

                                    <button
                                        className={`${editando ? '':'hidden'} w-full flex cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all mx-2`}
                                        onClick={e => handleSubmit()}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* FORM */}
                        <div
                            className={`${loading || msgGuardado !== '' || MSGError !== '' ? 'hidden':''} w-full py-2 my-2 overflow-scroll red-custom-scroll`}
                        >
                            {/* Primera Hoja */}
                            <div className={`${segundaPaginado ? 'hidden': ''} w-full`}>
                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="tipoSangre" className='font-bold'>Donante</label>
                                        <p>
                                            {values.donante_id}
                                        </p>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿El donante es Apto?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div >
                                                        <input className='cursor-pointer' type="radio" id="siApto" checked={values.estatus ? true:false} name='estatus' value={values.estatus} onChange={e => cambioValorChecked(e)}/>
                                                        <label className='cursor-pointer' htmlFor="siApto"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className='cursor-pointer' type="radio" id="noApto" checked={values.estatus ? false:true} name='estatus' value={values.estatus} onChange={e => cambioValorChecked(e)}/>
                                                        <label className='cursor-pointer' htmlFor="noApto"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.estatus ? 'Sí': 'No'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>     
                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>Fecha de Donación</label>
                                        {editando ? (
                                            
                                            <input 
                                                id="fechaDonacion" 
                                                type="date" 
                                                name="fechaDonacion"
                                                value={values.fechaDonacion}
                                                onChange={e => actualizarInputs(e)}
                                                className={`bg-white w-full p-2 rounded-lg border-4 border-gray-200`}/>
                                        ):(
                                            <p>
                                                {values.fechaDonacion}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha donado sangre ultimamente?</label>
                                        
                                        { editando ? (
                                                <>
                                                    <div className='flex justify-evenly my-1'>
                                                        <div>
                                                            <input className="cursor-pointer" type="radio" name='Done' id="siDone" checked={values.fechaDonadoUltimamente != '' || aparicionCalendarDonado ? true:false} onClick={e => setAparacionCalendarDonadoUltimamente(true)}/>
                                                            <label className="cursor-pointer" htmlFor="siDone"> Sí</label>
                                                        </div>
                                                        <div>
                                                            <input className="cursor-pointer" type="radio" name='Done' id="noDone" checked={values.fechaDonadoUltimamente == '' || !aparicionCalendarDonado ? false:true} onClick={e => setAparacionCalendarDonadoUltimamente(false)}/>
                                                            <label className="cursor-pointer" htmlFor="noDone"> No</label>
                                                        </div>
                                                    </div>
                                                    <input 
                                                        id="donadoUltimamente" 
                                                        type="date" 
                                                        name="fechaDonadoUltimamente"
                                                        value={values.fechaDonadoUltimamente}
                                                        onChange={e => actualizarInputs(e)}
                                                        className={`${values.fechaDonadoUltimamente != '' ? '': 'hidden'} bg-white w-full p-2 rounded-lg border-4 border-gray-200`}/>
                                                </>
                                            ):(
                                                <p>
                                                    {values.fechaDonadoUltimamente === '' ? 'No': values.fechaDonadoUltimamente}
                                                </p>
                                            )}
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="fechaTatuadoUltimamente" className='font-bold'>¿Se ha tatuado en los ultimos 6 meses?</label>
                                        {editando ? (
                                            <>
                                                <div className='flex justify-evenly my-1'>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='fechaTatuado' id="siTatuado" checked={values.fechaTatuadoUltimamente != '' || aparicionCalendarTatuado ? true:false} onChange={e => setAparacionCalendarTatuadoUltimamente(true)}/>
                                                        <label className="cursor-pointer" htmlFor="siTatuado"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='fechaTatuado' id="noTatuado" checked={values.fechaTatuadoUltimamente == '' || !aparicionCalendarTatuado ? false:true} onChange={e => setAparacionCalendarTatuadoUltimamente(false)}/>
                                                        <label className="cursor-pointer" htmlFor="noTatuado"> No</label>
                                                    </div>
                                                </div>
                                                <input 
                                                    id="fechaTatuadoUltimamente" 
                                                    type="date" 
                                                    name='fechaTatuadoUltimamente'
                                                    value={values.fechaTatuadoUltimamente}
                                                    onChange={e => actualizarInputs(e)}
                                                    className={`${values.fechaTatuadoUltimamente !== '' ? '': 'hidden'} bg-white w-full p-2 rounded-lg border-4 border-gray-200`}/>
                                            </>
                                        ):(
                                            <>
                                                <p>
                                                    {values.fechaTatuadoUltimamente === '' ? 'No': values.fechaTatuadoUltimamente}
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="enfermedadVenerea" className='font-bold'>¿Ha tenido alguna enfermedad venerea?</label>
                                        {editando ? (
                                            <>
                                                <div className='flex justify-evenly my-1'>
                                                    <div>
                                                        <input className="cursor-pointer" id="sienfermedadVenerea" type="radio" name='enfermedadVenerea' checked={aparicionInputEnfermedadVenerea} onChange={e => setAparicionInputEnfermedadVenerea(true)}/>
                                                        <label className="cursor-pointer" htmlFor="sienfermedadVenerea"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" id="noenfermedadVenerea" type="radio" name='enfermedadVenerea' checked={!aparicionInputEnfermedadVenerea} onChange={e => setAparicionInputEnfermedadVenerea(false)}/>
                                                        <label className="cursor-pointer" htmlFor="noenfermedadVenerea"> No</label>
                                                    </div>
                                                </div>
                                                <input
                                                    id="enfermedadVenerea" 
                                                    type="text" 
                                                    name="enfermedadVenerea"
                                                    values={values.enfermedadVenerea}
                                                    onChange={e => actualizarInputs(e)}
                                                    className={`${aparicionInputEnfermedadVenerea ? '': 'hidden'} bg-white w-full p-2 rounded-lg border-4 border-gray-200`}
                                                    placeholder="¿Cual enfermedad?"
                                                    />
                                            </>
                                        ):(
                                            <p>
                                                {values.enfermedadVenerea === "" ? 'No': values.enfermedad}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Se siente bien el día de hoy?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='seSienteBien' id="seSienteBien" checked={values.seSienteBien} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="seSienteBien"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='seSienteBien' id="noSienteBien" checked={!values.seSienteBien} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="noSienteBien"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.seSienteBien == "" || values.pregunta1 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ingirio alimento en las ultimas 6 horas?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='ingirioAlimentoUltimamente' id="siIngeri" checked={values.ingirioAlimentoUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="siIngeri"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='ingirioAlimentoUltimamente' id="noIngeri" checked={!values.ingirioAlimentoUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="noIngeri"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.ingirioAlimentoUltimamente == "" || values.pregunta2 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha sido rechazado alguna vez como donante?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='rechazadoComoDonante' id="siRechazado" checked={values.rechazadoComoDonante} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="siRechazado"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='rechazadoComoDonante' id="noRechazado" checked={!values.rechazadoComoDonante} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="noRechazado"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.rechazadoComoDonante == "" || values.pregunta3 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Tuvo alguna reaccion
                                            durante o despues
                                            de la donacion?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='reaccionDonacion' id="siReaccion" checked={values.reaccionDonacion} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="siReaccion"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='reaccionDonacion' id="noReaccion" checked={!values.reaccionDonacion} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="noReaccion"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.reaccionDonacion == "" || values.pregunta4 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Conoció los resultados de los examenes en ocasion de su donacion?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='conocioResultadosDonacion' id="siResultadosDonacion" checked={values.conocioResultadosDonacion} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="siResultadosDonacion"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" type="radio" name='conocioResultadosDonacion' id="noResultadosDonacion" checked={!values.conocioResultadosDonacion} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="noResultadosDonacion"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.conocioResultadosDonacion == "" || values.pregunta5 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido diarrea, gripe o fiebre en la ultima semana?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                
                                                    <div>
                                                        <input id="siDiarrea" className="cursor-pointer" type="radio" name='diarreaGripeFiebreUltimamente' checked={values.diarreaGripeFiebreUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="siDiarrea"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="noDiarrea" className="cursor-pointer" type="radio" name='diarreaGripeFiebreUltimamente' checked={!values.diarreaGripeFiebreUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="noDiarrea"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.diarreaGripeFiebreUltimamente == "" || values.pregunta6 === false? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha estado en control por una enfermedad importante?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                
                                                    <div>
                                                        <input id="siControlEnfermedad" className="cursor-pointer" type="radio" name='controlPorEnfermedad' checked={values.controlPorEnfermedad} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="siControlEnfermedad"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="noControlEnfermedad" className="cursor-pointer" type="radio" name='controlPorEnfermedad' checked={!values.controlPorEnfermedad} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="noControlEnfermedad"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.controlPorEnfermedad == "" || values.pregunta7 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha sido sometido a cirugia alguna vez?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input id="sisometidoCirugia" className="cursor-pointer" type="radio" name='sometidoCirugia' checked={values.sometidoCirugia} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sisometidoCirugia"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="nosometidoCirugia" className="cursor-pointer" type="radio" name='sometidoCirugia' checked={!values.sometidoCirugia} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="nosometidoCirugia"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.sometidoCirugia == "" || values.pregunta8 === false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>

                            {/* Segunda Hoja */}
                            <div className={`${segundaPaginado ? '': 'hidden'} w-full`}>

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha recibido transfusiones de sangre?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input id="sitransfusionSangre" className="cursor-pointer" type="radio"  name='transfusionSangre' checked={values.transfusionSangre} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sitransfusionSangre"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="notransfusionSangre" className="cursor-pointer" type="radio"  name='transfusionSangre' checked={!values.transfusionSangre} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="notransfusionSangre"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.transfusionSangre == "" || values.pregunta9 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido paludismo alguna vez?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" id="sipaludismoAlgunaVez" type="radio" name='paludismoAlgunaVez' checked={values.paludismoAlgunaVez} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sipaludismoAlgunaVez"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" id="nopaludismoAlgunaVez" type="radio" name='paludismoAlgunaVez' checked={!values.paludismoAlgunaVez} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="nopaludismoAlgunaVez"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.paludismoAlgunaVez == "" || values.pregunta10 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha estado en áreas palúdicas en los últimos 6 meses?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" id="siestadoAreaPaludicasUltimamente" type="radio" name='estadoAreaPaludicasUltimamente' checked={values.estadoAreaPaludicasUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="siestadoAreaPaludicasUltimamente"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" id="noestadoAreaPaludicasUltimamente" type="radio" name='estadoAreaPaludicasUltimamente' checked={!values.estadoAreaPaludicasUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="noestadoAreaPaludicasUltimamente"> No</label>
                                                    </div>
                                                </>
                                            ):(

                                                <div>
                                                    <p>
                                                        {values.estadoAreaPaludicasUltimamente == "" || values.pregunta11 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido hepatitis, orina oscuras o piel amarilla alguna vez?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input id="nohepatitisOrinaOscuraPielAmarrillaAlgunaVez" className="cursor-pointer" type="radio" name="hepatitisOrinaOscuraPielAmarrillaAlgunaVez" checked={values.hepatitisOrinaOscuraPielAmarrillaAlgunaVez} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sihepatitisOrinaOscuraPielAmarrillaAlgunaVez"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="nohepatitisOrinaOscuraPielAmarrillaAlgunaVez" className="cursor-pointer" type="radio" name="hepatitisOrinaOscuraPielAmarrillaAlgunaVez" checked={!values.hepatitisOrinaOscuraPielAmarrillaAlgunaVez} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="nohepatitisOrinaOscuraPielAmarrillaAlgunaVez"> No</label>
                                                    </div>
                                                </>
                                            ):(

                                                <div>
                                                    <p>
                                                        {values.hepatitisOrinaOscuraPielAmarrillaAlgunaVez == "" || values.pregunta12 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido contactos estrecho o relaciones sexuales con alguien con hepatitis?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input id="sicontactoConAlguienHepatitis" className="cursor-pointer" type="radio" name='contactoConAlguienHepatitis' checked={values.contactoConAlguienHepatitis} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sicontactoConAlguienHepatitis"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="nocontactoConAlguienHepatitis" className="cursor-pointer" type="radio" name='contactoConAlguienHepatitis' checked={!values.contactoConAlguienHepatitis} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="nocontactoConAlguienHepatitis"> No</label>
                                                    </div>
                                                </>

                                            ):(
                                                <div>
                                                    <p>
                                                        {values.contactoConAlguienHepatitis == "" || values.pregunta13 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Tienes tatuajes, piercings, etc, en el cuerpo?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input id="sitieneTatuajesPiercings" className="cursor-pointer" type="radio" name='tieneTatuajesPiercings' checked={values.tieneTatuajesPiercings} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sitieneTatuajesPiercings"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="notieneTatuajesPiercings" className="cursor-pointer" type="radio" name='tieneTatuajesPiercings' checked={!values.tieneTatuajesPiercings} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="notieneTatuajesPiercings"> No</label>
                                                    </div>
                                                </>
                                            ):(

                                                <div>
                                                    <p>
                                                        {values.tieneTatuajesPiercings == "" || values.pregunta14 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Has recibido hormonas de crecimiento de origen humano alguna vez?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input id="sirecibidoHormona" className="cursor-pointer" type="radio" name='recibidoHormona' checked={values.recibidoHormona} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sirecibidoHormona"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="norecibidoHormona" className="cursor-pointer" type="radio" name='recibidoHormona' checked={!values.recibidoHormona} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="norecibidoHormona"> No</label>
                                                    </div>
                                                </>
                                            ):(

                                                <div>
                                                    <p>
                                                        {values.recibidoHormona == "" || values.pregunta15 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido familiares con enfermedad de 
                                            creutzfeldt-jakob?, ¿Ha 
                                            recibido trasplante de 
                                            cornea o duramadre?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                    <>
                                                        <div>
                                                            <input id="sitenidoFamiliaresEnfermedadTransplante" className="cursor-pointer" type="radio" name='tenidoFamiliaresEnfermedadTransplante' checked={values.tenidoFamiliaresEnfermedadTransplante} onChange={e => cambioValorChecked(e)}/>
                                                            <label className="cursor-pointer" htmlFor="sitenidoFamiliaresEnfermedadTransplante"> Sí</label>
                                                        </div>
                                                        <div>
                                                            <input id="notenidoFamiliaresEnfermedadTransplante" className="cursor-pointer" type="radio" name='tenidoFamiliaresEnfermedadTransplante' checked={!values.tenidoFamiliaresEnfermedadTransplante} onChange={e => cambioValorChecked(e)}/>
                                                            <label className="cursor-pointer" htmlFor="notenidoFamiliaresEnfermedadTransplante"> No</label>
                                                        </div>
                                                    </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.tenidoFamiliaresEnfermedadTransplante == "" || values.pregunta16 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Esta tomando algun tipo de medicamento actualmente?, ¿Ha tomado aspirina en los últimos 3 días?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" id="sitomandoMedicamenteUltimamente" type="radio" name='tomandoMedicamenteUltimamente' checked={values.tomandoMedicamenteUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sitomandoMedicamenteUltimamente"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" id="notomandoMedicamenteUltimamente" type="radio" name='tomandoMedicamenteUltimamente' checked={!values.tomandoMedicamenteUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="notomandoMedicamenteUltimamente"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.tomandoMedicamenteUltimamente == "" || values.pregunta17 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha sido picado por un chipo o ha habitado en vivienda rural en zona endémica para la enfermedad de chagas?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" id="sipicadaChipoEnfermedadChagas" type="radio" name='picadaChipoEnfermedadChagas' checked={values.picadaChipoEnfermedadChagas} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sipicadaChipoEnfermedadChagas"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" id="nopicadaChipoEnfermedadChagas" type="radio" name='picadaChipoEnfermedadChagas' checked={!values.picadaChipoEnfermedadChagas} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="nopicadaChipoEnfermedadChagas"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.picadaChipoEnfermedadChagas == "" || values.pregunta18 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha recibido vacunaciones en el ultimo años?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input className="cursor-pointer" id="sivacunacionesUltimoYear" type="radio" name='vacunacionesUltimoYear' checked={values.vacunacionesUltimoYear} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sivacunacionesUltimoYear"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input className="cursor-pointer" id="novacunacionesUltimoYear" type="radio" name='vacunacionesUltimoYear' checked={!values.vacunacionesUltimoYear} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="novacunacionesUltimoYear"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>                                                    
                                                    <p>
                                                        {values.vacunacionesUltimoYear == "" || values.pregunta19 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>Hombre, ¿Ha tenido relaciones sexuales con otro hombre?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input id="sitenidoRelacionesOtroHombre" className="cursor-pointer" type="radio" name='tenidoRelacionesOtroHombre' checked={values.tenidoRelacionesOtroHombre} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sitenidoRelacionesOtroHombre"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="notenidoRelacionesOtroHombre" className="cursor-pointer" type="radio" name='tenidoRelacionesOtroHombre' checked={!values.tenidoRelacionesOtroHombre} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="notenidoRelacionesOtroHombre"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.tenidoRelacionesOtroHombre  == "" || values.pregunta20 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido relaciones sexuales con prostitutas en los ultimos 12 meses?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {editando ? (
                                                <>
                                                    <div>
                                                        <input id="sirelacionesProstitutasUltimamente" className="cursor-pointer" type="radio" name='relacionesProstitutasUltimamente' checked={values.relacionesProstitutasUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="sirelacionesProstitutasUltimamente"> Sí</label>
                                                    </div>
                                                    <div>
                                                        <input id="norelacionesProstitutasUltimamente" className="cursor-pointer" type="radio" name='relacionesProstitutasUltimamente' checked={!values.relacionesProstitutasUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                        <label className="cursor-pointer" htmlFor="norelacionesProstitutasUltimamente"> No</label>
                                                    </div>
                                                </>
                                            ):(
                                                <div>
                                                    <p>
                                                        {values.relacionesProstitutasUltimamente  == "" || values.pregunta21 == false ? 'No': 'Sí'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>


                            <div className='flex justify-end items-center'>
                                <p>
                                    Pagina {!segundaPaginado ? '1/2':'2/2'}
                                </p>
                                <button
                                    id='boton1'
                                    className={`${segundaPaginado ? '': 'hidden'} bg-color3 hover:bg-color2 rounded shadow p-2 transition-all m-2`}
                                    onClick={e => setSegundaPaginado(false)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="w-6 h-6">
                                        <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
                                    </svg>
                                </button>

                                <button
                                    id='boton2'
                                    className={`${segundaPaginado ? 'hidden': ''} bg-color3 hover:bg-color2 rounded shadow p-2 transition-all m-2`}
                                    onClick={e => setSegundaPaginado(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="w-6 h-6">
                                        <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* MENSAJE DE GUARDADO */}
                        <div className={`${msgGuardado !== '' || MSGError !== '' ? '':'hidden'} text-center py-10 mx-auto`}>
                            <svg fill="#D80404" className="w-28 h-28 mx-auto" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" ariaHidden="true">
                                <path clipRule="evenodd" fillRule="evenodd" d="M3 3.5A1.5 1.5 0 014.5 2h6.879a1.5 1.5 0 011.06.44l4.122 4.12A1.5 1.5 0 0117 7.622V16.5a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 013 16.5v-13zm10.857 5.691a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 00-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"></path>
                            </svg>
                            <h2 className="font-bold uppercase text-xl md:text-2xl my-2">{msgGuardado}</h2>
                        </div>
                    </>
                ):(
                    <>
                        {/* MENSAJE DE ERROR */}
                        <div className={`${MSGError === '' ? 'hidden':''} w-full rounded-lg uppercase mx-auto font-bold text-center flex flex-col items-center justify-center`}>
                            <h2 className='mx-auto my-2 lg:text-3xl'>
                                {MSGError}
                            </h2>

                            <div className="mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-broken" width="150" height="150" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                                    <path d="M12 7l-2 4l4 3l-2 4v3" />
                                </svg>
                            </div>
                        </div>
                    </>
                )}

                {/* SPINNER */}
                <div className={`${!loading || msgGuardado !== '' || MSGError !== '' ? 'hidden':''} text-center py-10`}>
                    <RedHeartSpinner/>
                    <h2 className="font-bold">Cargando...</h2>
                </div>


            </section>
        </>
    )
}

export default VerFormulario;