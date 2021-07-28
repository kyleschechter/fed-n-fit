import 'playbook-ui/dist/fonts/fontawesome-min'
import 'playbook-ui/dist/fonts/regular-min'
import 'playbook-ui/dist/playbook.css'

import React from 'react'
import { Title } from 'playbook-ui'
import './App.css'
import MainContent from './components/MainContent'

function App () {
  return (
    <div className="App">
      <header className="App-header">
       <Title text="Fed n' Fit" tag="h3"/>
      </header>
      <MainContent />
    </div>
  )
}

export default App
