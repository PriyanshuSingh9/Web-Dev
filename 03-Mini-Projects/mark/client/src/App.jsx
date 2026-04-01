import { useState, useEffect } from 'react'

import Navbar from "./components/Navbar/Navbar"
import Sidebar from './components/Sidebar/Sidebar'
import ListCard from "./components/ListCard/ListCard"
import './App.css'


function App() {
  const [lists, setLists] = useState([])

  // for loading screens and error screens
  const [isLoading, setIsLoading] = useState(true)
  const [errorPresent, setErrorPresent] = useState(false)

  // fetching lists with our router 
  async function fetchLists(silent) {
    try {
      // for silent = true no loading screen appears
      // for silent = false loading screen appears
      if (!silent) {
        setIsLoading(true)
      }
      setErrorPresent(false)

      // fetch request
      const res = await fetch("http://localhost:5000/lists")
      if (!res.ok) throw new Error("Fetch failed")

      const data = await res.json()

      console.log("Successfully fetched lists:", data)
      setLists(data)
    } catch (error) {
      setErrorPresent(true)
      console.log("Failed to fetch lists:", error)
    } finally {
      if (!silent) {
        setIsLoading(false)
      }
    }
  }

  // creating lists 
  async function createList(listName, listDesc) {
    // setting up a snapshot for reload after request fails
    const previousLists = lists
    // temporary uid for list before fethcing lists for optimistic updates
    const tempId = crypto.randomUUID()

    // optimistic update of lists
    setLists(prevLists =>
      // spread operator is used to so as to bring all lists previously stored
      // and after comma we add a list manually for the new list
      // lists are put in a [] bracket as well
      [...prevLists, { _id: tempId, list_name: listName, list_desc: listDesc, list_tasks: [] }])
    try {
      await fetch("http://localhost:5000/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ list_name: listName, list_desc: listDesc })
      })

      // fetchlists used only to have the correct uid for the ui as well
      // could be improved
      await fetchLists(true)
    } catch (error) {
      // rerender if db does not get updated
      setLists(previousLists)
      console.log("Failed to create lists:", error)

    }
  }

  // deleting lists
  async function deleteList(listId) {
    const previousLists = lists

    setLists(prevLists =>
      prevLists.filter((list) =>
        list._id !== listId
      )
    )
    try {
      await fetch(`http://localhost:5000/lists/${listId}`,
        {
          method: "DELETE",
        }
      )
    } catch (error) {
      setLists(previousLists)
      console.log("Failed to delete lists:", error)
    }
  }

  // Adding tasks
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

      await fetchLists(true)
    } catch (error) {
      setLists(previousLists)
      console.log("Failed to add task:", error)
    }
  }

  // Updating tasks
  async function updateTask(listId, taskId, update) {
    // optimistic path for completion toggle update
    const previousLists = lists

    // flags for checking updates assume to be true and update accordingly
    let titleUpdate = true
    let completionUpdate = true

    if (update.title == undefined) { titleUpdate = false }
    if (update.completed == undefined) { completionUpdate = false }

    setLists(prevLists =>
      prevLists.map(list =>
        // if list id = the id of list where the function call came from update the task accordingly
        list._id !== listId ? list
          : {
            ...list,
            list_tasks: list.list_tasks.map(task =>
              task._id !== taskId ? task
                : {
                  ...task,
                  title: titleUpdate ? update.title : task.title,
                  completed: completionUpdate ? update.completed : task.completed
                }
            )
          }
      )
    )

    // send the request to the db
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
    } catch (error) {
      // rollback to previous state if updates in db are not made due to any error
      console.log("Failed to update task:", error)
      setLists(previousLists)
    }
  }

  // Deleting task
  async function deleteTask(listId, taskId) {
    const previousLists = lists

    setLists(prevLists =>
      prevLists.map(list =>
        list._id !== listId ? list
          : {
            ...list,
            // in delete operations for optimistic updates we use filter instead of map
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
        }
      )
    } catch (error) {
      console.log("Failed to delete task:", error)
      setLists(previousLists)
    }
  }


  // fetching the lists on the first reload
  useEffect(() => {
    fetchLists(false)
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
                <button className="reload" onClick={() => { fetchLists(false) }}>
                  Retry
                </button>
              </div>
            )
              : (
                <div className="lists">
                  {/* if there are no lists in db displat "no lists yet" */}
                  {lists.length === 0 ? (
                    <div className="no-lists-container">
                      <p>No lists yet. Create one to get started!</p>
                    </div>
                  ) : (
                    // passing all the functions to the list card
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
