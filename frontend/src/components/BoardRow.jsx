const BoardRow = ({ guess }) => {
  return (
    <div className='row'>
      <div>{guess && guess.ticker}</div>
      <div>{guess && guess.sector}</div>
      <div>{guess && guess.marketCap}</div>
      <div>{guess && guess.sharePrice}</div>
      <div>{guess && guess.revenue}</div>
      <div>{guess && guess.volume}</div>
    </div>
  )
}

export default BoardRow
