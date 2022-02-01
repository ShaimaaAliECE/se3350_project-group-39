import React from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import useToken from '../login/useToken';
import './Game.css';

function Game() {

    const {removeToken} = useToken();
    const navigate = useNavigate();

    return (

        <div id="game-body">

            <Header removeToken={removeToken}/>

            <div id='game'>

                <div id='title'>
                    Algorithms Game</div>
            </div>
            <div class="radial-menu">
                <i class="fas fa-bars"></i>
                <div class="larger-area"></div>
                <div class="menu-item _1">
                    <div>
                        <i class="fab fa-tumblr"></i>
                    </div>
                </div>
                <div class="menu-item _2">
                    <div>
                        <i class="fab fa-twitter"></i>
                    </div>
                </div>
                <div class="menu-item _3">
                    <div>
                        <i class="fab fa-facebook-f"></i>
                    </div>
                </div>

            </div>
        </div>


    );
}

export default Game;
