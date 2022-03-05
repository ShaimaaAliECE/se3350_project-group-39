import React, { useEffect, useState } from 'react';
import ListBlocks from '../Components/ListBlock';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import './Level1.css';
import Steps from './Steps.json'

export default function Level1({blocks, swap, compare, needsSorting, sorted}) {
    
    const [ list, setList ] = useState();
    const [ index, setIndex ] = useState(0);
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
        }

        if (index === 0)    {
            setPrevDisable(true);
        }
    }
    
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