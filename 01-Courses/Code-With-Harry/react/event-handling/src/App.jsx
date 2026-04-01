import { useState } from 'react'
import './App.css'

function App() {
  const [color, setColor] = useState("blue")
  const [hoverColor, setHoverColor] = useState("blue")
  const [name, setName] = useState("Harry")
  const [form, setForm] = useState({ phone: "", email: "" })

  function changeColor() {
    console.log(color)
    setColor((prev) => (
      prev === "blue" ? "red" : "blue"
    ))
  }
  function changeColorOnHover() {
    console.log(hoverColor)
    setHoverColor((prev) => (
      prev === "blue" ? "red" : "blue"
    ))
  }

  function handleInput(e) {
    setName(e.target.value)
  }

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    // as seform is asynchronous in nature the log shows one character behinf as it takes some time to
    // render in.
    // setState is not asynchronous — it is scheduled and batched.
  }


  return (
    <>
      <div className="click">
        <button onClick={changeColor} style={{ backgroundColor: color }}>Click me</button>
      </div >
      <div className="hover">
        <button onMouseOver={changeColorOnHover} style={{ backgroundColor: hoverColor }}>
          Hover Over Me
        </button>
      </div>
      <div className="name">
        <input type="text" value={name} onChange={handleInput} />
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleForm}
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleForm}
        />

      </div>
    </>
  )
}

export default App
