import { useSelector } from 'react-redux'
import Modal from './Modal'
import DistributionChart from './DistributionChart'
// import CreateAccount from './CreateAccount'

const Statistics = ({ setShowStats, text }) => {
  const user = useSelector((state) => state.user)

  if (!user) {
    return null
  }

  return (
    <Modal handleClose={() => setShowStats(false)}>
      <h1 className='modal-title'>{text}</h1>
      <div>
        <h4>STATISTICS</h4>
        <div className='modal-stats'>
          <div className='modal-stat'>
            <h1>{user.gamesPlayed}</h1>
            <span>Played</span>
          </div>
          <div className='modal-stat'>
            <h1>{Math.round((user.gamesWon / user.gamesPlayed) * 100) || 0}</h1>
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
      </div>
    </Modal>
  )
}

export default Statistics
