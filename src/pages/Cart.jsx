import { useContext } from "react"
import { Link } from "react-router-dom"
import { GetCookieContext } from ".."
import { SetCookieContext } from ".."
import "./page-css/cart.scss"

const Cart = () => {
    // CONTEXT
    const setCookie = useContext(SetCookieContext)
    const getCookie = useContext(GetCookieContext)

    
    const cookie = getCookie("cart")
    
    const clearCart = () => {
        setCookie("cart", "")
    }

    const cookieArray = () => {
        const arr = cookie.split("/")
        arr.splice(-1, 1)
        const arrOfArrays = arr.map(item => item.split("|"))
        return arrOfArrays
    }
    const cookieArr = cookieArray()
    
    console.log(cookieArr)

    const deleteItem = (id) => {
        const filtered = cookieArr.filter(cookie => cookie.includes(id) === false)
        filtered.forEach(cookie => {
                cookie[1] = "|" + cookie[1]
                cookie[2] = "|" + cookie[2]
                cookie[3] = "|" + cookie[3]
                cookie[4] = "|" + cookie[4]
                cookie[5] = "|" + cookie[5] + "/"
        })
        const bro = filtered.map(cookie => cookie.join(""))
        const sis = bro.join("")
        document.location.reload()
        setCookie("cart", sis)
    }

    const subTotal = () => {
        let tot = 0
        for(let i = 0; i < cookieArr.length; i++) {
            const cost = Number(cookieArr[i][4], 10)
            tot += cost
        }
        return tot
    }

    const tax = subTotal() * .056
    const ton = tax.toString()
    console.log(ton.length)
    // COMPONENTS ----
    const CurrentOrder = () => {
        // 0 = name
        // 1 = size
        // 2 = crust
        // 3 = toppings
        // 4 = price
        // 5 = id
        return cookieArr.map(cookie => (
            <div className="cart__order-item" key={cookie[5]}>
                <h1 className="cart__order-name">{cookie[0].toString()}</h1>
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
                    
                    <div className="cart__order-price">
                        <p>${cookie[4].toString()}</p>
                    </div>
                <div className="cart__order-delete">
                    <button onClick={() => deleteItem(cookie[5])}>delete</button>
                </div>
            </div>
        ))
    }

    const OrderTotal = () => {
        return (
            <div className="cart__order-total">
                <div>
                    <div><h1>Subtotal:</h1><p>${subTotal()}</p></div>
                </div>
            </div>
        )
    }


    return (
        <div className="cart">
            <div className="cart__delivery-buttons">
                <button id="pick-up">Pick Up</button>
                <button>Delivery</button>
            </div>
            <div className="cart__order">
                <CurrentOrder />
                <Link to="/">
                    <button onClick={clearCart} className="cart__clear-cart">
                        clear cart
                    </button>
                </Link>
            </div>
            <OrderTotal />
        </div>
    )
}

export default Cart