import { GetCookieContext } from "../.."
import { SetCookieContext } from "../.."
import { useContext } from "react"
import { Link } from "react-router-dom"


const PresetsList = ({ presets, filter, toppingsString, crustOrSizeString }) => {

    // CONTEXT ----
    const setCookie = useContext(SetCookieContext)
    const getCookie = useContext(GetCookieContext)



    const newCookie = (item) => {
        const prev = getCookie("cart")
        setCookie("cart", `${prev}${item}`)
    }  



    // LOADED ----
    const loaded = () => {
        
        const filteredPresets = presets.filter(preset => preset.name.includes(filter.text))

        return filteredPresets.map((preset) => (
            <Link to="/cart" key={preset._id} className="link">
                <div 
                className={`list-item list-item--${preset.name.replace(' ', '-')}`} 
                onClick={() => newCookie(`${preset.name}|${crustOrSizeString(preset.size)}|${crustOrSizeString(preset.crust)}|${toppingsString(preset.toppings)}|${preset.price.toString()}|${Math.random()}/`)}
                >
                <div className={`list-item-name`}>
                    <h2>{preset.name}</h2>
                </div>
                <div className={`list-item-size`}>
                    <h3>Size:</h3> {crustOrSizeString(preset.size)}
                </div>
                <div className={`list-item-crust`}>
                    <h3>Crust:</h3>  {crustOrSizeString(preset.crust)} 
                </div>
                <div className={`list-item-toppings`}>
                    <h3>Toppings:</h3>  {toppingsString(preset.toppings)}
                </div>
                <div className={`list-item-price`}>
                    ${preset.price.toString()}
                </div>
                </div>
            </Link>
        ))
    }
    


    // LOADING ----
    const loading = () => {
        return <h1>loading...</h1>
    }



    // HTML ----
    return (
        // return loading until data is fetched
        <div className="presets-list">
            { presets ? loaded() : loading() } 
        </div>
    )
}

export default PresetsList