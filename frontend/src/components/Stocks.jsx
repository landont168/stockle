const Stocks = ({ stocks }) => {
  return (
    <div>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>{stock.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Stocks
