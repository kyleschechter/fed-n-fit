import React, { useState, useEffect } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import SideBar from "./SideBar"
import FoodContainer from "./FoodContainer"
import FitContainer from "./FitContainer"
import Totals from "./Totals"
import Login from "./Login"


const MainContent = () => {
  const currentUserUrl = `${process.env.REACT_APP_API_URL}/currentUser`
  const foodUrl = `${process.env.REACT_APP_API_URL}/foods`
  const fitUrl = `${process.env.REACT_APP_API_URL}/fitness`
  const [currentUser, setCurrentUser] = useState([])
  const [foods, setFoods] = useState([])
  const [fits, setFits] = useState([])
  const [showSidebar, setShowSidebar] = useState(true)
  const [brDone, setBrDone] = useState(false) // Breakfast
  const [luDone, setLuDone] = useState(false) // Lunch
  const [diDone, setDiDone] = useState(false) // Dinner
  const [carDone, setCarDone] = useState(false) // Cardio
  const [wtDone, setWtDone] = useState(false) // Weight Training
  const [selectedForm, setSelectedForm] = useState("")
  const history = useHistory()

  useEffect(() => {
    fetch(currentUserUrl)
      .then(r => r.json())
      .then(data => setCurrentUser(data[0]))

    fetch(foodUrl)
      .then(r => r.json())
      .then(data => setFoods(data))

    fetch(fitUrl)
      .then(r => r.json())
      .then(data => setFits(data))
  }, [])

  // Handle new user nickname and goals submission
  const chooseUser = (user) => {
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user.username,
        calories: parseInt(user.calories),
        minutes: parseInt(user.minutes)
      })
    }
    fetch(`${currentUserUrl}/1`, configObj)
      .then(r => r.json())
      .then(data => setCurrentUser(data))
  }

  const handleNavClick = (name) => {
    history.push(`/${currentUser.username}/${name.toLowerCase()}`)
    setSelectedForm(name)
  }

  // totals
  const totalCalories = foods
    .map(food => food.calories)
    .reduce((acc, curr) => acc + curr, 0)

  const totalMinutes = fits
    .map(fit => fit.duration)
    .reduce((acc, curr) => acc + curr, 0)

  // submit
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

  // Done with item
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
      history.push(`/${currentUser.username}/home`)
      setSelectedForm("")
    }
    return (
      <button onClick={handleClick}>
        Hide {buttonName} Log
      </button>
    )
  }

  // Toggle whether the sidebar is shown or not
  const toggleSidebar = (value) => {
    setShowSidebar(value)
  }

  return (
    <div className="main-content">
      {showSidebar ? <SideBar toggleSidebar={toggleSidebar} username={currentUser.username} selectedForm={selectedForm} submitNew={selectedForm === "Food" ? submitNewMeal : submitNewActivity}/> : null}
      <Switch>
        <Route exact path={`/${currentUser.username}/food`}>
          <div className="main-body">
            <div className="totals-div">
              <Totals
              name="Food"
              total={totalCalories}
              goal={currentUser.calories}
              aDone={brDone}
              bDone={luDone}
              cDone={diDone}
              hideButton={hideButton}
              handleNavClick={handleNavClick}
              />
              <Totals
              name="Fit"
              total={totalMinutes}
              goal={currentUser.minutes}
              aDone={carDone}
              bDone={wtDone}
              handleNavClick={handleNavClick}
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
        <Route exact path={`/${currentUser.username}/fit`}>
          <div className="main-body">
             <div className="totals-div">
                <Totals
                  name="Food"
                  total={totalCalories}
                  goal={currentUser.calories}
                  aDone={brDone}
                  bDone={luDone}
                  cDone={diDone}
                  handleNavClick={handleNavClick}
                />
                <Totals
                  name="Fit"
                  total={totalMinutes}
                  goal={currentUser.minutes}
                  aDone={carDone}
                  bDone={wtDone}
                  hideButton={hideButton}
                  handleNavClick={handleNavClick}
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
         <Route exact path={`/${currentUser.username}/home`}>
           <div className="main-body">
              <div className="totals-div">
                <Totals
                  name="Food"
                  total={totalCalories}
                  goal={currentUser.calories}
                  aDone={brDone}
                  bDone={luDone}
                  cDone={diDone}
                  handleNavClick={handleNavClick}
                />
                <Totals
                  name="Fit"
                  total={totalMinutes}
                  goal={currentUser.minutes}
                  aDone={carDone}
                  bDone={wtDone}
                  handleNavClick={handleNavClick}
                />
              </div>
              <div className="activity-container" id="home-text">
                Click &nbsp; <span style={{ color: "red " }}>TOTAL EATS</span> &nbsp; or &nbsp; <span style={{ color: "red " }}>TOTAL EXERCISE</span> &nbsp; to add new items, or update your progress!
              </div>
           </div>
         </Route>
         <Route exact path="/">
           <Login chooseUser={chooseUser} toggleSidebar={toggleSidebar} defaultForm={() => setSelectedForm("")}/>
         </Route>
      </Switch>
    </div>
  )
}

export default MainContent
