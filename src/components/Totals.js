import React from 'react'
import { useHistory } from 'react-router-dom'

const Totals = ({ name, total, goal, aDone, bDone, cDone }) => {
  const history = useHistory()
  const dailyGoalMet = {
    background: 'white',
    color: 'green',
    fontWeight: 'bold',
    border: '2px solid green'
  }

  const checkList = (name) => {
    if (name === 'food') {
      return (
        <div className="totals">
          <h1 onClick={() => history.push('/food')}>Total Eats</h1>
          <p style={total >= goal ? dailyGoalMet : { background: 'white', color: 'red' }}>&nbsp; {total} / {goal} calories &nbsp;</p>
          <p>{aDone ? 'Breakfast [✔️]' : 'Breakfast [ ]'}</p>
          <p>{bDone ? 'Lunch [✔️]' : 'Lunch [ ]'}</p>
          <p>{cDone ? 'Dinner [✔️]' : 'Dinner [ ]'}</p>
        </div>
      )
    } else if (name === 'fit') {
      return (
        <div className="totals">
          <h1 onClick={() => history.push('/fit')}>Total Exercise</h1>
          <p style={total >= goal ? dailyGoalMet : { background: 'white', color: 'red' }}>&nbsp; {total} / {goal} minutes &nbsp;</p>
            <p>{aDone ? 'Cardio [✔️]' : 'Cardio [ ]'}</p>
            <p>{bDone ? 'Weight Training [✔️]' : 'Weight Training [ ]'}</p>
        </div>
      )
    }
  }
  return (
    <div>
      {checkList(name)}
    </div>
  )
}

export default Totals
