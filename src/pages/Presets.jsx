import PresetsList from "./page-components/PresetList"


const Presets = ({ presets }) => {
    return (
        <div className="presets">
            <PresetsList presets={presets}/>
        </div>
    )
}

export default Presets