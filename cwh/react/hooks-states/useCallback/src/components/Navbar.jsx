import React, { memo } from 'react'

const Navbar = ({ adjective, changeAdjective }) => {
    console.log("i am navbar")
    return (
        <div>
            I am a {adjective} navbar
            <button onClick={() => changeAdjective()}>Change adjective</button>
        </div>
    )
}

export default memo(Navbar)
