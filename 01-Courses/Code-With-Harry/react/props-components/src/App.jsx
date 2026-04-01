import Navbar from "./components/navbar.jsx"
import Footer from "./components/footer.jsx"
import Card from "./components/Card.jsx"
function App() {
// react is a library not a framework
// next.js is a framework
  return (
    <>
      <Navbar/>
      <Card title="box 1 ka title" desc="box 1 ka description"/>
      <Card title="box 2 ka title" desc="box 2 ka description"/>
      <Card title="box 3 ka title" desc="box 3 ka description"/>
      <Footer/>
    </>
  )
}

export default App
