
const PresetsList = ({ presets, filter }) => {

    // LOADED ----
    const loaded = () => {
        // turns toppings of preset into a string
        const toppingsString = toppings => {
            const entries = Object.entries(toppings) // turns each topping into its own array
            const entriesWithout0 = [] // removes topping with 0 for its value
            entries.forEach(topping => {
                if(topping.includes(0) === false)
                entriesWithout0.push(topping)
            })
            const arrItemString = entriesWithout0.map(arritem => arritem.toString()) // turns each topping into a string
            const itemWithComma = arrItemString.map(item => item.replace(',', ' X')) // replaces commas for "X"
            const capital = itemWithComma.map(item => item.charAt(0).toUpperCase() + item.slice(1)) // capitalizes first letter of each topping
            const spacedItem = capital.map(item => item.replace(/([A-Z])/g, " $1")) //adds space before each capital letter 
            const splitItem = spacedItem.map(item => item.split('')) 
            splitItem.forEach(item => {
                if(item.includes("X" && "1")) {
                    item.splice(-4,4)
                } else {
                    return
                }
            }) // removes "X1" from each topping 
            const joinItem = splitItem.map(item => item.join(''))
            return joinItem.toString()
        }
        
        // turns crust of preset into a string
        const crustOrSizeString = (crustOrSize) => {
            const string = Object.keys(crustOrSize).toString()
            const firstCaptialLetter = string.charAt(0).toUpperCase()
            const crustWithoutFirstLetter = string.toString().slice(1)
            return firstCaptialLetter + crustWithoutFirstLetter
        }
        
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