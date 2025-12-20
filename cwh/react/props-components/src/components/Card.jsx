import React, { useState } from 'react'
import  "./Card.css"

const Card = (props) => {
  return (
    <div className='card'>
      <h2>{props.title}</h2>
      <p>{props.desc}</p>
    </div>
  )
}

export default Card
