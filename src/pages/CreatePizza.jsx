import { useEffect, useState } from "react"

const PizzaPage = ( {createPreset} ) => {

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
    

    // TOTAL PRICE ----
    const totalPrice = () => {
        setPizza(prev => {
            return {
                ...prev,
                price: toppingCost + sizeCost + crustCost
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
        if(pizza.size[key] === true) {
            return {color: "red"}
        } else {
            return {color: "blue"}
        }
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
        if(pizza.crust[key] === true) {
            return {color: "red"}
        } else {
            return {color: "blue"}
        }
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

    // disables remove topping button if there is no topping to remove
    const disableTopping = (key) => {
        if (pizza.toppings[key] === undefined || 0)
        return true
        if (pizza.toppings[key] === 0)
        return true
    }

    // highlights selected topping/toppings
    const onOne = (key) => {
        if (pizza.toppings[key] >= 1)
        return {color: "red"}
    }

    // shows amount of topping if it is greater than 1
    const toppingCount = (key) => {
        if (pizza.toppings[key] > 1)
        return pizza.toppings[key]
    }


    // COMPONENETS ----
    // topping component
    const Topping = ({topping}) => {
        return (
            <div className={`pizza-page__toppings--${topping}`}>
                <p 
                    className="pizza-page__name"
                    style={onOne(topping)}>
                        {topping}
                </p>

                <button 
                    className="pizza-page__button pizza-page__button--add"
                    onClick={() => addToppings(topping)}>
                        + 
                </button>

                <button 
                    className="pizza-page__button pizza-page__button--subtract"
                    onClick={() => {subtractToppings(topping)}} 
                    disabled={disableTopping(topping)}>
                        -
                </button>
                <div 
                    className="pizza-page__count">
                    {toppingCount(topping)}
                </div>
            </div>
        )
    }
    // size component
    const Size = ({ size }) => {
        return (    
            <div className={`pizza-page__size--${size}`}>
                <p 
                    className="pizza-page__name"
                    style={activeSize(size)}>
                        {size}
                </p>    
                <button
                    className="pizza-page__button" 
                    onClick={() => {addSize(size); sizePrice(size)}}>
                        +
                </button>
            </div>
        )
    }
    // crust component
    const Crust = ({ crust }) => {
        return (
            <div className={`pizza-page__crust--${crust}`}>
                <p 
                    className="pizza-page__name"
                    style={activeCrust(crust)}>
                        {crust}
                </p>    
                <button 
                    className="pizza-page__button" 
                    onClick={() => { addCrust(crust); crustPrice(crust) }}
                    disabled={disableCrust(crust)}>
                        +
                </button>
            </div>
        )
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
    }
     
   
    // EFFECT ----
    useEffect(() => {
        totalPrice()
    }, [toppingCost, sizeCost, crustCost])


    // const log = () => console.log(pizza)


    // HTML ----
    return (
        <div className="pizza-page">
            {/* <div><p>log</p><button id="log" onClick={log}>+</button></div> */}
            <div className="pizza-page__size">
                <p className="pizza-page__title pizza-page__title--size">
                    Size
                </p>
                <Size size={"small"} />
                <Size size={"medium"} />
                <Size size={"large"} />
                <p className="pizza-page__cost pizza-page__cost--size">
                    ${sizeCost}
                </p>
            </div>
            <div className="pizza-page__crust">
                <p className="pizza-page__title pizza-page__title--crust">
                    Crust
                </p>
                <Crust crust={"thin"} />
                <Crust crust={"regular"} />
                <Crust crust={"stuffed"} />
                <p className="pizza-page__cost pizza-page__cost--crust">
                    ${crustCost}
                </p>
            </div>
            <div className="pizza-page__toppings">
                <p className="pizza-page__title pizza-page__title--toppings">
                    Toppings
                </p>
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
                <p className="pizza-page__cost pizza-page__cost--toppings">
                    ${toppingCost}
                </p>
            </div>
            <div className="pizza-page__total-cost">
                ${pizza.price}
            </div>
            <div className="pizza-page__preset-form">
                <form onSubmit={handleSubmit}>
                    <input name="name" value={pizza.name} type="text" onChange={handleChange} />
                    <input type="submit" value="Create Pizza Preset" />
                </form>
            </div>
        </div>
    )
}

export default PizzaPage