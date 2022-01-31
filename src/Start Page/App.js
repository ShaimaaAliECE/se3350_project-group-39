import './App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  // Navigation
  const navigate = useNavigate();

  // Function for taking the user to the next page when they click the start button
  const start = async () => {
      navigate('/selectionPage');
  }

  return (
    <div className="App">
      <header className="App-header">
        <div id='title'> Algorithms Game</div>
        <button id='startBtn' class = 'btn' onClick={start}> Start </button> 
        <button id='statsBtn' class = 'btn'> Statistics </button> 
        <button id='quitBtn' class = 'btn'> Quit </button> 
        
      </header>
    </div>
  );
}

export default App;
