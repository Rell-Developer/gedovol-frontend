const Alerta = ({alerta}) => {
    return ( 
        <div id="alerta-div" className={`${alerta.error ? 'from-red-500 to-red-600': 'from-indigo-400 to-indigo-600'} 
            bg-gradient-to-br text-center rounded-lg uppercase text-white text-sm font-bold mb-10 absolute my-36
            p-4 ml-10 shadow-lg z-10 w-1/6
            `}>
            {alerta.msg}
        </div>
    );
}

export default Alerta;