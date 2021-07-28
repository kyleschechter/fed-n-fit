import React from "react"

const ActivityCard = ({ fits, fitType, isDone, deleteActivity, doneWithActivity }) => {


  const mealCardItem = (fitType) => (
    fits
      .filter(fit => fit.type === fitType)
      .map(fit => {
        return (
        <tr key={fit.id}>
          <td>{fit.activity}</td>
          <td>{fit.duration} min</td>
          {isDone ? null : <td><button onClick={() => deleteActivity(fit.id)}>❌</button></td>}
        </tr>
        )
      })
  )


  return (
    <div className="activity-card">
    <table>
      <tr>
        <th style={isDone ? { color: 'green' } : { color: 'red' }}>{fitType}</th>
        <th id="weight">duration</th>
        <th><button onClick={(e) => doneWithActivity(e)} value={fitType} style={{ fontSize: '20px' }}>{isDone ? '✏️' : 'Done'}</button></th>
      </tr>
      {mealCardItem(fitType)}
    </table>
  </div>
  )
}

export default ActivityCard
