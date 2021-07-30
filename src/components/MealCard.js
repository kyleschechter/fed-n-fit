import React from "react"

const MealCard = ({ foods, foodType, isDone, deleteMeal, doneWithMeal }) => {
  const mealCardItem = (foodType) => {
    if (foods.length === 0) {
      return (
        <tr>
          <td>. . .</td>
          <td>. . .</td>
          <td>. . .</td>
          <td>. . .</td>
        </tr>
      )
    } else {
      return foods
        .filter(food => food.type === foodType)
        .map(food => {
          return (
          <tr key={food.id}>
            <td>{food.meal}</td>
            <td>({food.weight}g)</td>
            <td>{food.calories} cal</td>
            {isDone ? null : <td><button onClick={() => deleteMeal(food.id)}>❌</button></td>}
          </tr>
          )
        })
    }
  }

  return (
    <div className="activity-card">
      <table>
        <tbody>
          <tr>
            <th style={isDone ? { color: "green" } : { color: "red" }}>{foodType}</th>
            <th id="weight">weight</th>
            <th id="calories">calories</th>
            <th><button onClick={(e) => doneWithMeal(e)} value={foodType} style={{ fontSize: "20px" }}>{isDone ? "✏️" : "Done"}</button></th>
          </tr>
          {mealCardItem(foodType)}
       </tbody>
      </table>
    </div>
  )
}

export default MealCard
