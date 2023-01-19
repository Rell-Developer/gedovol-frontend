import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const NewForm = () => {

    const navigate = useNavigate();

    const [aparicionCalendarDonado, setAparacionCalendarDonadoUltimamente] = useState(false);
    const [aparicionCalendarTatuado, setAparacionCalendarTatuadoUltimamente] = useState(false);
    const [aparicionInputEnfermedadVenerea, setAparicionInputEnfermedadVenerea] = useState(false);
    const [segundaPaginado, setSegundaPaginado] = useState(false);

    return (
        <>
            <section
                className='w-full m-5 p-5 flex flex-col bg-white rounded'
            >  
                <div className='flex items-center'>
                    {/* Boton de atras */}
                    <div className='flex items-center cursor-pointer w-24 transition-all hover:font-bold absolute' onClick={e => navigate('/admin/formularios')}>
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
                            Nuevo Formulario
                        </h2>
                    </div>
                </div>

                <div
                    className='w-full py-2 my-2'
                >
                    {/* Primera Hoja */}
                    <div className={`${segundaPaginado ? 'hidden': ''} w-full`}>
                        <div className='flex justify-evenly my-5 mx-3'>
                            <div className='flex flex-col'>
                                <label htmlFor="donante" className='font-bold'>Donante</label>
                                <select 
                                    id="tipoSangre"
                                    name="donante" 
                                    className='bg-white w-full p-2 rounded-lg border-4 border-gray-200'
                                >
                                    <option value="">Seleccione a un donante</option>
                                    <option value="28012038">Roque Emilio Lopez Loreto - 28012038</option>
                                    <option value="19685321">Adriana Carolina Moncada - 19685321</option>
                                    <option value="29741018">Victor Alejandro Maldonado - 29741018</option>
                                    <option value="19254131">Adriana Roa - 19254131</option>
                                </select>
                            </div>                        
                        </div>
                        <hr />

                        <div className='flex justify-evenly my-5 mx-3'>
                            <div className='flex flex-col'>
                                <label htmlFor="tipoSangre" className='font-bold'>Tipo de Sangre</label>
                                <select 
                                    id="tipoSangre"
                                    name="tipoSangre" 
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
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha donado sangre ultimamente?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone" onClick={e => setAparacionCalendarDonadoUltimamente(true)}/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done' onClick={e => setAparacionCalendarDonadoUltimamente(false)}/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                                <input type="date" id="donadoUltimamente" className={`${aparicionCalendarDonado ? '': 'hidden'} bg-white w-full p-2 rounded-lg border-4 border-gray-200`}/>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Se ha tatuado en los ultimos 6 meses?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone" onClick={e => setAparacionCalendarTatuadoUltimamente(true)}/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done' onClick={e => setAparacionCalendarTatuadoUltimamente(false)}/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                                <input type="date" id="donadoUltimamente" className={`${aparicionCalendarTatuado ? '': 'hidden'} bg-white w-full p-2 rounded-lg border-4 border-gray-200`}/>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido alguna enfermedad venerea?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone" onClick={e => setAparicionInputEnfermedadVenerea(true)}/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done' onClick={e => setAparicionInputEnfermedadVenerea(false)}/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                                <input
                                    id="donadoUltimamente" 
                                    type="text" 
                                    className={`${aparicionInputEnfermedadVenerea ? '': 'hidden'} bg-white w-full p-2 rounded-lg border-4 border-gray-200`}
                                    placeholder="¿Cual enfermedad?"
                                    />
                            </div>
                        </div>
                        <hr />

                        <div className='flex justify-evenly my-5 mx-3'>
                            <div className='flex flex-col'>
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Se siente bien el día de hoy?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ingirio alimento en las ultimas 6 horas?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha sido rechazado alguna vez como donante?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Tuvo alguna reaccion
                                    durante o despues
                                    de la donacion?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className='flex justify-evenly my-5 mx-3'>
                            <div className='flex flex-col'>
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Conoció los resultados de los examenes en ocasion de su donacion?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido diarrea, gripe o fiebre en la ultima semana?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha estado en control por una enfermedad importante?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha sido sometido a cirugia alguna vez?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className='flex justify-evenly my-5 mx-3'>
                            <div className='flex flex-col'>
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha recibido transfusiones de sangre?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido paludismo alguna vez?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha estado en áreas palúdicas en los últimos 6 meses?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido hepatitis, orina oscuras o piel amarilla alguna vez?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
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
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido paludismo alguna vez?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha estado en áreas palúdicas en los últimos 6 meses?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido hepatitis, orina oscuras o piel amarilla alguna vez?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className='flex justify-evenly my-5 mx-3'>
                            <div className='flex flex-col'>
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido contactos estrecho o relaciones sexuales con alguien con hepatitis?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Tienes tatuajes, piercings, etc, en el cuerpo?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Has recibido hormonas de crecimiento de origen humano alguna vez?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
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
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Esta tomando algun tipo de medicamento actualmente?, ¿Ha tomado aspirina en los últimos 3 días?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha sido picado por un chipo o ha habitado en vivienda rural en zona endémica para la enfermedad de chagas?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />

                        <div className='flex justify-evenly my-5 mx-3'>
                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha recibido vacunaciones en el ultimo años?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="donadoUltimamente" className='font-bold'>Hombre, ¿Ha tenido relaciones sexuales con otro hombre?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="donadoUltimamente" className='font-bold'>¿Ha tenido relaciones sexuales con prostitutas en los ultimos 12 meses?</label>
                                <div className='flex justify-evenly my-1'>
                                    <div>
                                        <input type="radio" name='Done' value="siDone"/>
                                        <label htmlFor="siDone"> Sí</label>
                                    </div>
                                    <div>
                                        <input type="radio" name='Done'/>
                                        <label htmlFor="Done"> No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>


                    <div className='flex justify-end'>
                        <button
                            id='boton1'
                            className={`${segundaPaginado ? '': 'hidden'} bg-color3 hover:bg-color2 rounded shadow p-2 transition-all mx-2`}
                            onClick={e => setSegundaPaginado(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd" />
                            </svg>
                        </button>

                        <button
                            id='boton2'
                            className={`${segundaPaginado ? 'hidden': ''} bg-color3 hover:bg-color2 rounded shadow p-2 transition-all mx-2`}
                            onClick={e => setSegundaPaginado(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>

            </section>
        </>
    )
}

export default NewForm;