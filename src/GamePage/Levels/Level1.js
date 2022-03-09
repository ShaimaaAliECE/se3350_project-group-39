import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import './Level1.css';
import Steps from './Steps.json'

export default function Level1() {
    

    let colours = ["#ff4444", "#33b5e5", "%ffbb33", "#00c851"] //red, light blue, yellow, green

    const [ index, setIndex ] = useState(1);
    const [ blocks, setBlocks ] = useState(Steps["Rules"]["TutorialArray"]);
    // const [ steps, setSteps ] = useState(Steps.Rules.MergeSort);
    const steps = Steps["Rules"]["MergeSort"];
    const [ step, setStep ] = useState(steps[`${index}`]);
    console.log(step);
    const [ nextDisable, setNextDisable ] = useState(false);
    const [ prevDisable, setPrevDisable ] = useState(false);

    

    const [width, setWidth] = useState(
        Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
    );
    
    const color = blocks.length <= 50 && width > 14 ? 'black' : 'transparent'

    useEffect(() => {

        //setting displayed step as the initial step from the json file
        setStep(steps[`${index}`]);

        setWidth(
            Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
        );

        if (step.array) {
            setBlocks(step.array);
        }
        
        handleDisable();

        renderRanges(step.range);

        console.log(index, step.array, step.Description);
        

    }, [index])

    function renderRanges(range)   {
        return blocks.map(function(range)   {
            for (let i in range)    {
                let min = range[i][0];
                let max = range[i][1];

                console.log(min, max)
            }
        })
    }

    function handleNext()  {
        setIndex(index+1);
        
    }

    function handlePrev()   {
        if (index === 23)
            setIndex(index - 2);
        else    
            setIndex(index - 1);
    }

    function handleDisable()    {
        if (index > 22)   {
            setNextDisable(true);
        } else {
            setNextDisable(false);
        }

        if (index === 0)    {
            setPrevDisable(true);
        } else {
            setPrevDisable(false);
        }
    }
    

    return (
        <div className='tutorial-div'>
            
            <div className='prev-next-container'>
                <button disabled={prevDisable} onClick={handlePrev} className="next-bttn"><FaAngleLeft /></button>
                <button disabled={nextDisable} onClick={handleNext} className="prev-bttn"><FaAngleRight /></button>
            </div>
            
            <div>
                <div className="steps-div">
                    <label>hello</label>
                </div>

                <ul className="list">
                     {blocks.map((block, i) => {
                        const height = ((block * 500) / blocks.length) + 10;
                        let bg = "turquoise"

                        const style = {
                            'backgroundColor': bg,
                            'color': color, 
                            'height': height, 
                            'width': width
                        }
                        return (<div key={i} className='block' style={style}>{block}</div>);

                    })}
                </ul>
    
            </div>
        </div>
    );
}