import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Downloads from "./components/Downloads"
import Blogs from "./components/Blogs"
import User from './components/User'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /></>
    },
    {
      path: "/user/:username",
      element: <><Navbar /><User /></>
    },
    {
      path: "/downloads",
      element: <><Navbar /><Downloads /></>
    },
    {
      path: "/blogs",
      element: <><Navbar /><Blogs /></>
    }
  ])
  return (
    <>

      <RouterProvider router={router} />

    </>
  )
}

export default App
