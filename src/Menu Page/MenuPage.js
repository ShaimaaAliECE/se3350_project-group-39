import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import useToken from '../login/useToken';
import './MenuPage.css';

function MenuPage() {

    const { removeToken } = useToken();

  // Navigation
  const navigate = useNavigate();

  // Function for taking the user to the next page when they click the start button
  const start = async () => {
      navigate('/SelectionPage');
  }

  return (
    <div className="menu-body">
        <Header removeToken={removeToken}/>
        <div className="menu">
            <div id='title'> Algorithms Game</div>
            <button id='startBtn' class = 'btn' onClick={start}> Start </button> 
            <button id='statsBtn' class = 'btn'> Statistics </button> 
            <button id='quitBtn' class = 'btn'> Quit </button> 
            
        </div>
    </div>
  );

}

export default MenuPage;
