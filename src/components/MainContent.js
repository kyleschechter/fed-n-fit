import React, { useState, useEffect } from "react"
// import { Avatar, Button } from 'playbook-ui'
import { Route, Switch, useHistory } from "react-router-dom"
import SideBar from "./SideBar"
import FoodContainer from "./FoodContainer"
import FitContainer from "./FitContainer"
import Totals from "./Totals"

/*
Goals for tomorrow:

   */

const MainContent = () => {
  const foodUrl = "http://localhost:4000/foods"
  const fitUrl = "http://localhost:4000/fitness"
  const [foods, setFoods] = useState([])
  const [fits, setFits] = useState([])
  const [brDone, setBrDone] = useState(false)
  const [luDone, setLuDone] = useState(false)
  const [diDone, setDiDone] = useState(false)
  const [carDone, setCarDone] = useState(false)
  const [wtDone, setWtDone] = useState(false)
  const [selectedForm, setSelectedForm] = useState("")
  const history = useHistory()

  useEffect(() => {
    fetch(foodUrl)
      .then(r => r.json())
      .then(data => setFoods(data))

    fetch(fitUrl)
      .then(r => r.json())
      .then(data => setFits(data))
  }, [])

  // totals
  const totalCalories = foods
    .map(food => food.calories)
    .reduce((acc, curr) => acc + curr, 0)

  const totalMinutes = fits
    .map(fit => fit.duration)
    .reduce((acc, curr) => acc + curr, 0)

  // submit

  const selectThisForm = (name) => {
    setSelectedForm(name)
  }

  const submitNewMeal = (data) => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: data.type,
        meal: data.meal,
        weight: parseInt(data.weight),
        calories: parseInt(data.calories)
      })
    }
    fetch(foodUrl, configObj)
      .then(r => r.json())
      .then(data => setFoods([...foods, data]))
  }

  const submitNewActivity = (data) => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: data.type,
        activity: data.activity,
        duration: parseInt(data.duration)
      })
    }
    fetch(fitUrl, configObj)
      .then(r => r.json())
      .then(data => setFits([...fits, data]))
  }

  // delete
  const deleteMeal = (mealID) => {
    fetch(`${foodUrl}/${mealID}`, { method: "DELETE" })
      .then(() => {
        const newListofFoods = foods.filter(food => food.id !== mealID)
        setFoods(newListofFoods)
      })
  }

  const deleteActivity = (actID) => {
    fetch(`${fitUrl}/${actID}`, { method: "DELETE" })
      .then(() => {
        const newListofFits = fits.filter(fit => fit.id !== actID)
        setFits(newListofFits)
      })
  }

  // done with item
  const doneWithMeal = (e) => {
    if (e.target.value === "Breakfast") setBrDone(brDone => !brDone)
    else if (e.target.value === "Lunch") setLuDone(luDone => !luDone)
    else if (e.target.value === "Dinner") setDiDone(diDone => !diDone)
  }

  const doneWithActivity = (e) => {
    if (e.target.value === "Cardio") setCarDone(carDone => !carDone)
    else if (e.target.value === "Weight Training") setWtDone(wtDone => !wtDone)
  }

  // Add hide button that hides logs and sends user back to home page
  const hideButton = (buttonName) => {
    const handleClick = () => {
      history.push("/")
      setSelectedForm("")
    }
    return (
      <button onClick={handleClick}>
        Hide {buttonName} Log
      </button>
    )
  }

  return (
    <div className="main-content">
      <SideBar selectedForm={selectedForm} submitNew={selectedForm === "Food" ? submitNewMeal : submitNewActivity}/>
      <Switch>
        <Route exact path="/food">
          <div className="main-body">
            <div className="totals-div">
              <Totals
              name="Food"
              total={totalCalories}
              goal={2000}
              aDone={brDone}
              bDone={luDone}
              cDone={diDone}
              hideButton={hideButton}
              selectForm={selectThisForm}
              />
              <Totals
              name="Fit"
              total={totalMinutes}
              goal={100}
              aDone={carDone}
              bDone={wtDone}
              selectForm={selectThisForm}
              />
            </div>
            <FoodContainer
            foods={foods}
            deleteMeal={deleteMeal}
            doneWithMeal={doneWithMeal}
            brDone={brDone}
            luDone={luDone}
            diDone={diDone}
            />
          </div>
        </Route>
        <Route exact path="/fit">
          <div className="main-body">
             <div className="totals-div">
                <Totals
                  name="Food"
                  total={totalCalories}
                  goal={2000}
                  aDone={brDone}
                  bDone={luDone}
                  cDone={diDone}
                  selectForm={selectThisForm}
                />
                <Totals
                  name="Fit"
                  total={totalMinutes}
                  goal={100}
                  aDone={carDone}
                  bDone={wtDone}
                  hideButton={hideButton}
                  selectForm={selectThisForm}
                />
              </div>
              <FitContainer
              fits={fits}
              deleteActivity={deleteActivity}
              doneWithActivity={doneWithActivity}
              carDone={carDone}
              wtDone={wtDone}
              />
           </div>
         </Route>
         <Route exact path="/">
           <div className="main-body">
              <div className="totals-div">
                <Totals
                  name="Food"
                  total={totalCalories}
                  goal={2000}
                  aDone={brDone}
                  bDone={luDone}
                  cDone={diDone}
                  selectForm={selectThisForm}
                />
                <Totals
                  name="Fit"
                  total={totalMinutes}
                  goal={100}
                  aDone={carDone}
                  bDone={wtDone}
                  selectForm={selectThisForm}
                />
              </div>
              <div className="activity-container" id="home-text">
                Click &nbsp; <span style={{ color: "red " }}>TOTAL EATS</span> &nbsp; or &nbsp; <span style={{ color: "red " }}>TOTAL EXERCISE</span> &nbsp; to check your progress!
              </div>
           </div>
         </Route>
      </Switch>
    </div>
  )
}

export default MainContent
