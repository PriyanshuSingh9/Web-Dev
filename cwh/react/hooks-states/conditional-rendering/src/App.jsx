import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [showBtn, setShowBtn] = useState(false)
  const [todos, setTodos] = useState([
    {
      title: "Grocery",
      desc: "Grocery list for the mall",
      id: 0
    },
    {
      title: "Clothes",
      desc: "Cloth list for the mall",
      id: 1
    },
    {
      title: "Cutlery",
      desc: "Cutlery list for the mall",
      id: 2
    },
  ])

  // using todo as a component

  // const Todo = ({ todo }) => {
  //   return (
  //     <>
  //       <div className="m-4 border border-cyan-400 w-fit-content p-4">
  //         <div className="todo">{todo.title}</div>
  //         <div className="desc">{todo.desc}</div>
  //       </div>
  //     </>
  //   )
  // }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

    {/* todo as inline react component */}
      {todos.map(todo => {
        // return <Todo key={todo.id} todo={todo} />
        return (
          <div key={todo.id} className="m-4 border border-cyan-400 w-fit-content p-4">
            <div className="todo">{todo.title}</div>
            <div className="desc">{todo.desc}</div>
          </div>
        )
      })}

      {/* {showBtn ? <button>Appears only when another button is clicked</button> : "thenga"} */}
      {/* pre-defined beahviour for false condition */}
      
      {showBtn && <button>Appears only when another button is clicked</button>}
      {/* only display button if showBtn is true no behaviour for state where showBtn is false */}
      <div className="card">
        <button onClick={() => setShowBtn(!showBtn)}>
          Click me!!!
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
