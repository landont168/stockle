import BoardRow from './BoardRow'

const Board = ({ guesses, solution }) => {
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
        return <BoardRow key={i} guess={guess} solution={solution} />
      })}
    </div>
  )
}

export default Board
