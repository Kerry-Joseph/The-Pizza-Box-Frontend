import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { GetCookieContext } from ".."
import { SetCookieContext } from ".."
import "./page-css/cart.scss"
import "./page-css/menuItem.scss"
import MenuItem from "./page-components/MenuItem"

const Cart = ({ menu }) => {

    // STATE ----
    const [deliveryState, setDeliveryState] = useState(false)


    // CONTEXT ----
    const setCookie = useContext(SetCookieContext)
    const getCookie = useContext(GetCookieContext)

    
    const cookieStr = getCookie("cart")
    
    const clearCart = () => {
        setCookie("cart", "")
    }


    const cookieArray = () => {
        const arr = cookieStr.split("/")
        arr.splice(-1, 1)
        const arrOfArrays = arr.map(item => item.split("|"))
        return arrOfArrays
    }
    const cookieArr = cookieArray()


    const deleteItem = (id) => {
        let filtered = cookieArr.filter(cookie => cookie.includes(id) === false)
        for ( let i = 0; i < filtered.length; i++) {
            filtered[i].forEach((at, index) => {
                const bon = "|" + at
                filtered[i][index] = bon
            })
            filtered[i].push("/")
            const yo = filtered[i][0].slice(1, filtered[i][0].length)
            filtered[i][0] = yo
        }
        const bro = filtered.map(cookie => cookie.join(""))
        const sis = bro.join("")
        document.location.reload()
        setCookie("cart", sis)
    }


    const subTotal = () => {
        let tot = 0
        for(let i = 0; i < cookieArr.length; i++) {
            const cost = Number(cookieArr[i][4] ? cookieArr[i][4] : cookieArr[i][2], 10)
            tot += cost
        }
        const stringTot = tot.toString()
        const totRounded = stringTot.slice(0, 5)
        return totRounded
    }


    const tax = () => {
        const toNumber = Number(subTotal() ,10)
        const tax = toNumber * .056
        const taxRounded = tax.toString().slice(0, 4)
        return taxRounded
    }
    

    const deliveryCost = 4.99


    const total = () => {
        const totalNoDeliveryNumber = Number(subTotal() ,10) + Number(tax() ,10)
        const totalNoDeliveryNumberRounded = totalNoDeliveryNumber.toString().slice(0, 5)
        const totalNumber = Number(subTotal() ,10) + Number(tax() ,10) + deliveryCost
        const totalRounded = totalNumber.toString().slice(0, 5)
        if (deliveryState === false) {
            return totalNoDeliveryNumberRounded
        } else {
            return totalRounded
        }
    }


    // PICKUP/DELIVERY ----
    const colorDelivery = () => {
        if(deliveryState === true){
            return {color: "#6AB547"}
        }
    } 

    const colorPickup = () => {
        if(deliveryState === true){
            return {color: "#242423"}
        }
    }

    const showDeliveryFee = () => {
        if(deliveryState === true){
            return {display: "block"}
        }
    }



    // COMPONENTS ----
    // order
    const CurrentOrder = () => {
        // 0 = name
        // 1 = size
        // 2 = crust
        // 3 = toppings
        // 4 = price
        // 5 = id
        return cookieArr.map(cookie => (
            <div className="cart__order-item" key={cookie[5] ? cookie[5] : cookie[3]}>
                <h1 className="cart__order-name">{cookie[0].toString()}</h1>
                {
                    cookie.length < 5
                    ?
                <div className="cart__order-content">
                    <div className="cart__order-content-content">
                        <p>{cookie[1].toString()}</p>
                    </div>
                </div>
                    :
                <div className="cart__order-content">
                    <div className="cart__order-crust">
                        <h2>Crust: </h2><p>{cookie[1].toString()}</p>
                    </div>
                    <div className="cart__order-size">
                        <h2>Size: </h2><p>{cookie[2].toString()}</p>
                    </div>
                    <div className="cart__order-toppings">
                         <h2>Toppings: </h2><p>{cookie[3].toString()}</p>
                    </div>
                </div>
                }
                    
                    <div className="cart__order-price">
                        <p>${cookie[4] ? cookie[4].toString() : cookie[2]}</p>
                    </div>
                <div className="cart__order-delete">
                    <button onClick={() => deleteItem(cookie[5] ? cookie[5] : cookie[3])}>Delete</button>
                </div>
            </div>
        ))
    }
    // order total
    const OrderTotal = () => {
        return (
            <div className="cart__order-total">      
                <div className="cart__order-sub-total"><h1>Subtotal:</h1><p>${subTotal()}</p></div>
                <div className="cart__order-tax"><h1>Tax:</h1><p>${tax()}</p></div>
                <div className="cart__order-fee" style={showDeliveryFee()}><h1>Delivery Fee:</h1><p>${deliveryCost}</p></div>
                <div className="cart__order-comp-total"><h1>Total:</h1><p>${total()}</p></div>
                <button className="cart__order-checkout">Checkout</button>
                <Link to="/">
                    <button onClick={clearCart} className="cart__clear-cart">
                        CLEAR CART
                    </button>
                </Link>  
            </div>
        )
    }



    // LOADED ----
    const loaded = () => {
        return (
            <div className="cart">
                
                <div className="cart__delivery-buttons">
                    <button id="pick-up"  onClick={() => setDeliveryState(false)} style={colorPickup()}>
                        Pick Up
                    </button>
                    <button onClick={() => setDeliveryState(true)} style={colorDelivery()}>
                        Delivery
                    </button>
                </div>

                <div className="cart__order">
                    <CurrentOrder />
                </div>

                <div className="cart-menu" onClick={() => document.location.reload()}>
                    <MenuItem   
                        category={menu[3].category}
                        key={menu[3]._id}
                        img={menu[3].img}
                        name={menu[3].name}
                        price={menu[3].price}
                        id={menu[3].name.replaceAll(' ', '-')}
                    />
                    <p >Add Wings?</p>
                </div>
                
                <OrderTotal />

            </div>
        )
    }



    // LOADING ----
    const loading = () => {
        return <h1>loading</h1>
    }



    // RETURN ----
    return (
        <div>
            {menu ? loaded() : loading()}
        </div>
    )
}


export default Cart