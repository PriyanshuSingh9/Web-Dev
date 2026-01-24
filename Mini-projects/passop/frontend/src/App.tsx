import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

import type { passwordEntry } from './types'
import { useState, useEffect } from 'react'

import { errorContext, loadContext } from './context/context'


function App() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [passwordEntries, setPasswordEntries] = useState<passwordEntry[]>([])

  async function fetchPasswordEntries(): Promise<void> {
    try {
      setLoading(true)
      const res = await fetch("http://localhost:5000/")
      if (res.ok) {
        const data: passwordEntry[] = await res.json()
        setPasswordEntries(data)
      }
    } catch (error) {
      setError(true)
    }
    finally {
      setLoading(false)
    }
  }

  // loading password entries for the first render
  useEffect(() => {
    fetchPasswordEntries()
  }, [])

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