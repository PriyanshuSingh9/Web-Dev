import { useState, useEffect } from 'react'

import Navbar from "./components/Navbar/Navbar"
import Sidebar from './components/Sidebar/Sidebar'
import ListCard from "./components/ListCard/ListCard"
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

  async function addTask(listId, title) {
    try {
      await fetch(`http://localhost:5000/lists/${listId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title })
      })

      fetchLists()
    } catch (error) {
      console.log("Failed to add task:", error)
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
          <div className="lists">
            {lists.map(list => (
              <ListCard
                key={list._id}
                list={list}
                onTaskAdded={addTask}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
