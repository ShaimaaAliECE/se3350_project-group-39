import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import useToken from './useToken';
import Login from './login/Login';

function App() {
  
  const { setToken, removeToken } = useToken();

  return(
      <div className="App">
          <Login setToken={setToken}/>
      </div>
  );

}

export default App;


 