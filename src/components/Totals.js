import React from "react"

const Totals = ({ name, total, goal, aDone, bDone, cDone, hideButton, handleNavClick }) => {
  const dailyGoalMet = {
    background: "white",
    color: "green",
    fontWeight: "bold",
    border: "2px solid green"
  }

  const handleClick = () => {
    handleNavClick(name)
  }

  const checkList = (name) => {
    if (name === "Food") {
      return (
        <div className={hideButton ? "totals" : "totals-not-selected"}>
          <h1 onClick={handleClick}>Total Eats</h1>
          <p style={total >= goal ? dailyGoalMet : { background: "white", color: "red" }}>&nbsp; {total} / {goal} calories &nbsp;</p>
          {/* <p>{aDone ? "Breakfast [✔️]" : "Breakfast [ ]"}</p> */}
          <p>{`Breakfast [${aDone ? "✔️" : "" }]`}</p>
          <p>{bDone ? "Lunch [✔️]" : "Lunch [ ]"}</p>
          <p>{cDone ? "Dinner [✔️]" : "Dinner [ ]"}</p>
          {hideButton ? hideButton(name) : <p style={{ fontSize: "10px" }}>*Click the title to view full log*</p>}
        </div>
      )
    } else if (name === "Fit") {
      return (
        <div className={hideButton ? "totals" : "totals-not-selected"}>
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
