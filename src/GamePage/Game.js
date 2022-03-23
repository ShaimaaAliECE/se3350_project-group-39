import React, { useState, useEffect } from "react";
import "./Game.css";
import axios from "axios";
import Level1 from "./Levels/Level1"
import Level2 from "./Components/Level2";
import Level3 from "./Components/Level3";
import Level4 from "./Components/Level4";
import Timer from "../GenPage/Timer";
import Level5 from "./Components/Level5";
import CustomLevel from "./Components/CustomLevel";

export default function Game({ algorithm, difficulty, size, clicked, refreshLevel }) {
    // states
    const [blocks, setBlocks] = useState([]);
    const [steps, setSteps] = useState(0);

    // Gets random numbers from the back end and fills the blocks array with them
    function getRandomNumbers() {
        let max = 0;

        // Determines what the max is depedning on the level
        if(difficulty <=3)
            max = 20;
        else if(difficulty === 4)
            max = 50;
        else
            max = 99;
            
        axios({
            method: "GET",
            url: "/random",
            params: {
                size: size,
                min: 1,
                max: max
            },

        }).then(({ data }) => {
            setBlocks(data);
        });
    }


    // reset steps when the level changes
    useEffect(() => {
        setSteps(0);
    }, [difficulty, refreshLevel])

    // Called every time the start button is clicked and when the sliders are moved
    useEffect(() => {
        getRandomNumbers();
    }, [clicked, size]);

    // Increments steps according to how many steps there are
    function counter() {
        console.log(steps)
        setSteps(steps + 1);
    }

    function countDown() {
        if (steps === 0) return;

        setSteps(steps-1);
    }

    function refLevel(lvl, alg) {
        setSteps(0);
        getRandomNumbers();
        refreshLevel(lvl, alg);
    }

    return (
        <div className="game" id="game-body">
            { difficulty === 1 ? 
                <Level1 
                    refreshLevel={() => refLevel(1, "mergeSort")}
                />
            : difficulty === 2 ? 
                <Level2
                    blocks={blocks}
                    current={true}
                    steps={steps}
                    countUp={counter}
                    countDown={countDown}
                    algorithm={algorithm}
                    level={difficulty}
                    refreshLevel={() => refLevel(2, "mergeSort")}
                />
            : difficulty === 3 ? 
                <>
                <div className="stepCounter"> Step {steps + 1}</div>
                    <Level3
                        blocks={blocks}
                        current={true}
                        steps={steps}
                        countUp={counter}
                        countDown={countDown}
                        algorithm={algorithm}
                        level={difficulty}
                        refreshLevel={() => refLevel(3, "mergeSort")}
                    />
                </>
            : difficulty === 4 ? 
                <>
                <div className="stepCounter"> Step {steps + 1}</div>
                    <Level4
                        blocks={blocks}
                        current={true}
                        steps={steps}
                        countUp={counter}
                        countDown={countDown}
                        algorithm={algorithm}
                        level={difficulty}
                        refreshLevel={() => refLevel(4, "mergeSort")}
                    />
                </>
            : difficulty === 5 ?
            <>
                <div className="stepCounter"> Step {steps + 1}</div>
                <Level5
                    blocks={blocks}
                    current={true}
                    steps={steps}
                    countUp={counter}
                    countDown={countDown}
                    algorithm={algorithm}
                    level={difficulty}
                    refreshLevel={() => refLevel(5, "mergeSort")}
                />
            </>
            : difficulty === 6 ?
            <>
                <div className="stepCounter"> Step {steps + 1}</div>
                <CustomLevel
                    blocks={blocks}
                    current={true}
                    steps={steps}
                    countUp={counter}
                    countDown={countDown}
                    algorithm={algorithm}
                    level={difficulty}
                    refreshLevel={() => refLevel(6, "MergeSort")}
                />
            </> 
            :<></>}
        </div>
    );
}