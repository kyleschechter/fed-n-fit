import React, { useState } from "react"
import NewMealForm from "./NewMealForm"

const SideBar = ({ submitNewMeal }) => {
  const [showForm, setShowForm] = useState(false)
  const handleClick = () => {
    setShowForm(true)
  }

  return (
    <div className="sidebar">
      <h2>Kyle S.</h2>
      <button onClick={handleClick}>Add Meal +</button>
      {showForm ? <NewMealForm setShowForm={setShowForm} submitNewMeal={submitNewMeal}/> : null}
    </div>
  )
}

export default SideBar