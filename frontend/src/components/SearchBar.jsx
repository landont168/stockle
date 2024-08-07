import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaSearch } from 'react-icons/fa'
import SearchResults from './SearchResults'

const SearchBar = () => {
  const stocks = useSelector((state) => state.stocks)
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')

  // filter results based on search query
  useEffect(() => {
    const filteredResults = stocks.filter(
      (stock) =>
        search && stock.name.toLowerCase().includes(search.toLowerCase())
    )
    console.log(filteredResults)
    setResults(filteredResults)
  }, [search, stocks])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log(search)
  }

  return (
    <div className='search-container'>
      <form className='search-form' onSubmit={handleSearchSubmit}>
        <div className='search-input'>
          <FaSearch className='search-icon' />
          <input
            type='text'
            value={search}
            name='Search'
            placeholder='Search for a stock'
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className='search-button' type='submit'>
          Guess
        </button>
      </form>
      <SearchResults results={results} setSearch={setSearch} />
    </div>
  )
}

export default SearchBar
