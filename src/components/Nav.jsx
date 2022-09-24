// IMPORTS ----
import { Link } from "react-router-dom"



const Nav = () => {
    // RETURN ----
    return (
        <nav className="nav">

            // home
            <Link className="nav__link nav__link--home" to="/">
                <img src="nav/box.png" alt="Pizza Box Logo" />
                <h1>The Pizza Box</h1>
            </Link>

            // presets
            <Link className="nav__link nav__link--presets" to="/presets">
                <h1>Presets</h1>
            </Link>

            // menu
            <Link className="nav__link nav__link--menu" to="/menu">
                <h1>Menu</h1>
            </Link>

            // meals
            <Link className="nav__link nav__link--meals" to="/meals">
                <h1>Meals</h1>
            </Link>

            // cart
            <Link className="nav__link nav__link--cart" to="/cart">
                <h1>Cart</h1>
            </Link>
            
        </nav> 
    )
}



// EXPORTS ----
export default Nav