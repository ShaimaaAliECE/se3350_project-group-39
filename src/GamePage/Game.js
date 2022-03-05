import React, { useState, useEffect } from "react";
import "./Game.css";
import mergeSort from "../Algos/MergeSort";
import bubbleSort from "../Algos/BubbleSort";
import quickSort from "../Algos/QuickSort"
import ListBlocks from "./Components/ListBlock";
import axios from "axios";
import { resetServerContext } from "react-beautiful-dnd";
import Level1 from "./Levels/Level1";

export default function Game({ algorythm, difficulty, size, clicked }) {
    //states
    const [length, setLength] = useState(size);
    const [level, setLevel] = useState(difficulty);
    const [blocks, setBlocks] = useState([]);
    const [algo, setAlgo] = useState(algorythm);
    const [isSorting, setIsSorting] = useState(true);
    const [speed, setSpeed] = useState(200);
    const [compare, setCompare] = useState([]);
    const [completed, setCompleted] = useState(true);
    const [sortedIndex, setSortedIndex] = useState([]);
    const [swap, setSwap] = useState([]);

    // Gets random numbers from the back end and fills the blocks array with them
    function getRandomNumbers() {
        axios({
            method: "GET",
            url: "/random",
            params: {
                size: size,
                min: 1
            },
            
        }).then(({ data }) => {
            setBlocks(data);
            
        });
        if(clicked){
            setIsSorting(true);
            handleSort();
        }
        if(isSorting === false){
            setIsSorting(true);
            setSortedIndex(() => []); //resets the sorting array
        }
        console.log("isSorting = " + isSorting); 
    }

    // Called every time the start button is clicked and when the sliders are moved
    useEffect(() => {
        getRandomNumbers();
        // update states
        setLength(size);
        
    }, [clicked, size]);



    // Sorts the array of numbers
    function handleSort() {
        const sortOrder = (order) => {

            setIsSorting(true);

            (function loop(i) { 
                setTimeout(function () {
                    const [j, k, arr, index] = order[i];
                    setCompare([j, k]);
                    setSwap([]);

                    if (index !== null) {
                        setSortedIndex((prevState) => [...prevState, index]);
                    }

                    if (arr) {
                        setBlocks(arr);
                        if (j !== null || k != null) setSwap([j, k]);
                    }

                    if (++i < order.length) {
                        loop(i);
                    } else {
                        setIsSorting(false);
                        setCompleted(true);
                    }
                }, speed);
            })(0);

            // Changes the colours when the array is being sorted

            // algo === "mergeSort"
            //     ? sortOrder(mergeSort(blocks))
            //     : (() => {
            //           setIsSorting(false);
            //           setCompleted(true);
            //       })();


        };
        if (algo == "mergeSort") {
            sortOrder(mergeSort(blocks));

        } else if (algo == "quickSort") {
            sortOrder(quickSort(blocks));

        } else if (algo == "bubbleSort") {
            sortOrder(bubbleSort(blocks));
      
        }

        
    }

    // Displays all the blocks in the array
    return (
        <div id="game-body">
            {
                level === 1 ?
                <Level1
                    length={length}
                    blocks={blocks}
                    swap={swap}
                    compare={isSorting && compare}
                    needsSorting={isSorting}
                    sorted={sortedIndex}
                /> :
                <ListBlocks
                    length={length}
                    blocks={blocks}
                    compare={isSorting && compare}
                    swap={swap}
                    needsSorting={isSorting}
                    sorted={sortedIndex}
                />
            }
        </div>
    );
}
