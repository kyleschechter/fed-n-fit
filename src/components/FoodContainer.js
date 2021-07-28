import React from 'react'

import MealCard from './MealCard'

const FoodContainer = ({ foods, doneWithMeal, deleteMeal, brDone, luDone, diDone }) => {
  const listOfFoodTypes = [
    {
      foodType: 'Breakfast',
      isDone: brDone
    },
    {
      foodType: 'Lunch',
      isDone: luDone
    },
    {
      foodType: 'Dinner',
      isDone: diDone
    }
  ]

  const allMealCards = listOfFoodTypes.map(ft => {
    return (
      <MealCard
        key={ft.foodType}
        foods={foods}
        foodType={ft.foodType}
        isDone={ft.isDone}
        deleteMeal={deleteMeal}
        doneWithMeal={doneWithMeal} />
    )
  })
  return (
    <div className="activity-container">
      {allMealCards}
    </div>
  )
}

export default FoodContainer
