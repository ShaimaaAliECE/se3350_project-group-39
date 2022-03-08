import React, { useEffect, useState } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import './Level1.css';
import Steps from './Steps.json'

export default function Level1() {

    const colours = ["#ff4444", "#33b5e5", "%ffbb33", "#00c851"] //red, light blue, yellow, green

    
    const [ index, setIndex ] = useState(1);
    const [ blocks, setBlocks ] = useState([7, 6, 2, 8, 4, 3, 9, 2, 6, 4]);
    const [ steps, setSteps ] = useState(Steps.Rules.MergeSort);
    const [ step, setStep ] = useState(steps[`${index}`]);
    const [ nextDisable, setNextDisable ] = useState(false);
    const [ prevDisable, setPrevDisable ] = useState(false);

    const [width, setWidth] = useState(
        Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
    );
    
    const color = blocks.length <= 50 && width > 14 ? 'black' : 'transparent'

    useEffect(() => {

        //setting displayed step as the initial step from the json file
        setStep(steps[index]);

        setWidth(
            Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
        );

        setStep(steps[`${index}`])

        if (step.array) {
            setBlocks(step.array);
        }

        console.log(index, step.array)
        handleDisable();

    }, [index])

    function handleNext()  {
        setIndex(index+1);
        
    }

    function handlePrev()   {
        setIndex(index-1);
    }

    function handleDisable()    {
        if (index === 22)   {
            setNextDisable(true);
        } else {
            setNextDisable(false);
        }

        if (index === 1)    {
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