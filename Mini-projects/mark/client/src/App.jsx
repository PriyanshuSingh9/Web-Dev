import { useState, useEffect } from 'react'

import Navbar from "./components/Navbar/Navbar"
import Sidebar from './components/Sidebar/Sidebar'
import './App.css'

function App() {
  const [lists, setLists] = useState([])

  async function fetchLists() {
    try {
      const res = await fetch("http://localhost:5000/lists")
      const data = await res.json()
      console.log("Successfully fetched lists:", data)
      setLists(data)
    } catch (error) {
      console.log("Failed to fetch lists:", error)
    }
  }

  // fetching the lists on the first reload
  useEffect(() => {
    fetchLists()
  }, [])

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
