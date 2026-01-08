import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Home from "./components/Home.jsx"
import Blogs from "./components/Blogs.jsx"
import Contact from "./components/Contact.jsx"
import Downloads from "./components/Downloads.jsx"
import User from "./components/User.jsx"
import Layout from './components/Layout.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/blogs",
          element: <Blogs />
        },
        {
          path: "/downloads",
          element: <Downloads />
        },
        {
          path: "/user/:username",
          element: <User />
        },
        {
          path: "/contact",
          element: <Contact />
        }
      ]
    }
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
