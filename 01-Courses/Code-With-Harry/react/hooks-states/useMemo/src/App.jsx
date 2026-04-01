import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// creates a new array of length 3million length 0-29,999,999 with each value=0
// .map has two args first is value second is index
// is magical will be true for the number 29,000,000
const nums = new Array(30_000_000).fill(0).map((_, i) => {
  return {
    index: i,
    isMagical: i === 29_000_000
  }
})
// the underscore format is only for readability

function App() {
  const [count, setCount] = useState(0)
  // any use state hook on change re renders our entire app component
  const [numbers, setNumbers] = useState(nums)

  // this is very computationally expensive
  // const magical = numbers.find(item => item.isMagical === true)

  // now the computations are not calculated for each re render thus the page becomes smoother and responsive
  // It "memoizes" a value, which is a fancy way of saying it caches or saves the result of a calculation.
  const magical = useMemo(() => numbers.find(item => item.isMagical === true), [numbers])
  // It takes two arguments:
  // 1. A function that performs the expensive calculation(in this case, finding the "magical" number in a huge array).
  // 2. A "dependency array"[].

  return (
    <>
      <div>
        <span>Magical number is {magical.index}</span>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => {
          setCount(() => count + 1)
          if (count == 10) {
            setNumbers(new Array(10_000_000).fill(0).map((_, i) => {
              return {
                index: i,
                isMagical: i === 9_000_000
              }
            }))
          }
        }}>
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
