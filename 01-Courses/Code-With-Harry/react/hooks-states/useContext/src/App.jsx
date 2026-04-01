import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { counterContext } from './context/context'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <counterContext.Provider value={{ count, setCount }}>
        <Navbar />
        <div className="counter">
          The current count is {count}
        </div>
        <button className="increase" onClick={() => {
          setCount(count + 1)
        }}>
          Click me
        </button>
      </counterContext.Provider>

    </>
  )
}

export default App
