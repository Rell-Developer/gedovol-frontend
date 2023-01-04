const dataLocalStorage = (dato) =>{
    return JSON.parse( localStorage.getItem(dato) );
}

export default dataLocalStorage;