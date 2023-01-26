const toggleHeart = () => {
    return (
        <>
            <div className="love w-1/2">
                <input id="switch" type="checkbox" />
                <label className="love-heart" for="switch">
                    <i className="left"></i>
                    <i className="right"></i>
                    <i className="bottom"></i>
                    <div className="round"></div>
                </label>
            </div>
        </>
    )
}

export default toggleHeart