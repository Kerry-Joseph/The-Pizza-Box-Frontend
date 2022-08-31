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
                        [key]: prev.toppings[key]++ }
                } 
            } else {
                return {
                    ...prev, 
                    toppings : { ...prev.toppings,
                        [key]: 1}
                }  
            }
        })
    }
    

    const log = () => console.log(pizza)
   
    
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
                <div><p>pepperoni</p><button onClick={() => addToppings("pepperoni")}>+</button></div>
            </div>

        </div>
    )
}

export default PizzaPage