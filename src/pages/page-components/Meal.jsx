import { useContext } from "react"
import { Link } from "react-router-dom"
import "../page-css/meal.scss"
import { SetCookieContext } from "../.."
import { GetCookieContext } from "../.."

const Meal = ({ img, name, price, id, content }) => {
    const setCookie = useContext(SetCookieContext)
    const getCookie = useContext(GetCookieContext)


    const newCookie = (item) => {
        const prev = getCookie("cart")
        setCookie("cart", `${prev}${item}`)
    }  

    

    return (
        <Link to="/cart" className="meal-link">
            <div className="meal" id={id}  onClick={() => newCookie(`${name}|${content}|${price}|${Math.random()}/`)} style={{backgroundImage: `url(${img})`}}>
                <div className="meal-name-price">
                    <h1 className="meal-name">{name}</h1>
                    <p className="meal-price">${price}</p>
                </div>
                <p>{content}</p>
            </div>
        </Link>
    )
}

export default Meal