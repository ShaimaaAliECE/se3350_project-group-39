import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import useToken from './useToken';
import Game from './GamePage/Game'
function App() {
  
  const { setToken, removeToken } = useToken();

  return(
      <div className="App">
          <Game algorythm="mergeSort" difficulty={1} size={10} />
      </div>
  );

}

export default App;


 