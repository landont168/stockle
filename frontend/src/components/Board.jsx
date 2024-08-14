import BoardRow from './BoardRow'

const Board = ({ guesses, solution }) => {
  return (
    <div className='board'>
      <div className='row'>
        <h3 className='row-name'>Name</h3>
        <h3 className='row-sector'>Sector</h3>
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
