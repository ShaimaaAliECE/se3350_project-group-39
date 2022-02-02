import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import useToken from '../useToken';
import './Game.css';
import mergeSort from '../Algos/MergeSort';
import axios from 'axios';


function Game({}) {

    //states
    const { numbers, setNumbers } = useState();
    const { blocks, setBlocks } = useState();
    const { algo, setAlso } = useState();
    const { sorting, isSorting } = useState();
    const { speed, setSpeed } = useState(250);
    const { compare, setCompare } = useState();
 
    const {removeToken} = useToken();

    function getRandomNumbers() {
        axios({
            method: 'GET',
            url: '/random',
        }).then((response)  =>  {
            const res = response.data;
            setNumbers(res);
        })
    }

    useEffect(()=>  {
        getRandomNumbers();
    });

    return (

        <div id="game-body">
            <Header removeToken={removeToken}/>

            <div>

            </div>

            
        </div>


    );
}

export default Game;
