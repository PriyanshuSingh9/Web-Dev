import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, multiply } from './redux/counter/counterSlice'

function App() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <>
      <Navbar />
      <div>
        <button onClick={() => { dispatch(decrement()) }}>-</button>
        Count is currently {count}
        <button onClick={() => { dispatch(increment()) }}>+</button>
      </div>
      <div>
        <button onClick={() => { dispatch(multiply()) }}>*</button>
      </div>
    </>
  )
}


export default App