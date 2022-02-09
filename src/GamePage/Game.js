import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import useToken from '../useToken';
import './Game.css';
import mergeSort from '../Algos/MergeSort';
import bubbleSort from '../Algos/BubbleSort';
import quickSort from '../Algos/QuickSort';
import axios from 'axios';
import ListBlocks from './Components/ListBlock';


function Game(props) {

    //states
    const [ length, setLength ] = useState(props.length);
    const [ blocks, setBlocks ] = useState();
    const [ algo, setAlso ] = useState(props.algo);
    const [ isSorting, setIsSorting ] = useState();
    const [ speed, setSpeed ] = useState(200);
    const [ compare, setCompare ] = useState([]);
	const [ completed, setCompleted ] = useState(true);
    const [ sortedIndex, setSortedIndex ] = useState([]);
    const [ swap, setSwap ] = useState([]);
    const [ removeToken ] = useToken();


    //core logic
    const genRandomNumbers = () =>    {
        setCompleted(false);
        setIsSorting(false);
        setSortedIndex([]);

        const randomArray = Array.from(Array(length+1).keys()).slice(1);

        for (let i = randomArray.length - 1; i > 0; i--)    {
            const randomindex = Math.floor(Math.random() * (i - 1));
            const temp = randomArray[i];

            randomArray[i] = randomArray[randomindex];
            randomArray[randomindex] = temp;
        }

        setBlocks(randomArray);
    }


    useEffect(()=>  {
        genRandomNumbers();
    }, [length, algo])

    const handleSort = () =>    {
        const sortOrder = (order) =>    {
            (function loop(i) {
                setTimeout(function ()  {
                    const [j, k, arr, index] = order[i]
                    setCompare([j,k])
                    setSwap([])

                    if (index !== null) {
                        setSortedIndex((prevState) =>   (
                            [...prevState, index]
                        ))
                    }

                    if (arr)    {
                        setBlocks(arr)
                        if (j !== null || k != null)
                            setSwap([j,k])
                    }

                    if (++i < order.length) {
                        loop(i)
                    } else {
                        setIsSorting(false);
                        setCompleted(true);
                    }
                }, speed)
            })(0)
        }



        setIsSorting(true);

        algo === 'bubbleSort' ? sortOrder(bubbleSort(blocks)) : (() => {
			setIsSorting(false)
			setCompleted(true)
		})()

    }

    return (

        <div id="game-body">
            <Header removeToken={removeToken}/>

            <ListBlocks 
				blocks={blocks} 
				compare={isSorting && compare}
				swap={isSorting && swap}
				sorted={sortedIndex} 
			/>

            
        </div>


    );
}

export default Game;
