import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

import type { passwordEntry } from './types'
import { useState, useEffect } from 'react'
import Table from './components/Table'


function App() {
  const [loading, setLoading] = useState(true)
  const [error, seterror] = useState(false)

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
      seterror(true)
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
      <Navbar />
      <Manager />
      {loading ? <p>loading</p> : <Table passwords={passwordEntries} />}
      <Footer />
    </>
  )
}

export default App