import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Presets from "../pages/Presets"
import PizzaPage from "../pages/CreatePizza"

const Main = () => {
    const [meals, setMeals] = useState(null)
    const [presets, setPresets] = useState(null)

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

    useEffect(() => {
        getMeals()
        getPresets()
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
                    />
                }/>
                <Route path="/create-pizza" element={
                    <PizzaPage 
                        createPreset={createPreset}
                    />
                } />
            </Routes>
        </main>
    )
}

export default Main