import React from 'react'
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                <img src="/client/src/assets/text.svg" alt="logo" className="logo" />
                <div className="opener">Work is Where You Are</div>
                <div className="load">
                    [██████░░░░] 60%
                </div>
            </div>
        </nav>
    )
}

export default Navbar
