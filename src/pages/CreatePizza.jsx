import { useEffect, useState } from "react"

const PizzaPage = ( {presets} ) => {

    const [toppingCost, setToppingCost] = useState(0)
    const [sizeCost, setSizeCost] = useState(0)
    const [crustCost, setCrustCost] = useState(0)

    const [pizza, setPizza] = useState({
        name: {},
        size: {},
        crust: {},
        toppings: {},
        price: 0
    })
    
    const totalPrice = () => {
        setPizza(prev => {
            return {
                ...prev,
                price: toppingCost + sizeCost + crustCost
            }
        })
    }

    const addSize = (key) => {
        setPizza((prev) => {
            return {
                ...prev, 
                size : {[key]: true}
                
            }
        })
    }

    const sizePrice = (sizeType) => {
        if(sizeType === "small"){
            setSizeCost(.99)
        } else if(sizeType === "medium"){
            setSizeCost(1.99)
        } else if(sizeType === "large"){
            setSizeCost(2.99)
        }
    }

    const addCrust = (key) => {
        setPizza((prev) => {
            return {
                ...prev, 
                crust : {[key]: true}
            }
        })
        
    }
    const crustPrice = (crustType) => {
        if(crustType === "thin"){
            setCrustCost(.25)
        } else if(crustType === "regular"){
            setCrustCost(.50)
        } else if(crustType === "stuffed"){
            setCrustCost(.75)
        }
    }

    
    const disableCrust = (key) => {
        if(pizza.crust[key] === true)
        return true
    } 

    const activeSize = (key) => {
        if(pizza.size[key] === true) {
            return {color: "red"}
        } else {
            return {color: "blue"}
        }
    }
    const activeCrust = (key) => {
        if(pizza.crust[key] === true) {
            return {color: "red"}
        } else {
            return {color: "blue"}
        }
    }


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
                <p 
                    style={onOne(topping)}>
                        {topping}
                </p>

                <button 
                    onClick={() => addToppings(topping)}>
                        + 
                </button>

                <button 
                    onClick={() => subtractToppings(topping)} 
                    disabled={disableTopping(topping)}>
                        -
                </button>

                {toppingCount(topping)}
            </div>
        )
    }
    const Size = ({ size }) => {
        return (
            <div>
                <p 
                    style={activeSize(size)}>
                        {size}
                </p>    
                <button 
                    onClick={() => {addSize(size); sizePrice(size)}}>
                        +
                </button>
            </div>
        )
    }
    const Crust = ({ crust }) => {
        return (
            <div>
                <p 
                    style={activeCrust(crust)}>
                        {crust}
                </p>    
                <button 
                    onClick={() => { addCrust(crust); crustPrice(crust) }}
                    disabled={disableCrust(crust)}>
                        +
                </button>
            </div>
        )
    }

    const log = () => console.log(pizza)
   
    useEffect(() => {
        totalPrice() 
    }, [toppingCost, sizeCost, crustCost])
    
    return (
        <div className="pizza-page">
            <div><p>log</p><button id="log" onClick={log}>+</button></div>
            <div>
                <strong>size</strong>
                <Size size={"small"} />
                <Size size={"medium"} />
                <Size size={"large"} />
                {sizeCost}
            </div>
            <div>
                <strong>crust</strong>
                <Crust crust={"thin"} />
                <Crust crust={"regular"} />
                <Crust crust={"stuffed"} />
                {crustCost}
            </div>
            <div>
                <strong>toppings</strong>
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
                {toppingCost}
            </div>
            <div>
                <strong>${pizza.price}</strong>
            </div>

        </div>
    )
}

export default PizzaPage