import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div id='title'> Algorithms Game</div>
        <button id='startBtn' class = 'btn'> Start </button> 
        <button id='statsBtn' class = 'btn'> Statistics </button> 
        <button id='quitBtn' class = 'btn'> Quit </button> 
        
      </header>
    </div>
  );
}

export default App;
