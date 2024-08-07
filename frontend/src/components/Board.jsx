import Row from './Row'

const Board = ({ guesses }) => {
  return (
    <div>
      <div className='row'>
        <h3>Name</h3>
        <h3>Sector</h3>
        <h3>Market Cap</h3>
        <h3>Share Price</h3>
        <h3>Revenue</h3>
        <h3>Volume</h3>
      </div>

      {guesses.map((guess, i) => {
        return <Row key={i} guess={guess} />
      })}
    </div>
  )
}

export default Board
