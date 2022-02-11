import React, { useState, useEffect } from 'react';
import './Game.css';
import bubbleSort from '../Algos/BubbleSort';
import ListBlocks from './Components/ListBlock';


export default function Game({size, algorythm, difficulty}) {

    //states
    const [ length, setLength ] = useState(size);
    const [ level, setLevel ] = useState(difficulty);
    const [ blocks, setBlocks ] = useState();
    const [ algo, setAlso ] = useState(algorythm);
    const [ isSorting, setIsSorting ] = useState();
    const [ speed, setSpeed ] = useState(200);
    const [ compare, setCompare ] = useState([]);
	const [ completed, setCompleted ] = useState(true);
    const [ sortedIndex, setSortedIndex ] = useState([]);
    const [ swap, setSwap ] = useState([]);
    
    function genRandomNumbers()    {
        setCompleted(false);
        setIsSorting(false);
        setSortedIndex([]);

    
        for (let i = 0; i < length; i++) {
            setBlocks([...blocks], Math.random());
        }

        handleSort();
    }

    useEffect(()=>  {
        genRandomNumbers();
        console.log(blocks);
    })

    function handleSort()  {

        const sortOrder = (order) =>  {
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

        setIsSorting(true);

        algo === 'bubbleSort' ? sortOrder(bubbleSort(blocks)) : (() => {
			setIsSorting(false)
			setCompleted(true)
		})()
    
        }    
    
    }
    
    return (
        <div id="game-body">

            <ListBlocks 
                length={length}
				blocks={blocks} 
				compare={isSorting && compare}
				swap={isSorting && swap}
				sorted={sortedIndex} 
			/>

        </div>
        );

}

