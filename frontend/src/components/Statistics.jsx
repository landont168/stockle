import ModalTemplate from './ModalTemplate'

const Statistics = ({ user, setShowStats }) => {
  return (
    <ModalTemplate handleClose={() => setShowStats(false)}>
      <h1>Statistics</h1>
      <div>Username: {user.username}</div>
      <div>Name: {user.name}</div>
      <div>Games played: {user.gamesPlayed}</div>
      <div>Games won: {user.gamesWon}</div>
      <div>Current streak: {user.currentStreak}</div>
      <div>Max streak: {user.maxStreak}</div>
      <div>Last game won: {user.wonLastGame ? 'Yes' : 'No'}</div>
      <div>Guess distribution: {user.guessDistribution.join(', ')}</div>
    </ModalTemplate>
  )
}

export default Statistics
