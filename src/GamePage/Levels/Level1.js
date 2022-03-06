import React, { useEffect, useState } from 'react';
import ListBlocks from '../Components/ListBlock';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import './Level1.css';
import Steps from './Steps.json'

export default function Level1({blocks, swap, compare, needsSorting, sorted}) {

    let index = 1;
    const [ list, setList ] = useState([7, 6, 2, 8, 4, 3, 9, 2, 6, 4]);
    const [ steps, setSteps ] = useState(Steps.Rules.MergeSort);
    const [ step, setStep ] = useState(steps[index]);
    const [ nextDisable, setNextDisable ] = useState(false);
    const [ prevDisable, setPrevDisable ] = useState(false);

    const [width, setWidth] = useState(
        Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
    );
    
    const color = blocks.length <= 50 && width > 14 ? 'black' : 'transparent'

    useEffect(() => {
        setList(blocks);

        setWidth(
            Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
        );

        setStep(index)

    }, [index])


    function handleNext()  {
        index++;
    }

    function handlePrev()   {
        index--;
    }

    function handleDisable()    {
        if (index === 22)   {
            setNextDisable(true);
        }

        if (index === 0)    {
            setPrevDisable(true);
        }
    }
    console.log(step)

    return (
        <div className='tutorial-div'>
            
            <div className='prev-next-container'>
                <button handleClick={handlePrev} class="next-bttn"><FaAngleLeft /></button>
                <button handleClick={handleNext} class="prev-bttn"><FaAngleRight /></button>
            </div>
            
            <div>
                <div className="steps-div">
                    <label>hello</label>
                </div>

                <ul className="list">
                    {list.map((block, i) => {
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