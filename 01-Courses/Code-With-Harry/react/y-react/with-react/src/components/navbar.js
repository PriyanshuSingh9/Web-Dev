import React from 'react'

const navbar = (props) => {
    return (
        <div>
            <ul className="navbar">
                <li className="nav-item">Home</li>
                <li className="nav-item">Blog</li>
                <li className="nav-item">About {props.creator}</li>
                <li className="nav-item">Contact us</li>
            </ul>
        </div>
    )
}

export default navbar
