import React, { useContext } from 'react'
import Span from './Span'
import { counterContext } from '../context/context'


const Button = () => {
  const value = useContext(counterContext);

  return (
    <div>
      <button onClick={() => value.setCount(value.count + 1)}><Span />Button</button>
    </div>
  )
}

export default Button
