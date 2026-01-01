import { useState } from 'react'

import Navbar from "./components/Navbar"
import Sidebar from './components/Sidebar'
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Sidebar />
      </div>
    </>
  )
}

export default App
