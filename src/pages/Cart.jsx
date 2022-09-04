import { useContext } from "react"
import { GetCookieContext } from ".."
import { SetCookieContext } from ".."

const Cart = () => {
    
    const setCookie = useContext(SetCookieContext)
    const getCookie = useContext(GetCookieContext)

    console.log(getCookie("cart"))
    const cookie = getCookie("cart")

    const test = () => {
        const prev = getCookie("cart")
        setCookie("cart", `${prev} | second`)
    }
    
    const cookieArray = () => {
        const arr = cookie.split("/")
        arr.splice(-1, 1)
        const bo = arr.map(item => item.split("|"))
        console.log(bo)
    }
    console.log(getCookie("cart"))
    // cookieArray()

    return (
        <h1 onClick={() => test()}>cart</h1>
    )
}

export default Cart