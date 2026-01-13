import { useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from "./redux/cart/cartSlice"


function App() {
  const cart = useSelector(state => state.cart.value)
  console.log(cart)

  return (
    <>
      <button onClick={() => { useDispatch(addItem) }}>add item</button>
    </>
  )
}

export default App
