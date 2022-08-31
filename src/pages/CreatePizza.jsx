import { useState } from "react"

const PizzaPage = ( {presets} ) => {

    

    const [pizza, setPizza] = useState({
        name: {},
        size: {},
        crust: {},
        toppings: {},
        price: 0
    })
    

    const addSize = (key) => {
        setPizza((prev) => {
            return {
                ...prev, 
                size : { ...prev.size,
                    [key]: true}
                
            }
        })
    }
    const addCrust = (key) => {
        setPizza((prev) => {
            return {
                ...prev, 
                crust : { ...prev.crust,
                    [key]: true}
                
            }
        })
    }
    const addToppings = (key) => {
        setPizza((prev) => {
            if (prev.toppings[key] >= 1){
                return {
                    ...prev, 
                    toppings : { ...prev.toppings,
                        [key]: prev.toppings[key]++ },
                    price: prev.price + .50
                } 
            } else {
                return {
                    ...prev, 
                    toppings : { ...prev.toppings,
                        [key]: 1},
                    price: prev.price + .50
                }  
            }
        })
    }
    const subtractToppings = (key) => {
        setPizza(prev => {
            if (prev.toppings[key] >= 1){
                return {
                    ...prev,
                    toppings : { ...prev.toppings,
                        [key]: prev.toppings[key]-- },
                    price: prev.price - .5
                } 
            } else {
                return {
                    ...prev,
                    toppings : { ...prev.toppings,
                        [key]: 0 },
                    price: prev.price - .5
                }
            }
        })
    }

    const disableTopping = (key) => {
        if (pizza.toppings[key] === undefined || 0)
        return true
        if (pizza.toppings[key] === 0)
        return true
    }

    const onOne = (key) => {
        if (pizza.toppings[key] >= 1)
        return {color: "red"}
    }

    const toppingCount = (key) => {
        if (pizza.toppings[key] > 1)
        return pizza.toppings[key]
    }

    const Topping = ({topping}) => {
        return (
            <div>
                <p style={onOne(topping)}>{topping}</p>
                <button onClick={() => addToppings(topping)} >+</button>
                <button 
                    onClick={() => subtractToppings(topping)} 
                    disabled={disableTopping(topping)}>
                        -
                </button>
                {toppingCount(topping)}
            </div>
        )
    }

    const log = () => console.log(pizza.toppings.pineapple)
   
    
    return (
        <div className="pizza-page">
            <div><p>log</p><button id="log" onClick={log}>+</button></div>
            <div>
                <strong>size</strong>
                <div><p>small</p><button onClick={() => addSize("small")}>+</button></div>
                <div><p>medium</p><button onClick={() => addSize("medium")}>+</button></div>
                <div><p>large</p><button onClick={() => addSize("large")}>+</button></div>
                
            </div>
            <div>
                <strong>crust</strong>
                <div><p>thin</p><button onClick={() => addCrust("thin")}>+</button></div>
                <div><p>regular</p><button onClick={() => addCrust("regular")}>+</button></div>
                <div><p>stuffed</p><button onClick={() => addCrust("stuffed")}>+</button></div>
            </div>
            <div>
                <strong>toppings</strong>
                <Topping topping={"pepperoni"} />
                <Topping topping={"sausage"} />
                <Topping topping={"salami"} />
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
            <div>
                <strong>${pizza.price}</strong>
            </div>

        </div>
    )
}

export default PizzaPage