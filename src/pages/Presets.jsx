// IMPORTS ----
import { useState } from "react"

import FilterBar from "./page-components/FilterBar"
import PresetsList from "./page-components/PresetList"

import "./page-css/presets.scss"



const Presets = ({ presets, toppingsString, crustOrSizeString }) => {
    // STATE ----

    const [filter, setFilter] = useState({text: ""})



    // FILTER BAR HANDLE CHANGE ----

    const handleChange = e => {
        setFilter(prev => ({
            ...prev, text: [e.target.value]
        }))
    }



    // RETURN ----
    return (
        <div className="presets">

            <FilterBar 
                filter={filter} 
                handleChange={handleChange} 
            />

            <PresetsList 
                presets={presets} 
                filter={filter} 
                toppingsString={toppingsString}
                crustOrSizeString={crustOrSizeString}
            />
            
        </div>
    )
}


// EXPORTS ----
export default Presets