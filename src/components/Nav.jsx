import { useEffect } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { GetCookieContext } from ".."

const Nav = () => {


    const getCookie = useContext(GetCookieContext)
    const cookie = getCookie("cart").split("/")
    
    // console.log(cookie.length)
    const cart = () => {
        if(cookie.length === 1){
            return <h1>Cart</h1>
        } else {
            return <h1>{cookie.length  - 1}</h1>
        }
    }

    useEffect(() => { cart() }, [])

    return (
        <nav className="nav">
            <Link className="nav__link nav__link--home" to="/">
                <img id="box-logo" src="nav/box.png" alt="Pizza Box Logo" />
                <h1>The Pizza Box</h1>
            </Link>

            <Link className="nav__link nav__link--presets" to="/presets">
                <h1>Presets</h1>
            </Link>

            <Link className="nav__link nav__link--menu" to="/menu">
                <h1>Menu</h1>
            </Link>

            <Link className="nav__link nav__link--meals" to="/meals">
                <h1>Meals</h1>
            </Link>

            <Link className="nav__link nav__link--cart" to="/cart">
                <h1>Cart</h1>
            </Link>
        </nav> 
    )
}

export default Nav