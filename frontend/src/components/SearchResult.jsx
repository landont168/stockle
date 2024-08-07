const SearchResult = ({ result, handleClick }) => {
  return (
    <div className='search-result' onClick={handleClick}>
      {result.name} ({result.ticker})
    </div>
  )
}

export default SearchResult
