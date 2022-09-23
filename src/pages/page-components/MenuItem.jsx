// IMPORTS ----
import { useContext } from "react"
import { Link } from "react-router-dom"

import { SetCookieContext } from "../.."
import { GetCookieContext } from "../.."



const MenuItem = ({ img, name, price, id, category }) => {
    // CONTEXT/COOKIE ----

    const setCookie = useContext(SetCookieContext)
    const getCookie = useContext(GetCookieContext)

    const newCookie = (item) => {
        const prev = getCookie("cart")
        setCookie(`${prev}${item}`)
    }  


    
    // RETURN ----
    return (
        <Link to="/cart">
            <div className="menu-item" id={id} style={{backgroundImage: `url(${img})`}} onClick={() => newCookie(`${category}|${name}|${price}|${Math.random()}/`)}>
                <h1 className="menu__name">{name}</h1>
                <p className="menu__price">${price}</p>
            </div>
        </Link>
    )
}


// EXPORTS ----
export default MenuItem