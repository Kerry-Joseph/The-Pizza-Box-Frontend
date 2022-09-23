const FilterBar = ({ handleChange, filter}) => {
    // RETURN ----
    return (
        <form className="filter-bar">
            <input type="text" placeholder="Search Name..." value={filter.text} onChange={handleChange} />
        </form>
    )    
 
}


// EXPORTS ----
export default FilterBar