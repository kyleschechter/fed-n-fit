import React, { useState } from "react"

const NewActivityForm = ({ setShowForm, submitNew }) => {
  const [formData, setFormData] = useState({
    type: "Cardio",
    activity: "",
    duration: ""
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
        <label>Which Activity?</label> &nbsp;
        <select onChange={handleChange} name="type">
          <option value="Cardio">Cardio</option>
          <option value="Weight Training">Weight Training</option>
        </select>
        <input onChange={handleChange} type="text" name="activity" placeholder="What did you do?"/>
        <input onChange={handleChange} type="number" step="1" name="duration" placeholder="For how long?"/>
        <input type="submit" value="Submit Activity"/>
        <button onClick={() => setShowForm(false)}>❌</button>
      </form>
  )
}

export default NewActivityForm
