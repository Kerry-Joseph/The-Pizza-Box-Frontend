const PresetsList = ({ presets }) => {

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
        const crustString = (crust) => {
            const string = Object.keys(crust).toString()
            const firstCaptialLetter = string.charAt(0).toUpperCase()
            const crustWithoutFirstLetter = string.toString().slice(1)
            return firstCaptialLetter + crustWithoutFirstLetter
        }
        
        
        return presets.map((preset) => (
          <div className={`preset-list__list-item preset-list__list-item--${preset.name.replace(' ', '-')}`} key={preset._id}>
            <div className={`preset-list__list-item-name`}>
                {preset.name}
            </div>
            <div className={`preseet-list__list-item-toppings`}>
                Size: {crustString(preset.size)} | Crust: {crustString(preset.crust)} | Toppings: {toppingsString(preset.toppings)}
            </div>
            <div className={`preset-list__list-item-price`}>
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