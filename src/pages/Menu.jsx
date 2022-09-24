// IMPORTS ----
import { Link } from "react-router-dom"

import MenuItem from "./page-components/MenuItem"

import "./page-css/Menu.scss"



const Menu = ({ menu }) => {
    // LOADED ----
    const loaded = () => {

        const [m0,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14] = menu
        
        return (
            <div className="menu">

                <button>
                    <Link id="link" to="/create-pizza">
                        <p>Create Pizza</p> 
                    </Link>
                </button>

                <div className="menu__pizza">
                    <h1 className="menu__titles">Pizza</h1>
                    <MenuItem
                        category={m0.category}
                        img={m0.img} 
                        name={m0.name} 
                        price={m0.price} 
                        id={m0.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m1.category}
                        img={m1.img} 
                        name={m1.name} 
                        price={m1.price} 
                        id={m1.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m2.category}
                        img={m2.img} 
                        name={m2.name} 
                        price={m2.price} 
                        id={m2.name.replaceAll(' ', '-')}
                    />
                </div>

                <div className="menu__wings">
                    <h1 className="menu__titles">Wings</h1>
                    <MenuItem
                        category={m3.category}
                        img={m3.img} 
                        name={m3.name} 
                        price={m3.price} 
                        id={m3.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m4.category}
                        img={m4.img} 
                        name={m4.name} 
                        price={m4.price} 
                        id={m4.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m5.category}
                        img={m5.img} 
                        name={m5.name} 
                        price={m5.price} 
                        id={m5.name.replaceAll(' ', '-')}
                    />
                </div>

                <div className="menu__bread">
                    <h1 className="menu__titles">Bread</h1>
                    <MenuItem
                        category={m6.category}
                        img={m6.img} 
                        name={m6.name} 
                        price={m6.price} 
                        id={m6.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m7.category}
                        img={m7.img} 
                        name={m7.name} 
                        price={m7.price} 
                        id={m7.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m8.category}
                        img={m8.img} 
                        name={m8.name} 
                        price={m8.price} 
                        id={m8.name.replaceAll(' ', '-')}
                    />
                </div>

                <div className="menu__drinks">
                    <h1 className="menu__titles">Drinks</h1>
                    <MenuItem
                        category={m9.category}
                        img={m9.img} 
                        name={m9.name} 
                        price={m9.price} 
                        id={m9.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m10.category}
                        img={m10.img} 
                        name={m10.name} 
                        price={m10.price} 
                        id={m10.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m11.category}
                        img={m11.img} 
                        name={m11.name} 
                        price={m11.price} 
                        id={m11.name.replaceAll(' ', '-')}
                    />
                </div>

                <div className="menu__dip">
                    <h1 className="menu__titles">Dip</h1>
                    <MenuItem
                        category={m12.category}
                        img={m12.img} 
                        name={m12.name} 
                        price={m12.price} 
                        id={m12.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m13.category}
                        img={m13.img} 
                        name={m13.name} 
                        price={m13.price} 
                        id={m13.name.replaceAll(' ', '-')}
                    />
                    <MenuItem
                        category={m14.category}
                        img={m14.img} 
                        name={m14.name} 
                        price={m14.price} 
                        id={m14.name.replaceAll(' ', '-')}
                    />
                </div>

            </div>
        )
    }



    // LOADING ----
    const loading = () => {
        return (
            <h1>loading...</h1>
        )
    }



    // RETURN ----
    return (
        <div>
            {menu ? loaded() : loading()}
        </div>
    )
}



// EXPORTS ----
export default Menu