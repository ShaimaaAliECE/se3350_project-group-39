import React, { useState, useEffect } from "react";
import "./Game.css";
import mergeSort from "../Algos/MergeSort";
import ListBlocks from "./Components/ListBlock";
import axios from "axios";

export default function Game({ algorythm, difficulty, size }) {
    //states
    const [length, setLength] = useState(size);
    const [level, setLevel] = useState(difficulty);
    const [blocks, setBlocks] = useState([3, 2, 1]);
    const [algo, setAlgo] = useState(algorythm);
    const [isSorting, setIsSorting] = useState();
    const [speed, setSpeed] = useState(200);
    const [compare, setCompare] = useState([]);
    const [completed, setCompleted] = useState(true);
    const [sortedIndex, setSortedIndex] = useState([]);
    const [swap, setSwap] = useState([]);

    function getRandomNumbers() {
        axios({
            method: "GET",
            url: "/random",
            data: {
                size: length,
            },
        }).then(({ data }) => {
            setBlocks(data);
        });

        handleSort();
    }

    useEffect(() => {
        getRandomNumbers();
    }, [length]);

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

            setIsSorting(true);

            algo === "mergeSort"
                ? sortOrder(mergeSort(blocks))
                : (() => {
                      setIsSorting(false);
                      setCompleted(true);
                  })();
        };
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
