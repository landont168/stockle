import SearchResult from './SearchResult'

const SearchResults = ({ results, setSearch }) => {
  return (
    <div className='search-results'>
      {results.map((result, id) => {
        return (
          <SearchResult
            key={id}
            result={result}
            handleClick={() => setSearch(`${result.name} (${result.ticker})`)}
          />
        )
      })}
    </div>
  )
}

export default SearchResults
