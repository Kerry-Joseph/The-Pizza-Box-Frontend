const MenuItem = ({ img, name, price, id }) => {
    return (
        <div className="menu-item" id={id} style={{backgroundImage: `url(${img})`}}>
            <h1 className="menu__name">{name}</h1>
            <p className="menu__price">${price}</p>
        </div>
    )
}

export default MenuItem