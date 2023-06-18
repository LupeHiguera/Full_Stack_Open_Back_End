const Filter = ({ handleFilterChange }) => {
    return (
        <form onChange={handleFilterChange}>
            <div> Filter
                <input onChange={handleFilterChange}/>
            </div>
        </form>
    )
}
export default Filter