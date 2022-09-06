import { useContext, useEffect, useState } from "react"
import "./page-css/createPizza.scss"
import { SetCookieContext } from ".."
import { GetCookieContext } from ".."
import { Link } from "react-router-dom"

const PizzaPage = ( { createPreset, toppingsString, crustOrSizeString } ) => {

    // STATES  ----
    const [toppingCost, setToppingCost] = useState(0)
    const [sizeCost, setSizeCost] = useState(0)
    const [crustCost, setCrustCost] = useState(0)
    const [pizza, setPizza] = useState({
        name: "",
        size: {},
        crust: {},
        toppings: {},
        price: 3.99
    })
    const [modal, setModal] = useState({
        namePreset: false,
        submitted: false,
        requirements: false,
        addToCart: false
    })
    
    
    // TOTAL PRICE ----
    const totalPrice = () => {
        setPizza(prev => {
            const total = 3.99 + toppingCost + sizeCost + crustCost
            const totalRounded = total.toString().slice(0, 5)
            return {
                ...prev,
                price: totalRounded
            }
        })
    }



    // SIZE ----
    // sets selected pizza size to pizza state
    const addSize = (key) => {
        setPizza((prev) => {
            return {
                ...prev, 
                size : {[key]: true}
                
            }
        })
    }

    // sets cost of selected pizza size
    const sizePrice = (sizeType) => {
        if(sizeType === "small"){
            setSizeCost(.99)
        } else if(sizeType === "medium"){
            setSizeCost(1.99)
        } else if(sizeType === "large"){
            setSizeCost(2.99)
        }
    }

    // highlights selected size
    const activeSize = (key) => {
        if(pizza.size[key] === true) 
        return {color: "#E5E5E5", fontWeight: "700", backgroundColor: "#6AB547" }
    }

    

    // CRUST ----
    // sets selected pizza crust to pizza state
    const addCrust = (key) => {
        setPizza((prev) => {
            return {
                ...prev, 
                crust : {[key]: true}
            }
        })
        
    }

    // sets cost of selected pizza size
    const crustPrice = (crustType) => {
        if(crustType === "thin"){
            setCrustCost(.25)
        } else if(crustType === "regular"){
            setCrustCost(.50)
        } else if(crustType === "stuffed"){
            setCrustCost(.75)
        }
    }

    // disables button for the selected crust
    const disableCrust = (key) => {
        if(pizza.crust[key] === true)
        return true
    } 

    // highlights selected crust
    const activeCrust = (key) => {
        if(pizza.crust[key] === true) 
            return {color: "#E5E5E5", fontWeight: "700", backgroundColor: "#6AB547" }
    }



    // TOPPINGS ----
    // adds selected toppings to pizza state & adds the cost of the topping to topping cost state
    const addToppings = (key) => {
        setPizza((prev) => {
            if (prev.toppings[key] >= 1){
                setToppingCost(prev => prev + .5)
                return {
                    ...prev, 
                    toppings : { ...prev.toppings,
                        [key]: prev.toppings[key]++ },
                } 
            } else {
                setToppingCost(prev => prev + .5)
                return {
                    ...prev, 
                    toppings : { ...prev.toppings,
                        [key]: 1},
                }  
            }
        })
    }

    // removes selected toppings from pizza state & adds the cost of the topping to topping cost state
    const subtractToppings = (key) => {
        setPizza(prev => {
            if (prev.toppings[key] >= 1){
                setToppingCost(prev => prev - .5)
                return {
                    ...prev,
                    toppings : { ...prev.toppings,
                        [key]: prev.toppings[key]-- },
                } 
            } else {
                setToppingCost(prev => prev - .5)
                return {
                    ...prev,
                    toppings : { ...prev.toppings,
                        [key]: 0 },
                }
            }
        })
    }

    // disables topping button if there is no topping or 10 of the topping
    const disableSubtract = (key) => {
        if (pizza.toppings[key] === undefined)
        return true
        if (pizza.toppings[key] === 0)
        return true
    }
    const disableAdd = (key) => {
        if (pizza.toppings[key] > 9)
        return true
    }

    // highlights selected topping/toppings
    const activeTopping = (key) => {
        if (pizza.toppings[key] >= 1)
        return {color: "#E5E5E5", fontWeight: "700" }
    }

    // shows amount of topping if it is greater than 1
    const toppingCount = (key) => {
        if (pizza.toppings[key] > 1){
            return pizza.toppings[key]
        } else {
            return "+"
        }
    }



    // PRESET NAME FORM ----
    const handleChange = e => {
        setPizza(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        createPreset(pizza)
        setModal(prev => ({
            ...prev, 
            namePreset: false,
            submitted: true
        }))
    }
     
   

    // EFFECT ----
    useEffect(() => {
        totalPrice()
    }, [toppingCost, sizeCost, crustCost])



    // MODAL ----
    const showNamePreset = () => {
        if(modal.namePreset === true) {
            return {display: "flex"}
        }
    }
    const showSubmitted = () => {
        if(modal.submitted === true) {
            return {display: "flex"}
        }
    }
    const showRequirements = () => {
        if(modal.requirements === true) {
            return {display: "flex"}
        }
    }
    const requirementCheck = () => {
        const toppingWith0Vlaue = Object.entries(pizza.toppings).map(topping => topping.includes(0))

        if(Object.entries(pizza.size).length === 0) {
            setModal(prev => ({...prev, requirements: true})) 
        } else if(Object.entries(pizza.crust).length === 0) {
            setModal(prev => ({...prev, requirements: true})) 
        } else if(Object.entries(pizza.toppings).length === 0) {
            setModal(prev => ({...prev, requirements: true})) 
        } else if(toppingWith0Vlaue.includes(true)) {
            setModal(prev => ({...prev, requirements: true})) 
        } else {
            setModal(prev => ({...prev, namePreset: true}) )
        }
    }
    const requirementCartCheck = () => {
        const toppingWith0Vlaue = Object.entries(pizza.toppings).map(topping => topping.includes(0))

        if(Object.entries(pizza.size).length === 0) {
            setModal(prev => ({...prev, requirements: true})) 
        } else if(Object.entries(pizza.crust).length === 0) {
            setModal(prev => ({...prev, requirements: true})) 
        } else if(Object.entries(pizza.toppings).length === 0) {
            setModal(prev => ({...prev, requirements: true})) 
        } else if(toppingWith0Vlaue.includes(true)) {
            setModal(prev => ({...prev, requirements: true})) 
        } else {
            setModal(prev => ({...prev, addToCart: true}) )
        }
    }
    const showAddToCart = () => {
        if(modal.addToCart === true){
            return {display: "flex"}
        }
    }



    // COOKIE ----
    const setCookie = useContext(SetCookieContext)
    const getCookie = useContext(GetCookieContext)
    const toppings = toppingsString(pizza.toppings)
    const crust = crustOrSizeString(pizza.crust)
    const size = crustOrSizeString(pizza.size)
    const id = Math.random()
    const pizzaCookieString = `Personal Pizza|${size}|${crust}|${toppings}|${pizza.price}|${id}/`
    
    const cookie = () => {
        const prev = getCookie("cart")
        setCookie("cart", `${prev}${pizzaCookieString}`)
    }    
    
    // COMPONENETS ----
    // topping component
    const Topping = ({topping}) => {
        return (
            <div className={`pizza-page__list-item pizza-page__list-item--${topping}`}>
                <p 
                    className="pizza-page__name"
                    style={activeTopping(topping)}>
                        {topping.charAt(0).toUpperCase() + topping.toString().slice(1)}
                </p>

                <button 
                    className="pizza-page__button pizza-page__button--add"
                    onClick={() => addToppings(topping)}
                    disabled={disableAdd(topping)}>
                        {toppingCount(topping)} 
                </button>

                <button 
                    className="pizza-page__button pizza-page__button--subtract"
                    onClick={() => {subtractToppings(topping)}} 
                    disabled={disableSubtract(topping)}>
                        -
                </button>
            </div>
        )
    }
    // size component
    const Size = ({ size }) => {
        return (    
            <div className={`pizza-page__list-item pizza-page__list-item--${size}`}>
                <button
                    className="pizza-page__button" 
                    onClick={() => {addSize(size); sizePrice(size)}}
                    style={activeSize(size)}>
                        {size.charAt(0).toUpperCase() + size.toString().slice(1)}
                </button>
            </div>
        )
    }
    // crust component
    const Crust = ({ crust }) => {
        return (
            <div className={`pizza-page__list-item pizza-page__list-item--${crust}`}>  
                <button 
                    className="pizza-page__button" 
                    onClick={() => { addCrust(crust); crustPrice(crust) }}
                    disabled={disableCrust(crust)}
                    style={activeCrust(crust)}>
                        {crust.charAt(0).toUpperCase() + crust.toString().slice(1)}
                </button>
            </div>
        )
    }


    
    // HTML ----
    return (
        <div className="pizza-page">
            
            {/* SIZE */}
            <div className="pizza-page__size">
                <div className="pizza-page__title-cost">
                    <p className="pizza-page__title">
                        SIZE
                    </p>
                    <p className="pizza-page__cost">
                        ${sizeCost}
                    </p>
                </div>
                <div className="pizza-page__list">
                    <Size size={"small"} />
                    <Size size={"medium"} />
                    <Size size={"large"} />
                </div>
            </div>

            {/* CRUST */}
            <div className="pizza-page__crust">
                <div className="pizza-page__title-cost">
                    <p className="pizza-page__title">
                        CRUST
                    </p>
                    <p className="pizza-page__cost">
                        ${crustCost}
                    </p>    
                </div>
                <div className="pizza-page__list">
                    <Crust crust={"thin"} />
                    <Crust crust={"regular"} />
                    <Crust crust={"stuffed"} />
                </div>
            </div>

            {/* TOPPINGS */}
            <div className="pizza-page__toppings">
                <div className="pizza-page__title-cost">
                    <p className="pizza-page__title ">
                        TOPPINGS
                    </p>
                    <p className="pizza-page__cost">
                        ${toppingCost}
                    </p>
                </div>
                <div className="pizza-page__list">
                    <Topping topping={"pepperoni"} />
                    <Topping topping={"sausage"} />
                    <Topping topping={"salami"}/>
                    <Topping topping={"beef"} />
                    <Topping topping={"ham"} />
                    <Topping topping={"spinach"} />
                    <Topping topping={"pineapple"} />
                    <Topping topping={"anchovies"} />
                    <Topping topping={"olives"} />
                    <Topping topping={"onions"} />
                    <Topping topping={"mushrooms"} />
                    <Topping topping={"greenPeppers"} />
                </div>
            </div>

            {/* TOTAL COST */}
            <div className="pizza-page__total-cost">
               Total: ${pizza.price}
            </div>

            {/* PRESET AND ADD TO CART BUTTONS */}
            <div className="pizza-page__buttons">
                <button 
                    onClick={() => requirementCheck()} 
                    className="pizza-page__button pizza-page__button--set-preset">
                        Set Preset
                </button>
                <button 
                    className="pizza-page__button pizza-page__button--add-to-cart"
                    onClick={() => {requirementCartCheck()}}>
                    Add to Cart
                </button>
            </div>

            {/* MODALS */}
            <div className="pizza-page__modal--name-preset" style={showNamePreset()}>
                <form onSubmit={handleSubmit}>
                    <h1>PRESET NAME</h1>
                    <input className="pizza-page__modal-text" name="name" value={pizza.name} type="text" onChange={handleChange} />
                    <input className="pizza-page__modal-submit" type="submit" value="Create Pizza Preset" />
                </form>
                <button onClick={() => setModal(prev => ({namePreset: false, submitted: false, requirements: false, addToCart: false}))}>
                    X
                </button>
            </div>

            <div className="pizza-page__modal--submitted" style={showSubmitted()}>
            <button onClick={() => setModal({namePreset: false, submitted: false, requirements: false, addToCart: false})}>
                X
            </button>
            <h1>PRESET CREATED</h1>
            </div>

            <div className="pizza-page__modal--requirements" style={showRequirements()}>
            <button onClick={() => setModal({namePreset: false, submitted: false, requirements: false, addToCart: false})}>
                X
            </button>
            <h1>SIZE, CRUST, AND TOPPINGS ARE REQUIRED</h1>
            </div>

            <div className="pizza-page__modal--add-to-cart" style={showAddToCart()}>
            <button onClick={() => setModal({namePreset: false, submitted: false, requirements: false, addToCart: false})}>
                X
            </button>
            <h1>Are you sure?</h1>
            <div className="yes-no-buttons">
                <Link to="/cart">
                    <button id="yes" onClick={() => cookie()}>
                        YES
                    </button>
                </Link>
                <button id="no" onClick={() => setModal({namePreset: false, submitted: false, requirements: false, addToCart: false})}>
                    NO
                </button>
            </div>
            </div>
            
        </div>
    )
}

export default PizzaPage