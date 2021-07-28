import React, { useState } from 'react'
import NewMealForm from './NewMealForm'

const SideBar = ({ submitNewMeal }) => {
  const [showForm, setShowForm] = useState(false)
  const handleClick = () => {
    setShowForm(true)
  }

  return (
    <div className="sidebar">
      <p><img style={{ height: '35px' }} alt="profile" src='https://image.flaticon.com/icons/png/512/149/149071.png'/> &nbsp; Kyle S.</p>
      <button onClick={handleClick}>Add Meal +</button>
      {showForm ? <NewMealForm setShowForm={setShowForm} submitNewMeal={submitNewMeal}/> : null}
    </div>
  )
}

export default SideBar
