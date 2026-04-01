import { useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const a=useRef(0)
  // useRef creates an object whose value persists after reloads/re-renders we can access it using a.current
  // else on each re-render the value of a would get initialised to starting value like 0 for let a = 0
  
  const btnRef=useRef()
  // we can use this ref to refer to an object in the dom and then we dont need to access the dom each time we
  // have to make changes

  // changing value of a ref dows not trigger an useEffect
  useEffect(()=>{
    a.current+=1
    console.log(`The value of a is ${a.current}`)
  })

  useEffect(()=>{
    btnRef.current.style.backgroundColor="red"
  },[])

  return (
    <>
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
        <button ref={btnRef} onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
