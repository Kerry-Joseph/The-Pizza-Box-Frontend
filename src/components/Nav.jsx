import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <div className="nav">
            <Link className="nav__link nav__link--home" to="/">
                <img id="box-logo" src="nav/box.png" alt="Pizza Box Logo" />
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
        </div> 
    )
}

export default Nav