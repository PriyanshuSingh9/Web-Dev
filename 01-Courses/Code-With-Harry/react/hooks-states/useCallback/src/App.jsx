import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar"

function App() {
  const [count, setCount] = useState(0)
  // on changing count navbar gets re rendered thus to avoid this behaviour we use memo in the navabr component
  // now navbar only get re rendered if any of its props are changed

  const [adjective, setAdjective] = useState("good")

  // but whenver we change count the function change adjective also gets changed i.e. js creates another function
  // by the same name but the functions are not truly the same thus, even on changing count the component navbar is
  // re rendered thus we use useCallback hook here
  const changeAdjective = useCallback(
    () => {
      const adjectives = [
        "happy",
        "bright",
        "curious",
        "elegant",
        "fierce",
        "gentle",
        "lively",
        "mysterious",
        "peaceful",
        "vibrant"
      ]
      const rand = Math.floor(Math.random() * adjectives.length)
      setAdjective(adjectives[rand])
    }
    , [])
  // now on changing count navbar isnt re rerendered as the fucntion changeAdjective is freezed or this copy is 
  // preserved in all re renders of the app file
  // the second param fro useCallback is the same as in useMemo it is the list of states or variables that on change
  // will cause the function to change

  return (
    <>
      <Navbar adjective={adjective} changeAdjective={changeAdjective} />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={
          () => {
            setCount((count) => count + 1)
          }
        }>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div >
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
