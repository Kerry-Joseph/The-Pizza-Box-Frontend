import { useState } from "react"
import FilterBar from "./page-components/FilterBar"
import PresetsList from "./page-components/PresetList"


const Presets = ({ presets }) => {

    const [filter, setFilter] = useState({text: ""})

    const handleChange = e => {
        setFilter(prev => ({
            ...prev, text: [e.target.value]
        }))
    }

    return (
        <div className="presets">
            <FilterBar filter={filter} handleChange={handleChange} />
            <PresetsList presets={presets} filter={filter} />
        </div>
    )
}

export default Presets