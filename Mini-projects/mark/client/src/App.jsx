import { useState } from 'react'

import Navbar from "./components/Navbar/Navbar"
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'

function App() {

  return (
    <>
      <div className="app">
        <Navbar />
        <div className="container">
          <Sidebar />
          <div className="lists"></div>
        </div>
      </div>
    </>
  )
}

export default App
