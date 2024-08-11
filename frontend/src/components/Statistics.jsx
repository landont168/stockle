import ModalTemplate from './ModalTemplate'
import DistributionChart from './DistributionChart'

const Statistics = ({ user, setShowStats }) => {
  const winPercentage = Math.round((user.gamesWon / user.gamesPlayed) * 100)

  return (
    <ModalTemplate handleClose={() => setShowStats(false)}>
      <h1 className='modal-title'>History</h1>
      <h4>STATISTICS</h4>
      <div className='modal-stats'>
        <div className='stat'>
          <h1>{user.gamesPlayed}</h1>
          <span>Played</span>
        </div>
        <div className='stat'>
          <h1>{winPercentage}</h1>
          <span>Win %</span>
        </div>
        <div className='stat'>
          <h1>{user.currentStreak}</h1>
          <span>Current Streak</span>
        </div>
        <div className='stat'>
          <h1>{user.maxStreak}</h1>
          <span>Max Streak</span>
        </div>
      </div>
      <h4>GUESS DISTRIBUTION</h4>
      <DistributionChart distribution={user.guessDistribution} />
    </ModalTemplate>
  )
}

export default Statistics
