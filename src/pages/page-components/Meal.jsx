const Meal = ({img, name, content, price, id}) => {
    return (
        <div className="meal" id={id} style={{backgroundImage: `url(${img})`}}>
            <h1 className="meal__name">{name}</h1>
            <h2 className="meal__content">{content}</h2>
            <p className="meal__price">${price}</p>
        </div>
    )
}

export default Meal