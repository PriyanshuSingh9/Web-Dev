import { useState, useEffect } from 'react'

import Navbar from "./components/Navbar/Navbar"
import Sidebar from './components/Sidebar/Sidebar'
import ListCard from "./components/ListCard/ListCard"
import './App.css'


function App() {
  const [lists, setLists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorPresent, setErrorPresent] = useState(false)

  async function fetchLists() {
    try {
      setIsLoading(true)
      setErrorPresent(false)

      const res = await fetch("http://localhost:5000/lists")
      const data = await res.json()

      console.log("Successfully fetched lists:", data)
      setLists(data)
    } catch (error) {
      setErrorPresent(true)
      isLoading(false)
      console.log("Failed to fetch lists:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function createList(listName, listDesc) {
    try {
      await fetch("http://localhost:5000/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ list_name: listName, list_desc: listDesc })
      })

      fetchLists()
    } catch (error) {
      console.log("Failed to create lists:", error)

    }
  }

  async function deleteList(listId) {
    try {
      await fetch(`http://localhost:5000/lists/${listId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      fetchLists()
    } catch (error) {
      console.log("Failed to delete lists:", error)
    }
  }

  async function addTask(listId, title) {
    try {
      await fetch(`http://localhost:5000/lists/${listId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title })
      })

      fetchLists()
    } catch (error) {
      console.log("Failed to add task:", error)
    }
  }

  async function updateTask(listId, taskId, update) {
    try {
      const payload = {}
      if (update.title !== undefined) {
        payload.title = update.title
      }
      if (update.completed !== undefined) {
        payload.completed = update.completed
      }

      if (Object.keys(payload).length === 0) return;

      await fetch(`http://localhost:5000/lists/${listId}/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }

      )
      fetchLists()
    } catch (error) {
      console.log("Failed to update task:", error)
    }
  }

  async function deleteTask(listId, taskId) {
    try {
      await fetch(`http://localhost:5000/lists/${listId}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      fetchLists()
    } catch (error) {
      console.log("Failed to delete task:", error)

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
          <Sidebar
            onListCreated={createList} />
          {isLoading ? (
            <p>Loading</p>
          ) :
            errorPresent ? (
              <button className="reload" onClick={fetchLists}>
                Retry reload
              </button>
            )
              : (
                < div className="lists">
                  {lists.map(list => (
                    <ListCard
                      key={list._id}
                      list={list}
                      onTaskAdd={addTask}
                      onTaskUpdate={updateTask}
                      onTaskDelete={deleteTask}
                      onListDelete={deleteList}
                    />
                  ))}
                </div>
              )
          }
        </div>
      </div >
    </>
  )
}

export default App
