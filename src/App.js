import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [Time, setTime] = useState(0);

  useEffect(() => {
    fetch("/time").then(res => res.json()).then(data => {
      setTime(data.time);
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        
        <label>The current time is {Time}.</label>
      </header>
    </div>
  );
}

export default App;
