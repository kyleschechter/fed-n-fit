import React from "react"
import { Title } from 'playbook-ui'

const Totals = ({ total }) => {


  return (
    <div className="totals">
      <Title text="Daily Total" tag="h4"/>
      <p style={{ background: "white" }}>{total} / 2000 calories</p>
        <p>Breakfast [ ]</p>
        <p>Lunch [ ]</p>
        <p>Dinner [ ]</p>
    </div>
  )
}

export default Totals