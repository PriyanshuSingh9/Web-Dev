import Navbar from "./components/navbar.jsx"
import Footer from "./components/footer.jsx"
import Card from "./components/Card.jsx"
function App() {
// react is a library not a framework
// next.js is a framework
  return (
    <>
      <Navbar/>
      <Card title="lode ka title" desc="ghode ka description"/>
      <Card title="lode ka title" desc="ghode ka description"/>
      <Card title="lode ka title" desc="ghode ka description"/>
      <Footer/>
    </>
  )
}

export default App
