const SearchResult = ({ result, handleClick }) => {
  return (
    <div className='search-result' onClick={handleClick}>
      {result.name}
    </div>
  )
}

export default SearchResult
