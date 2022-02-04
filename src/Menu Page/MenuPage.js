import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import useToken from '../useToken';
import './MenuPage.css';

function MenuPage() {

    const { removeToken } = useToken();

  // Navigation
  const navigate = useNavigate();

  return (
    <div id="menu-body">
        <div id="menu">
            <div id='title'> Algorithms Game</div>
            <button id='startBtn' className='btn' onClick={() => {navigate('/SelectionPage')}}> Selection </button>
            <button id='statsBtn' className='btn' onClick={() => { navigate('/Profile') }}> Statistics </button>
<<<<<<< HEAD
            <Header removeToken={removeToken}/>
=======
>>>>>>> d7b5daa107ceef5d2dc153f7fa347f9f13cafba7

        </div>
    </div>
  );

}

export default MenuPage;
