import React, { useState, useEffect } from "react";
import "./Game.css";
import axios from "axios";
import Level1 from "./Levels/Level1"
import Level2 from "./Components/Level2";
import Level3 from "./Components/Level3";
import Level4 from "./Components/Level4";
import Timer from "../GenPage/Timer";

export default function Game({ algorithm, difficulty, size, clicked }) {
    // states
    const [blocks, setBlocks] = useState([]);
    const [steps, setSteps] = useState(0);
    const [completed, setCompleted] = useState(false);


    // Gets random numbers from the back end and fills the blocks array with them
    function getRandomNumbers() {
        axios({
            method: "GET",
            url: "/random",
            params: {
                size: size,
                min: 1,
                max: 20
            },
            
        }).then(({ data }) => {
            setBlocks(data);
        });
    }

    // reset steps when the level changes
    useEffect(() => {
        setSteps(0);
        setCompleted(false);
    }, [difficulty])

    // Called every time the start button is clicked and when the sliders are moved
    useEffect(() => {
        getRandomNumbers();
    }, [clicked, size]);

    // Increments steps according to how many steps there are
    function counter(complete){
        console.log(steps)
        setSteps(steps+1);
        if(steps >= 7 && difficulty < 4){
            setSteps(0);
        }
        if(steps >= 14 && difficulty === 4){
            setSteps(0);
        }

        // set whether the user completed the level or not
        if (complete)
            setCompleted(true);
    }

    function countDown() {
        setSteps(steps-1);
        if(steps <= 0){
            setSteps(0);
        }
 
    }

    return (
        <div id="game-body">
            { difficulty === 1 ? 
                <Level1 />
            : difficulty === 2 ? 
                <Level2
                    blocks={blocks}
                    current={true}
                    steps={steps}
                    countUp={counter}
                    countDown={countDown}
                    timer={<Timer completed={completed} algorithm={algorithm} level={difficulty} />}
                />
            : difficulty === 3 ? 
                <>
                <div className="stepCounter"> Step {steps}</div>
                    <Level3
                        blocks={blocks}
                        current={true}
                        steps={steps}
                        countUp={counter}
                        countDown={countDown}
                        timer={<Timer completed={completed} algorithm={algorithm} level={difficulty} />}
                    />
                </>
            : difficulty === 4 ? 
                <>
                <div className="stepCounter"> Step {steps}</div>
                    <Level4
                        blocks={blocks}
                        current={true}
                        steps={steps}
                        countUp={counter}
                        countDown={countDown}
                        timer={<Timer completed={completed} algorithm={algorithm} level={difficulty} />}
                    />
                </>
            : <></>}
        </div>
    );
}