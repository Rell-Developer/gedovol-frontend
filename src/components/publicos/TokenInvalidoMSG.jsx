import { useNavigate } from "react-router-dom"

const TokenInvalidoMSG = ({datos}) => {

    // Destructuring | Titulo del mensaje | Direccion a llevar al cliente
    const {title, direction} = datos;

    // Declaracion del navegador
    const navigate = useNavigate();

    // Componente retornado
    return (
        <div className="mx-auto flex flex-col justify-center">
            <h2 className="text-2xl uppercase font-bold text-center">
                {title}
            </h2>

            <div className="mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-broken" width="88" height="88" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    <path d="M12 7l-2 4l4 3l-2 4v3" />
                </svg>
            </div>

            <div className="mx-auto">
                <button
                    type="button"
                    className="bg-color1 font-bold py-2 px-4 text-black rounded-lg shadow mt-5 hover:bg-white transition-all"
                    onClick={e => navigate(direction)}
                >
                    Regresar al Inicio
                </button>
            </div>
        </div>
    )
}

export default TokenInvalidoMSG