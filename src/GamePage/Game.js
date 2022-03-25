import React, { useState, useEffect, createRef } from "react";
import "./Game.css";
import axios from "axios";
import Level1 from "./Levels/Level1"
import Level2 from "./Components/Level2";
import Level3 from "./Components/Level3";
import Level4 from "./Components/Level4";
import Timer from "../GenPage/Timer";

export default function Game({ algorithm, difficulty, size, clicked, refreshLevel, max }) {
    // states
    const [blocks, setBlocks] = useState([]);
    const [steps, setSteps] = useState(0);

    // Gets random numbers from the back end and fills the blocks array with them
    function getRandomNumbers() {

        
        // Determines what the max is depedning on the level
        if(difficulty <=3)
            max = 20;
        else if(difficulty === 4)
            max = 50;
        else if(difficulty === 5)
            max = 99;
    
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
    }, [difficulty])

    // Called every time the start button is clicked and when the sliders are moved
    useEffect(() => {
        getRandomNumbers();
    }, [clicked, size]);

    // Increments steps according to how many steps there are
    function counter(){
        console.log(steps)
        setSteps(steps + 1);
    }

    function countDown() {
        setSteps(steps-1);
        if(steps <= 0){
            setSteps(0);
        }
 
    }

    return (
        <div className="game" id="game-body">
            { difficulty === 1 ? 
                <Level1 />
            : difficulty === 2 ? 
                <Level2
                    blocks={blocks}
                    current={true}
                    steps={steps}
                    countUp={counter}
                    countDown={countDown}
                    algorithm={algorithm}
                    level={difficulty}
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
                    />
                </>
            : <></>}
        </div>
    );
}