import { useSelector } from 'react-redux'
import Modal from './Modal'
import DistributionChart from './DistributionChart'

const Statistics = ({ setShowStats, text }) => {
  const user = useSelector((state) => state.user)
  const winPercentage =
    Math.round((user.gamesWon / user.gamesPlayed) * 100) || 0

  return (
    <Modal handleClose={() => setShowStats(false)}>
      <h1 className='modal-title'>{text}</h1>
      <h4>STATISTICS</h4>
      <div className='modal-stats'>
        <div className='modal-stat'>
          <h1>{user.gamesPlayed}</h1>
          <span>Played</span>
        </div>
        <div className='modal-stat'>
          <h1>{winPercentage}</h1>
          <span>Win %</span>
        </div>
        <div className='modal-stat'>
          <h1>{user.currentStreak}</h1>
          <span>Current Streak</span>
        </div>
        <div className='modal-stat'>
          <h1>{user.maxStreak}</h1>
          <span>Max Streak</span>
        </div>
      </div>
      <h4>GUESS DISTRIBUTION</h4>
      <DistributionChart distribution={user.guessDistribution} />
    </Modal>
  )
}

export default Statistics
