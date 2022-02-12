import React, { useState, useEffect } from "react";
import "./Game.css";
import mergeSort from "../Algos/MergeSort";
import bubbleSort from "../Algos/BubbleSort";
import quickSort from "../Algos/QuickSort"
import ListBlocks from "./Components/ListBlock";
import axios from "axios";

export default function Game({ algorythm, difficulty, size, clicked }) {
    //states
    const [length, setLength] = useState(size);
    const [level, setLevel] = useState(difficulty);
    const [blocks, setBlocks] = useState([]);
    const [algo, setAlgo] = useState(algorythm);
    const [isSorting, setIsSorting] = useState();
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
        handleSort();

       
    }

    // Called every time the start button is clicked 
    useEffect(() => {
        getRandomNumbers();
        // update states
        setLength(size);
        setAlgo(algorythm);
        setLevel(difficulty);

    }, [clicked]);

    // Sorts the array of numbers
    function handleSort() {
        const sortOrder = (order) => {
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
            setIsSorting(true);

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

        } else if (algo == "bubbleS ort") {
            sortOrder(bubbleSort(blocks));
      
        }

        
    }

    // Displays all the blocks in the array
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
