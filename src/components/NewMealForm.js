import React, { useState } from 'react'

const NewMealForm = ({ setShowForm, submitNewMeal }) => {
  const [formData, setFormData] = useState({
    type: 'Breakfast',
    meal: '',
    weight: '',
    calories: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitNewMeal(formData)
    setShowForm(false)
  }

  return (
      <form className="new-meal-form" onSubmit={handleSubmit}>
        <label>Which meal?</label>
        <select onChange={handleChange} name="type">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <input onChange={handleChange} type="text" name="meal" placeholder="What did you eat?"/>
        <input onChange={handleChange} type="text" name="weight" placeholder="How much? (In Grams)"/>
        <input onChange={handleChange} type="text" name="calories" placeholder="How many calories?"/>
        <input type="submit" value="Submit Meal"/>
        <button onClick={() => setShowForm(false)}>close</button>
      </form>
  )
}

export default NewMealForm
