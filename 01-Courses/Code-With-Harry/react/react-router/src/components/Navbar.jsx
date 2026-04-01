import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink className={(e) => { return e.isActive ? "red" : "" }} to="/">Home</NavLink></li>
                <li><NavLink className={(e) => { return e.isActive ? "red" : "" }} to="/blogs">Blogs</NavLink></li>
                <li><NavLink className={(e) => { return e.isActive ? "red" : "" }} to="/downloads">Downloads</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar
