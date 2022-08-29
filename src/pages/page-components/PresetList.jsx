const PresetsList = ({ presets }) => {

    const loaded = () => {

        // turns toppings of preset into a string
        const toppingsString = toppings => {
            const entries = Object.entries(toppings)
            const arrItemString = entries.map(arritem => arritem.toString()) 
            const itemWithSemi = arrItemString.map(item => item.replace(',', ' X'))
            const capital = itemWithSemi.map(item => item.charAt(0).toUpperCase() + item.slice(1))
            const spacedItem = capital.map(item => item.replace(/([A-Z])/g, " $1").trim()) //adds space before each capital letter !!!!LEARN!!!!
            const splitItem = spacedItem.map(item => item.split('')) 
            splitItem.forEach(item => item.unshift(" ")) //adds space before each topping
            splitItem.forEach(item => {
                if(item.includes("X" && "1")) {
                    item.splice(-4,4)
                } else {
                    return
                }
            })
            const joinItem = splitItem.map(item => item.join(''))
            console.log(splitItem)
            return joinItem.toString()
            
        }
        
        const crustString = (crust) => {
            const string = Object.keys(crust).toString()
            return string.charAt(0).toUpperCase() + string.toString().slice(1)
        }

        
        
        return presets.map((preset) => (
          <div className="preset-list__listItem" key={preset._id}>
            <div className="preset-list__listItem--name">{preset.name}</div>
            <div className="preseet-list__listItem--toppings"><p>Size: {crustString(preset.size)} | Crust: {crustString(preset.crust)} | Toppings: {toppingsString(preset.toppings)}</p></div>
          </div>
        ))
    }
     
    const loading = () => {
        return <h1>loading...</h1>
    }

    return (
        <div className="presets-list">
        { presets ? loaded() : loading()}
        </div>
    )
}

export default PresetsList