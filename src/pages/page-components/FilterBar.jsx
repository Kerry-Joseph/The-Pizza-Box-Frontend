const FilterBar = ({ handleChange, filter}) => {

    return (
        <form className="presets__filter-bar">
            <input type="text" placeholder="Search Name" value={filter.text} onChange={handleChange} />
        </form>
    )    
 
}

export default FilterBar