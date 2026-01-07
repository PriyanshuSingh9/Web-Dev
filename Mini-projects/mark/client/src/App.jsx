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
      if (!res.ok) throw new Error("Fetch failed")

      const data = await res.json()

      console.log("Successfully fetched lists:", data)
      setLists(data)
    } catch (error) {
      setErrorPresent(true)
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
    const previousLists = lists

    const tempId = crypto.randomUUID()

    setLists(prevLists => {
      return prevLists.map(list =>
        list._id !== listId ? list
          : {
            ...list, list_tasks: ([...list.list_tasks, { _id: tempId, title: title, completed: false }])
          }
      )
    })

    try {
      await fetch(`http://localhost:5000/lists/${listId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: title })
      })

    } catch (error) {
      setLists(previousLists)
      console.log("Failed to add task:", error)
    }
  }

  async function updateTask(listId, taskId, update) {
    if (update.completed === undefined) {
      try {
        await fetch(`http://localhost:5000/lists/${listId}/tasks/${taskId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
          }
        )
        fetchLists()
      } catch (error) {
        console.log("Failed to update task:", error)
      }
      return
    }

    // optimistic path for completion toggle update
    const previousLists = lists

    setLists(prevLists =>
      prevLists.map(list =>
        list._id !== listId ? list
          : {
            ...list,
            list_tasks: list.list_tasks.map(task =>
              task._id !== taskId ? task
                : {
                  ...task, completed: update.completed
                }
            )
          }
      )
    )

    try {
      await fetch(`http://localhost:5000/lists/${listId}/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ completed: update.completed })
        }
      )
    } catch (error) {
      console.log("Failed to update task:", error)
      setLists(previousLists)
    }
  }


  async function deleteTask(listId, taskId) {
    const previousLists = lists

    setLists(prevLists =>
      prevLists.map(list =>
        list._id !== listId ? list
          : {
            ...list,
            list_tasks: list.list_tasks.filter(task =>
              task._id !== taskId
            )
          }
      )
    )

    try {
      await fetch(`http://localhost:5000/lists/${listId}/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    } catch (error) {
      console.log("Failed to delete task:", error)
      setLists(previousLists)
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
            <div className="loading-container">
              <p className="loading-text">Loading...</p>
            </div>
          ) :
            errorPresent ? (
              <div className="error-container">
                <p>Something went wrong.</p>
                <button className="reload" onClick={() => { fetchLists() }}>
                  Retry
                </button>
              </div>
            )
              : (
                <div className="lists">
                  {lists.length === 0 ? (
                    <div className="no-lists-container">
                      <p>No lists yet. Create one to get started!</p>
                    </div>
                  ) : (
                    lists.map(list => (
                      <ListCard
                        key={list._id}
                        list={list}
                        onTaskAdd={addTask}
                        onTaskUpdate={updateTask}
                        onTaskDelete={deleteTask}
                        onListDelete={deleteList}
                      />
                    ))
                  )}
                </div>
              )
          }
        </div>
      </div >
    </>
  )
}

export default App
