import React, { useState, useEffect } from 'react';
import './Game.css';
import bubbleSort from '../Algos/BubbleSort';
import ListBlocks from './Components/ListBlock';
import { render } from '@testing-library/react';


<<<<<<< HEAD
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


    useEffect(()=>  {
        genRandomNumbers();
        console.log(blocks);
    })
=======
function Game({ min, max, count, algorithm }) {

    //states
    const [ numbers, setNumbers ] = useState([]);
    const [ blocks, setBlocks ] = useState();
    const [ algo, setAlso ] = useState('');
    const [ sorting, isSorting ] = useState(false);
    const [ speed, setSpeed ] = useState(250);
    const [ compare, setCompare ] = useState();

    const {removeToken} = useToken();

    function getRandomNumbers() {
        axios({
            method: 'GET',
            url: '/random',
        }).then((response)  =>  {
            const res = response.data;
            setNumbers([...res]);
        })
    }

    useEffect(()=>  {
        getRandomNumbers();
    }, []);
>>>>>>> dbf1e6909c73986fc7902bf1ceaa5965642ee772

    //core logic
    function handleSort()  {

        sortOrder()

<<<<<<< HEAD
        setIsSorting(true);

        algo === 'bubbleSort' ? sortOrder(bubbleSort(blocks)) : (() => {
			setIsSorting(false)
			setCompleted(true)
		})()

    }


    const sortOrder = () =>  {
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

    function genRandomNumbers()    {
        setCompleted(false);
        setIsSorting(false);
        setSortedIndex([]);

    
        for (let i = 0; i < length; i++) {
            setBlocks([...blocks], Math.random());
        }

        handleSort();
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

=======
            <div>
                { numbers }
            </div>


        </div>
    );
>>>>>>> dbf1e6909c73986fc7902bf1ceaa5965642ee772
}

