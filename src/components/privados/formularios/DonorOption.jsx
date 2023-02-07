const DonorOption = ({datos}) => {
    let {nombre, apellido, cedula} = datos;
    return (
        <>
            <option value={cedula}>{nombre} {apellido} - {cedula}</option>
        </>
    )
}

export default DonorOption