import React from 'react'
import { useState, useEffect } from 'react'

const Navbar = ({ color }) => {
    // Case 1: runs on every render
    useEffect(() => {
        alert("Hey I run on every render!!!")
    })

    // Case 2: runs on only first render
    useEffect(() => {
        alert("Hey welcome to my page!!!")

        return()=>{
            alert("Component was unmounted")
        }
    }, [])
    // useEffect takes three params first is the actions that will be performed the second is a return function
    // which runs when a component is unmounted fromm a page using conditional rendering and the third is the 
    // list of which if changed will produce the given effect.

    // Case 3: runs every time color is updated
    useEffect(() => {
        alert("Color was changed")
    }, [color])

    return (
        <div>
            i am navbar of color : {color} hehe ...
        </div>
    )
}

export default Navbar
