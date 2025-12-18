import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar.js';

function App() {
  const [value, setValue] = useState(0)

  return (
    <div className="App">
      <Navbar creator="CodewithHarry" />
      <div className="value">{value}</div>
      <button onClick={() => {
        setValue(value + 1)
      }}>click me</button>
    </div>
  );
}

export default App;
