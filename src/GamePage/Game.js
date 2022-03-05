import React, { useState, useEffect } from "react";
import "./Game.css";
import mergeSort from "../Algos/MergeSort";
import bubbleSort from "../Algos/BubbleSort";
import quickSort from "../Algos/QuickSort"
import ListBlocks from "./Components/ListBlock";
import Level2 from './Components/Level2';
import axios from "axios";
import { resetServerContext } from "react-beautiful-dnd";

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
    const [current, setCurrent] = useState([0,1,2]);
    const [steps, setSteps] = useState(0);

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
        if(clicked && difficulty == 1){
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

    function counter(){
        if(steps == 8)
            setSteps(0);
        else
            setSteps(steps++);
    }


    // Sorts the array of numbers
    function handleSort() {
        const sortOrder = (order) => {

            setIsSorting(true);

            (function loop(i) { 
                setTimeout(function () {

                    //Timer, each step over time exectued 
                    console.log(order[i])

                    //
                    const [j, k, arr, index] = order[i];

                    //cOMPARE of two values to  j and lk
                    setCompare([j, k]);

                    //Empty swap
                    setSwap([]);

                    //
                    if (index !== null) {
                        setSortedIndex((prevState) => [...prevState, index]);
          
                    }
                    

                    if (j< k) {
                        speed = 10000000;
                        
                       
                        setBlocks(arr);
                    }

                    //If arr has array 
                    if (arr) {
                        //Set blocks to arr to update
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
    if(difficulty == 1)
    {
        return (
            <div id="game-body">
                <ListBlocks
                    length={length}
                    blocks={blocks}
                    compare={isSorting && compare}
                    swap={swap}
                    needsSorting={isSorting}
                    sorted={sortedIndex}
                />
            </div>
        );
    }


    if(difficulty == 2)
    {
        return (
            <div id="game-body">
                <Level2
                    blocks={blocks}
                    current={true}
                    swap={swap}
                    needsSorting={isSorting}
                    sorted={sortedIndex}
                    steps={steps}
                />
                <button onClick={counter}> Next </button>
            </div>
        );
    }
}
