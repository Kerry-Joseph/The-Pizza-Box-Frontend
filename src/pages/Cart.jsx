// IMPORTS ----
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



    // CONTEXT/COOKIE ----

    // context -
    const setCookie = useContext(SetCookieContext)
    const getCookie = useContext(GetCookieContext)

    // cookie -
    const cookieStr = getCookie("cart")
    
    const clearCart = () => {
        setCookie("")
    }

    // turns the cookie(string) into an array to be manipulated
    const cookieArray = () => {
        const arr = cookieStr.split("/")
        arr.splice(-1, 1)
        const arrOfArrays = arr.map(item => item.split("|"))
        return arrOfArrays
    }



    // COOKIE ARRAY FOR FOLLOWING FUNCTIONS ----

    const cookieArr = cookieArray()



    // DELETE ITEM ----

    const deleteItem = (id) => {
        // filtered = cookie array without item that is to be deleted
        let filtered = cookieArr.filter(cookie => cookie.includes(id) === false)

        for ( let i = 0; i < filtered.length; i++) {
            filtered[i].forEach((attr, index) => {
                attr = "|" + attr
                filtered[i][index] = attr
            })
            filtered[i].push("/")
            const firstBarRemoved = filtered[i][0].slice(1, filtered[i][0].length)
            filtered[i][0] = firstBarRemoved
        }

        const joinedItems = filtered.map(cookie => cookie.join(""))
        const joinedCookie = joinedItems.join("")
        document.location.reload()
        setCookie(joinedCookie)
    }



    // CART TOTAL FUNCTIONS ----

    const subTotal = () => {
        let total = 0
        for(let i = 0; i < cookieArr.length; i++) {
            const cost = Number(cookieArr[i][4] ? cookieArr[i][4] : cookieArr[i][2], 10)
            total += cost
        }
        const stringTot = total.toString()
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

    // order -
    const notAPizzaItem = (cookie) => {
        const name = cookie[0]
        const content = cookie[1]
        const price = cookie[2]
        const id = cookie[3]

        return (
            <div className="cart__order-item" key={id}>

                <h1 className="cart__order-name">{name.toString()}</h1>

                <div className="cart__order-content">
                    <div className="cart__order-content-content">
                        <p>{content.toString()}</p>
                    </div>
                </div>

                <div className="cart__order-price">
                        <p>${price}</p>
                </div>

                <div className="cart__order-delete">
                    <button onClick={() => deleteItem(id)}>Delete</button>
                </div>

            </div>
        )
    }

    const pizzaItem = (cookie) => {
        const name = cookie[0]
        const size = cookie[1]
        const crust = cookie[2]
        const toppings = cookie[3]
        const price = cookie[4]
        const id = cookie[5]
        
        return (
        <div className="cart__order-item" key={id}>

            <h1 className="cart__order-name">{name.toString()}</h1>

            <div className="cart__order-content">
                <div className="cart__order-crust">
                    <h2>Crust: </h2><p>{size.toString()}</p>
                </div>
                <div className="cart__order-size">
                    <h2>Size: </h2><p>{crust.toString()}</p>
                </div>
                <div className="cart__order-toppings">
                    <h2>Toppings: </h2><p>{toppings.toString()}</p>
                </div>
            </div> 

            <div className="cart__order-price">
                <p>${price}</p>
            </div>

            <div className="cart__order-delete">
                <button onClick={() => deleteItem(id)}>Delete</button>
            </div>

        </div>
        )
    }

    const CurrentOrder = () => {
        return cookieArr.map(cookie => (
            cookie[5] ? pizzaItem(cookie) : notAPizzaItem(cookie)
        ))
    }


    // order total -
    const OrderTotal = () => {
        return (
            <div className="cart__order-total">    

                <div className="cart__order-sub-total">
                    <h1>Subtotal:</h1><p>${subTotal()}</p>
                </div>

                <div className="cart__order-tax">
                    <h1>Tax:</h1><p>${tax()}</p>
                </div>

                <div className="cart__order-fee" style={showDeliveryFee()}>
                    <h1>Delivery Fee:</h1><p>${deliveryCost}</p>
                </div>

                <div className="cart__order-comp-total">
                    <h1>Total:</h1><p>${total()}</p>
                </div>

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
        return <h1>loading...</h1>
    }



    // RETURN ----
    return (
        <div>
            {menu ? loaded() : loading()}
        </div>
    )
}



// EXPORTS ----
export default Cart