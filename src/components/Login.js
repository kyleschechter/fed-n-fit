import React, { useState } from "react"
import { useHistory } from "react-router"

const Login = ({ chooseUser, toggleSidebar, defaultForm }) => {
  const history = useHistory()

  const [formData, setFormData] = useState({
    username: "",
    calories: "",
    minutes: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.username === "" || formData.calories === "" || formData.minutes === "") {
      alert("You're missing some information my friend. Don't leave anything blank or we can't track your progress!")
    } else {
      chooseUser(formData)
      toggleSidebar()
      defaultForm()
      history.push(`/${formData.username}/home`)
    }
  }
  return (
      <div className="login">
        <h1>Welcome to Fed n Fit, add a Nickname and your goals for today, and we will get started!</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Nickname here..." onChange={handleChange}/>
          <input type="number" name="calories" step="1" placeholder="Calorie Goal..." onChange={handleChange}/>
          <input type="number" name="minutes" step="1" placeholder="Active Minutes Goal..." onChange={handleChange}/>
          <input type="submit" value="Lets Go!"/>
        </form>
      </div>
  )
}

export default Login
