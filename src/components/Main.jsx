import { useEffect, useState } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"

const Main = () => {
    const [meals, setMeals] = useState(null)

    const getMeals = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/deals")
            const data = await res.json()
            setMeals(data)
        } catch (err) {
            console.log(err)
        }
        
    }   

    useEffect(() => {
        getMeals()
    }, [])

    return (
        <main>
            <Routes>
                <Route path="/" element={
                    <Home 
                        meals={meals}
                    />
                } />
            </Routes>
        </main>
    )
}

export default Main