
const PresetsList = ({ presets, filter, toppingsString, crustOrSizeString }) => {

    // LOADED ----
    const loaded = () => {
        
        const filteredPresets = presets.filter(preset => preset.name.includes(filter.text))

        return filteredPresets.map((preset) => (
          <div className={`list-item list-item--${preset.name.replace(' ', '-')}`} key={preset._id}>
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