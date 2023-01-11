const Header = () => {
    return (
        <>
            <header className='w-full flex justify-center bg-color2 h-24 shadow-lg' style={{ height:"10vh"}}>
                <div className='flex items-center'>
                    <img src="/img/logo-blanco.png" alt="logo" className="w-1/6"/>
                    <h2 className='mx-2 text-white font-bold text-4xl'>
                        GEDOVOL
                    </h2>
                </div>
            </header>
        </>
    )
}

export default Header