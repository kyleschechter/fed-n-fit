import React from "react"

import ActivityCard from "./ActivityCard"

const ActivityContainer = ({ foods, handleDelete }) => {

  const foodList = (foodType) => (
    foods
    .filter(food => food.type === foodType)
    .map(food => {
      return (
        <ActivityCard 
        key={food.id}
        food={food}
        deleteFood={() => handleDelete(food.id)}
        />
      )
    })
  )

  return (
    <div className="activity-container">
      <div className="activity-card">
        <h3>Breakfast</h3>
        <ul>
          {foodList("Breakfast")}
        </ul>
        <button>DONE</button>
      </div>
      <div className="activity-card">
        <h3>Lunch</h3>
        <ul>
          {foodList("Lunch")}
        </ul>
        <button>DONE</button>
      </div>
      <div className="activity-card">
        <h3>Dinner</h3>
        <ul>
          {foodList("Dinner")}
        </ul>
        <button>DONE</button>
      </div>
      <div className="activity-card">
        <h3>*Snacks*</h3>
        <ul>
          {foodList("Snack")}
        </ul>
      </div>
    </div>
  )
}

export default ActivityContainer