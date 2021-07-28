import React from 'react'

import ActivityCard from './ActivityCard'

const FitContainer = ({ fits, carDone, wtDone, doneWithActivity, deleteActivity }) => {
  const listOfFitTypes = [
    {
      fitType: 'Cardio',
      isDone: carDone
    },
    {
      fitType: 'Weight Training',
      isDone: wtDone
    }
  ]

  const allActivityCards = listOfFitTypes.map(ft => {
    return (
      <ActivityCard
        key={ft.fitType}
        fits={fits}
        fitType={ft.fitType}
        isDone={ft.isDone}
        deleteActivity={deleteActivity}
        doneWithActivity={doneWithActivity} />
    )
  })
  return (
    <div className="activity-container">
      {allActivityCards}
    </div>
  )
}

export default FitContainer
