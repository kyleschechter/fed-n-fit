import React, { useState } from "react"
import NewMealForm from "./NewMealForm"
import NewActivityForm from "./NewActivityForm"

const SideBar = ({ selectedForm, submitNew }) => {
  const [showForm, setShowForm] = useState(false)
  const handleClick = () => {
    setShowForm(true)
  }

  const displayForm = () => {
    if (selectedForm === "Food") {
      return <NewMealForm setShowForm={setShowForm} submitNew={submitNew}/>
    } else if (selectedForm === "Fit") {
      return <NewActivityForm setShowForm={setShowForm} submitNew={submitNew}/>
    } else {
      alert("Choose a category first!")
    }
  }

  return (
    <div className="sidebar">
      <p><img style={{ height: "35px" }} alt="profile" src='https://image.flaticon.com/icons/png/512/149/149071.png'/> &nbsp; Kyle S.</p>
      {selectedForm ? <button onClick={handleClick}>Add {selectedForm} +</button> : null}
      {showForm ? displayForm() : null}
    </div>
  )
}

export default SideBar
