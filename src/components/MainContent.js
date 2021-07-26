import React, { useState, useEffect } from "react"
// import { Avatar, Button } from 'playbook-ui'

import SideBar from "./SideBar"
import Totals from "./Totals"
import ActivityContainer from "./ActivityContainer"

/*
Goals for tomorrow:
  -Move Totals component into activity container
  -Restructure actvitity container and card so they look neater
  -Rename activity container and activity card to "food"
  -Add functionality to "DONE" button that puts a check mark next to meal type in totals box when clicked
  -Also add edit functionality once "Done" is clicked
  -Add alert or visible change when calorie goal is met
  -Work on some styling
   */

const MainContent = () => {
  const url = "http://localhost:4000/food"
  const [foods, setFoods] = useState([])

  useEffect(() => {
    fetch(url)
    .then(r => r.json())
    .then(data => setFoods(data))
  }, [])

  const totalCalories = foods
  .map(food => food.calories)
  .reduce((acc, curr) => acc + curr, 0)

  const submitNewMeal = (data) => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: data.type,
        meal: data.meal,
        weight: parseInt(data.weight),
        calories: parseInt(data.calories)
      })
    }
    fetch(url, configObj)
    .then(r => r.json())
    .then(data => setFoods([...foods, data]))
  }

  const deleteMeal = (mealID) => {
    fetch(`${url}/${mealID}`, { method: "DELETE" })
    .then(() => {
      const newListofFoods = foods.filter(food => food.id !== mealID)
      setFoods(newListofFoods)
    })
  }

  return (
    <div className="main-content">
      <SideBar submitNewMeal={submitNewMeal}/>
      <div className="main-body">
        <Totals total={totalCalories}/>
        <ActivityContainer handleDelete={deleteMeal} foods={foods}/>
      </div>
    </div>
  )
}

export default MainContent