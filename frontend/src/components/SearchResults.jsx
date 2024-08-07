import SearchResult from './SearchResult'

const SearchResults = ({ results }) => {
  return (
    <div className='search-results'>
      {results.map((result, id) => {
        return (
          <SearchResult
            key={id}
            result={result}
            handleClick={() => console.log(result)}
          />
        )
      })}
    </div>
  )
}

export default SearchResults
