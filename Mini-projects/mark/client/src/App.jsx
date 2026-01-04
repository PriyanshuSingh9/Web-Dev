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
          <div className="lists">
            {lists.length === 0 ? <p>Loading...</p> :
              lists.map(list => {
                return (
                  <div key={list._id} className="list">
                    <h3 className="title">{list.list_name}</h3>
                    {list.list_desc && <p>{list.list_desc}</p>}
                    {list.list_tasks.map((task) => {
                      return (
                        <div className="task">{task.title}</div>
                      )
                    })}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
