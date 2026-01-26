import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

import { useState } from 'react'

import { errorContext, loadContext } from './context/context'



function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <>
      <errorContext.Provider value={{ error, setError }}>
        <loadContext.Provider value={{ loading, setLoading }}>
          <Navbar />
          <Manager />
          <Footer />
        </loadContext.Provider>
      </errorContext.Provider>
    </>
  )
}

export default App