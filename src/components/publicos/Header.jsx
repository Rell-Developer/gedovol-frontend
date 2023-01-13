const Header = () => {
    return (
        <>
            <header className='w-full flex justify-center bg-color2 h-24 shadow text-center' style={{ height:"10vh"}}>
                <div className='flex items-center justify-center'>
                    <img src="/img/logo-blanco.png" alt="logo" className="w-1/6"/>
                    <h2 className='mx-2 text-white font-bold text-3xl lg:text-4xl'>
                        GEDOVOL
                    </h2>
                </div>
            </header>
        </>
    )
}

export default Header