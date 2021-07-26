import React from "react"

const ActivityCard = ({ food, deleteFood }) => {

  const { meal, weight, calories } = food

  return (
    <li style={{ listStyleType: "square" }}>
      {meal} ( {weight}g ) - {calories} cal <button onClick={deleteFood}>X</button>
    </li>
  )
}

export default ActivityCard