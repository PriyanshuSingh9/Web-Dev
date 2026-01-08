import React from 'react'
import "./Navbar.css"

// Navbar component
const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                {/* Logo for the website */}
                <img src="/client/src/assets/text.svg" alt="logo" className="logo" />
                {/* Tagline */}
                <div className="opener">Work is Where You Are</div>
                {/* Loader(not functional) */}
                <div className="load">
                    [██████░░░░] 60%
                </div>
            </div>
        </nav>
    )
}

export default Navbar
