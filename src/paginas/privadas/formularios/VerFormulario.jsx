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

    // Navegador
    const navigate = useNavigate();

    // Parametros
    const params = useParams();

    useEffect(()=>{

        console.log('en el nuevo jsx')

        const buscarFormulario = async() =>{

            let {data} = await clienteAxios(`/formulario/obtener-formulario/${params.id}`);

            console.log(data);
            if(data.error){
                setMSGError(data.message);
                return
            }

            establecerValores(data);

        }

        setTimeout(() => {
            buscarFormulario();
            setLoading(false);
        }, 1500);
    },[])
    

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

            let {data} = await clienteAxios.post('/formulario/registrar-formulario', values);

            setTimeout(() => {
                if(data.error){
                    setLoading(false);
                    setAlerta({msg: data.message, error:true});
                    setTimeout(()=> setAlerta({}), 2000);
                    return
                }
    
                setLoading(false);
                setMsgGuardado('Formulario guardado correctamente');

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
                                    Ver Formulario
                                </h2>
                            </div>

                            <div className={`${loading || msgGuardado !== '' ? 'hidden':''} flex self-end`}>
                                <button
                                    className='w-full flex cursor-pointer p-3 bg-color3 hover:bg-color2 text-white font-bold rounded-lg shadow transition-all'
                                >
                                    Editar
                                </button>
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
                                        <select 
                                            id="tipoSangre"
                                            name="donante" 
                                            value={values.donante_id}
                                            onChange={e => actualizarInputs(e)}
                                            className='bg-white w-full p-2 rounded-lg border-4 border-gray-200'
                                        >
                                            <option value="">Seleccione a un donante</option>
                                            <option value="28012038">Roque Emilio Lopez Loreto - 28012038</option>
                                            <option value="19685321">Adriana Carolina Moncada - 19685321</option>
                                            <option value="29741018">Victor Alejandro Maldonado - 29741018</option>
                                            <option value="19254131">Adriana Roa - 19254131</option>
                                        </select>
                                        <p>
                                            {values.donante_id}
                                        </p>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿El donante es Apto?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div >
                                                <input className='cursor-pointer' type="radio" id="siApto" name='estatus' value={values.estatus} onChange={e => cambioValorChecked(e)}/>
                                                <label className='cursor-pointer' htmlFor="siApto"> Sí</label>
                                            </div>
                                            <div>
                                                <input className='cursor-pointer' type="radio" id="noApto" name='estatus' value={values.estatus} onChange={e => cambioValorChecked(e)}/>
                                                <label className='cursor-pointer' htmlFor="noApto"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.estatus ? 'Sí': 'No'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>     
                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>Fecha de Donación</label>
                                        
                                        {/* <input 
                                            id="fechaDonacion" 
                                            type="date" 
                                            name="fechaDonacion"
                                            values={values.fechaDonacion}
                                            onChange={e => actualizarInputs(e)}
                                            className={`bg-white w-full p-2 rounded-lg border-4 border-gray-200`}/> */}
                                        <p>
                                            {values.fechaDonacion}
                                        </p>
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    {/* <div className='flex flex-col'>
                                        <label htmlFor="tipoSangre" className='font-bold'>Tipo de Sangre</label>
                                        <select 
                                            id="tipoSangre"
                                            name="tipoSangre"
                                            values={values.tipoSangre}
                                            onChange={e => actualizarInputs(e)}
                                            className='bg-white w-full p-2 rounded-lg border-4 border-gray-200'
                                        >
                                            <option value="">Selecciona un tipo de sangre</option>
                                            <option value="A+">A+</option>
                                            <option value="O+">O+</option>
                                            <option value="B+">B+</option>
                                            <option value="AB+">AB+</option>
                                            <option value="A-">A-</option>
                                            <option value="O-">O-</option>
                                            <option value="B-">B-</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                    </div> */}

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha donado sangre ultimamente?</label>
                                        {/* <div className='flex justify-evenly my-1'>
                                            <div>
                                                <input type="radio" name='Done' value="siDone" onClick={e => setAparacionCalendarDonadoUltimamente(true)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='Done' onClick={e => setAparacionCalendarDonadoUltimamente(false)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div>
                                        </div>
                                        <input 
                                            id="donadoUltimamente" 
                                            type="date" 
                                            name="fechaDonadoUltimamente"
                                            values={values.fechaDonadoUltimamente}
                                            onChange={e => actualizarInputs(e)}
                                            className={`${aparicionCalendarDonado ? '': 'hidden'} bg-white w-full p-2 rounded-lg border-4 border-gray-200`}/> */}
                                    
                                        <p>
                                            {values.fechaDonadoUltimamente === '' ? 'No': values.ultima_donacion}
                                        </p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="fechaTatuadoUltimamente" className='font-bold'>¿Se ha tatuado en los ultimos 6 meses?</label>
                                        {/* <div className='flex justify-evenly my-1'>
                                            <div>
                                                <input type="radio" name='fechaTatuado' onClick={e => setAparacionCalendarTatuadoUltimamente(true)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='fechaTatuado' onClick={e => setAparacionCalendarTatuadoUltimamente(false)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div>
                                        </div>
                                        <input 
                                            id="fechaTatuadoUltimamente" 
                                            type="date" 
                                            name='fechaTatuadoUltimamente'
                                            values={values.fechaTatuadoUltimamente}
                                            onChange={e => actualizarInputs(e)}
                                            className={`${aparicionCalendarTatuado ? '': 'hidden'} bg-white w-full p-2 rounded-lg border-4 border-gray-200`}/> */}
                                        <p>
                                            {values.fechaTatuadoUltimamente === '' ? 'No': values.ultimo_tatuaje}
                                        </p>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="enfermedadVenerea" className='font-bold'>¿Ha tenido alguna enfermedad venerea?</label>
                                        {/* <div className='flex justify-evenly my-1'>
                                            <div>
                                                <input type="radio" name='enfermedadVenerea' onClick={e => setAparicionInputEnfermedadVenerea(true)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='enfermedadVenerea' onClick={e => setAparicionInputEnfermedadVenerea(false)}/>
                                                <label htmlFor="Done"> No</label>
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
                                            /> */}
                                        <p>
                                            {values.enfermedadVenerea === "" ? 'No': values.enfermedad}
                                        </p>
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Se siente bien el día de hoy?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='seSienteBien' value={values.seSienteBien} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='seSienteBien' value={values.seSienteBien} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.seSienteBien == "" || values.pregunta1 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ingirio alimento en las ultimas 6 horas?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='ingirioAlimentoUltimamente' value={values.ingirioAlimentoUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='ingirioAlimentoUltimamente' value={values.ingirioAlimentoUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.ingirioAlimentoUltimamente == "" || values.pregunta2 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha sido rechazado alguna vez como donante?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='rechazadoComoDonante' value={values.rechazadoComoDonante} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='rechazadoComoDonante' value={values.rechazadoComoDonante} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.rechazadoComoDonante == "" || values.pregunta3 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Tuvo alguna reaccion
                                            durante o despues
                                            de la donacion?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='reaccionDonacion' value={values.reaccionDonacion} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='reaccionDonacion' value={values.reaccionDonacion} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.reaccionDonacion == "" || values.pregunta4 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Conoció los resultados de los examenes en ocasion de su donacion?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='conocioResultadosDonacion' value={values.conocioResultadosDonacion} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='conocioResultadosDonacion' value={values.conocioResultadosDonacion} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.conocioResultadosDonacion == "" || values.pregunta5 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido diarrea, gripe o fiebre en la ultima semana?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='diarreaGripeFiebreUltimamente' value={values.diarreaGripeFiebreUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='diarreaGripeFiebreUltimamente' value={values.diarreaGripeFiebreUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.diarreaGripeFiebreUltimamente == "" || values.pregunta6 === false? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha estado en control por una enfermedad importante?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='controlPorEnfermedad' value={values.controlPorEnfermedad} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='controlPorEnfermedad' value={values.controlPorEnfermedad} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.controlPorEnfermedad == "" || values.pregunta7 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha sido sometido a cirugia alguna vez?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='sometidoCirugia' value={values.sometidoCirugia} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='sometidoCirugia' value={values.sometidoCirugia} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.sometidoCirugia == "" || values.pregunta8 === false ? 'No': 'Sí'}
                                                </p>
                                            </div>
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
                                            {/* <div>
                                                <input type="radio"  name='transfusionSangre' value={values.transfusionSangre} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio"  name='transfusionSangre' value={values.transfusionSangre} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.transfusionSangre == "" || values.pregunta9 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido paludismo alguna vez?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='paludismoAlgunaVez' value={values.paludismoAlgunaVez} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='paludismoAlgunaVez' value={values.paludismoAlgunaVez} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.paludismoAlgunaVez == "" || values.pregunta10 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha estado en áreas palúdicas en los últimos 6 meses?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='estadoAreaPaludicasUltimamente' value={values.estadoAreaPaludicasUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='estadoAreaPaludicasUltimamente' value={values.estadoAreaPaludicasUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.estadoAreaPaludicasUltimamente == "" || values.pregunta11 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido hepatitis, orina oscuras o piel amarilla alguna vez?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name="hepatitisOrinaOscuraPielAmarrillaAlgunaVez" value={values.hepatitisOrinaOscuraPielAmarrillaAlgunaVez} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name="hepatitisOrinaOscuraPielAmarrillaAlgunaVez" value={values.hepatitisOrinaOscuraPielAmarrillaAlgunaVez} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.hepatitisOrinaOscuraPielAmarrillaAlgunaVez == "" || values.pregunta12 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido contactos estrecho o relaciones sexuales con alguien con hepatitis?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='contactoConAlguienHepatitis' value={values.contactoConAlguienHepatitis} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='contactoConAlguienHepatitis' value={values.contactoConAlguienHepatitis} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}

                                            <div>
                                                <p>
                                                    {values.contactoConAlguienHepatitis == "" || values.pregunta13 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Tienes tatuajes, piercings, etc, en el cuerpo?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='tieneTatuajesPiercings' value={values.tieneTatuajesPiercings} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='tieneTatuajesPiercings' value={values.tieneTatuajesPiercings} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.tieneTatuajesPiercings == "" || values.pregunta14 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Has recibido hormonas de crecimiento de origen humano alguna vez?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='recibidoHormona' value={values.recibidoHormona} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='recibidoHormona' value={values.recibidoHormona} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.recibidoHormona == "" || values.pregunta15 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
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
                                            {/* <div>
                                                <input type="radio" name='tenidoFamiliaresEnfermedadTransplante' value={values.tenidoFamiliaresEnfermedadTransplante} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='tenidoFamiliaresEnfermedadTransplante' value={values.tenidoFamiliaresEnfermedadTransplante} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.tenidoFamiliaresEnfermedadTransplante == "" || values.pregunta16 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Esta tomando algun tipo de medicamento actualmente?, ¿Ha tomado aspirina en los últimos 3 días?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='tomandoMedicamenteUltimamente' value={values.tomandoMedicamenteUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='tomandoMedicamenteUltimamente' value={values.tomandoMedicamenteUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.tomandoMedicamenteUltimamente == "" || values.pregunta17 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha sido picado por un chipo o ha habitado en vivienda rural en zona endémica para la enfermedad de chagas?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='picadaChipoEnfermedadChagas' value={values.picadaChipoEnfermedadChagas} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='picadaChipoEnfermedadChagas' value={values.picadaChipoEnfermedadChagas} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.picadaChipoEnfermedadChagas == "" || values.pregunta18 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className='flex justify-evenly my-5 mx-3'>
                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha recibido vacunaciones en el ultimo años?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='vacunacionesUltimoYear' value={values.vacunacionesUltimoYear} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='vacunacionesUltimoYear' value={values.vacunacionesUltimoYear} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.vacunacionesUltimoYear == "" || values.pregunta19 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col'>
                                        <label htmlFor="donadoUltimamente" className='font-bold'>Hombre, ¿Ha tenido relaciones sexuales con otro hombre?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='tenidoRelacionesOtroHombre' value={values.tenidoRelacionesOtroHombre} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='tenidoRelacionesOtroHombre' value={values.tenidoRelacionesOtroHombre} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.tenidoRelacionesOtroHombre  == "" || values.pregunta20 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido relaciones sexuales con prostitutas en los ultimos 12 meses?</label>
                                        <div className='flex justify-evenly my-1'>
                                            {/* <div>
                                                <input type="radio" name='relacionesProstitutasUltimamente' value={values.relacionesProstitutasUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="siDone"> Sí</label>
                                            </div>
                                            <div>
                                                <input type="radio" name='relacionesProstitutasUltimamente' value={values.relacionesProstitutasUltimamente} onChange={e => cambioValorChecked(e)}/>
                                                <label htmlFor="Done"> No</label>
                                            </div> */}
                                            <div>
                                                <p>
                                                    {values.relacionesProstitutasUltimamente  == "" || values.pregunta21 == false ? 'No': 'Sí'}
                                                </p>
                                            </div>
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