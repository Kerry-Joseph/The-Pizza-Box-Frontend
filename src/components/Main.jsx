import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Presets from "../pages/Presets"
import PizzaPage from "../pages/CreatePizza"
import Cart from "../pages/Cart"
import Menu from "../pages/Menu"

const Main = () => {
    const [meals, setMeals] = useState(null)
    const [presets, setPresets] = useState(null)
    const [menu, setMenu] = useState(null)

    // turns toppings into string
    const toppingsString = toppings => {
        const entries = Object.entries(toppings) // turns each topping into its own array
        const entriesWithout0 = [] // removes topping with 0 for its value
        entries.forEach(topping => {
            if(topping.includes(0) === false)
            entriesWithout0.push(topping)
        })
        const arrItemString = entriesWithout0.map(arritem => arritem.toString()) // turns each topping into a string
        const itemWithComma = arrItemString.map(item => item.replace(',', ' x')) // replaces commas for "X"
        const capital = itemWithComma.map(item => item.charAt(0).toUpperCase() + item.slice(1)) // capitalizes first letter of each topping
        const spacedItem = capital.map(item => item.replace(/([A-Z])/g, " $1")) //adds space before each capital letter 
        const splitItem = spacedItem.map(item => item.split('')) 
        splitItem.forEach(item => {
            if(item.includes("x" && "1")) {
                item.splice(-3,3)
            } else {
                return
            }
        }) // removes "X1" from each topping 
        const joinItem = splitItem.map(item => item.join(''))
        return joinItem.toString()
    }
    
    // turns crust or size into a string
    const crustOrSizeString = (crustOrSize) => {
        const string = Object.keys(crustOrSize).toString()
        const firstCaptialLetter = string.charAt(0).toUpperCase()
        const crustWithoutFirstLetter = string.toString().slice(1)
        return firstCaptialLetter + crustWithoutFirstLetter
    }
   
    

    const getMeals = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/deals")
            const data = await res.json()
            setMeals(data)
        } catch (err) {
            console.log("failed to fetch meals")
        }
        
    }
    
    const getPresets = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/pizzas")
            const data = await res.json()
            setPresets(data)
        } catch (err) {
            console.log("failed to fetch presets")
        }
    }

    const createPreset = async (preset) => {
        await fetch("http://localhost:3001/api/pizzas", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(preset)
        })
        getPresets()
    }

    const getMenu = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/menu-items")
            const data = await res.json()
            setMenu(data)
        } catch (err) {
            console.log("failed to fetch menu items")
        }
    }

    useEffect(() => {
        getMeals()
        getPresets()
        getMenu() 
    }, [])

    return (
        <main>
                <Routes>
                    <Route path="/" element={
                        <Home 
                            meals={meals}
                        />
                    }/>
                    <Route path="/presets" element={
                        <Presets
                            presets={presets}
                            toppingsString={toppingsString}
                            crustOrSizeString={crustOrSizeString}
                        />
                    }/>
                    <Route path="/create-pizza" element={
                        <PizzaPage 
                            createPreset={createPreset}
                            toppingsString={toppingsString}
                            crustOrSizeString={crustOrSizeString}
                        />
                    } />
                    <Route path="/cart" element={
                        <Cart
                            menu={menu}
                        />
                    } />
                    <Route path="/menu" element={
                        <Menu
                            menu={menu}
                        />
                    } />
                </Routes>
        </main>
    )
}

export default Main