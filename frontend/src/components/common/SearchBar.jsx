// Controlled client-side search input.
function SearchBar({value,onChange,placeholder='Search records...'}){return <div className="input-group ui-search"><span className="input-group-text"><i className="bi bi-search"/></span><input className="form-control" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></div>}export default SearchBar;
