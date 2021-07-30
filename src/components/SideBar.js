import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import NewMealForm from "./NewMealForm"
import NewActivityForm from "./NewActivityForm"

const SideBar = ({ toggleSidebar, username, selectedForm, submitNew }) => {
  const history = useHistory()
  const [showForm, setShowForm] = useState(false)
  const handleClick = () => {
    setShowForm(true)
  }

  const displayForm = () => {
    if (selectedForm === "Food") {
      return <NewMealForm setShowForm={setShowForm} submitNew={submitNew}/>
    } else if (selectedForm === "Fit") {
      return <NewActivityForm setShowForm={setShowForm} submitNew={submitNew}/>
    }
  }

  const handleLogIn = () => {
    toggleSidebar(false)
    history.push("/")
  }

  return (
    <div className="sidebar">
      <p><img style={{ height: "35px" }} alt="profile" src='https://image.flaticon.com/icons/png/512/149/149071.png'/> &nbsp; {username}</p>
      <button onClick={handleLogIn} style={{ backgroundColor: "black", color: "white" }}>Log Out</button>
      {selectedForm ? <button onClick={handleClick}>Add {selectedForm} +</button> : null}
      {showForm ? displayForm() : null}
    </div>
  )
}

export default SideBar
