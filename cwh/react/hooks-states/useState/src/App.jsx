import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // Hooks let you use different React features from your components. 

  const [count, setCount] = useState(0)

  // we cannot use normal js like let count=0 and update it using count+=1 as it gets rendered for the first time but
  // after the updates there is no re-rendering
  // useState uses setCount to update the count and helps in re-rendering every instance of count in the page

  return (
    <>
      <div>The count is {count}</div>
      <button onClick={()=>setCount(count+1)}>Update count</button>
    </>
  )
}

export default App
