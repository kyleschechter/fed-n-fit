import React from "react"
import { useHistory } from "react-router-dom"

const Totals = ({ name, total, goal, aDone, bDone, cDone, hideButton, selectForm }) => {
  const history = useHistory()
  const dailyGoalMet = {
    background: "white",
    color: "green",
    fontWeight: "bold",
    border: "2px solid green"
  }

  const handleClick = () => {
    history.push(`/${name.toLowerCase()}`)
    selectForm(name)
  }

  const checkList = (name) => {
    if (name === "Food") {
      return (
        <div className="totals">
          <h1 onClick={handleClick}>Total Eats</h1>
          <p style={total >= goal ? dailyGoalMet : { background: "white", color: "red" }}>&nbsp; {total} / {goal} calories &nbsp;</p>
          <p>{aDone ? "Breakfast [✔️]" : "Breakfast [ ]"}</p>
          <p>{bDone ? "Lunch [✔️]" : "Lunch [ ]"}</p>
          <p>{cDone ? "Dinner [✔️]" : "Dinner [ ]"}</p>
          {hideButton ? hideButton(name) : <p style={{ fontSize: "10px" }}>*Click the title to view full log*</p>}
        </div>
      )
    } else if (name === "Fit") {
      return (
        <div className="totals">
          <h1 onClick={handleClick}>Total Exercise</h1>
          <p style={total >= goal ? dailyGoalMet : { background: "white", color: "red" }}>&nbsp; {total} / {goal} minutes &nbsp;</p>
          <p>{aDone ? "Cardio [✔️]" : "Cardio [ ]"}</p>
          <p>{bDone ? "Weight Training [✔️]" : "Weight Training [ ]"}</p>
          {hideButton ? hideButton(name) : <p style={{ fontSize: "10px" }}>*Click the title to view full log*</p>}
        </div>
      )
    }
  }
  return (
    <div>
      {checkList(name)}
    </div>
  )
}

export default Totals
