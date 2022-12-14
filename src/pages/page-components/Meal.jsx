// IMPORTS ----
import { useContext } from "react"
import { Link } from "react-router-dom"

import "../page-css/meal.scss"

import { SetCookieContext } from "../.."
import { GetCookieContext } from "../.."



const Meal = ({ img, name, price, id, content }) => {
    // CONTEXT/COOKIE ----

    const setCookie = useContext(SetCookieContext)
    const getCookie = useContext(GetCookieContext)

    const newCookie = (item) => {
        const prev = getCookie("cart")
        setCookie(`${prev}${item}`)
    }  

    
    
    // RETURN ----
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


// EXPORTS ----
export default Meal