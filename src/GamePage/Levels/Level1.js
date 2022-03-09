import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import './Level1.css';
import Steps from './Steps.json'

export default function Level1() {
    

    const colours = ["#ff4444", "#33b5e5", "%ffbb33", "#00c851"] //red, light blue, yellow, green

    const [ index, setIndex ] = useState(1);
    const [ blocks, setBlocks ] = useState(Steps["Rules"]["TutorialArray"]);
    // const [ steps, setSteps ] = useState(Steps.Rules.MergeSort);
    const steps = Steps["Rules"]["MergeSort"];
    const [ step, setStep ] = useState(steps[`${index}`]);
    console.log(step);
    const [ range, setRange ] = useState([]);
    const [ nextDisable, setNextDisable ] = useState(false);
    const [ prevDisable, setPrevDisable ] = useState(false);

    

    const [width, setWidth] = useState(
        Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
    );
    
    const color = blocks.length <= 50 && width > 14 ? 'black' : 'transparent'

    useEffect(() => {

        setRange(step.range);

        //setting displayed step as the initial step from the json file
        setStep(steps[`${index}`]);

        setWidth(
            Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
        );

        if (step.array) {
            setBlocks(step.array);
        }
        
        handleDisable();

        renderRanges(range);

        console.log(index, step.array, step.Description);
        

    }, [index])

    function renderRanges()   {
        range.forEach((item, index) => {
            let min = item[0];
            let max = item[1] ? item[1] : min;

            console.log(min, max);

            blocks.map((block, j)  =>  {
                if (min <= j && j <= max) {
                    document.getElementById(j).style.backgroundColor = `${colours[index % colours.length]}`
                }
            });
        });
    }

    function handleNext()  {
        setIndex(index+1);
        console.log(index);
        
    }

    function handlePrev()   {
        console.log(index);
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

                        const style = {
                            'color': color, 
                            'height': height, 
                            'width': width
                        }

                        return (<div key={i} id={i} className='block' style={style}>{block}</div>);

                    })}
                </ul>
    
            </div>
        </div>
    );
}