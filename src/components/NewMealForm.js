import React, { useState } from "react"

const NewMealForm = ({ setShowForm, submitNew }) => {
  const [formData, setFormData] = useState({
    type: "Breakfast",
    meal: "",
    weight: "",
    calories: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitNew(formData)
    setShowForm(false)
  }

  return (
      <form className="new-meal-form" onSubmit={handleSubmit}>
        <label>Which meal?</label> &nbsp;
        <select onChange={handleChange} name="type">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
        <input onChange={handleChange} type="text" name="meal" placeholder="What did you eat?"/>
        <input onChange={handleChange} type="number" step="1" name="weight" placeholder="How much? (In Grams)"/>
        <input onChange={handleChange} type="number" step="1" name="calories" placeholder="How many calories?"/>
        <input type="submit" value="Submit Meal"/>
        <button onClick={() => setShowForm(false)}>❌</button>
      </form>
  )
}

export default NewMealForm
