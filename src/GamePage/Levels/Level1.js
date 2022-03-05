import React, { useEffect, useState } from 'react';
import ListBlocks from '../Components/ListBlock';
import './Level1.css';

export default function Level1({blocks, length, swap, compare, needsSorting, sorted}) {
    
    const [width, setWidth] = useState(
        Math.min(20, Math.ceil(window.innerWidth / length) - 5)
    );
    
    useEffect(() => {
        setWidth(Math.min(20, Math.ceil(window.innerWidth / length) - 8))
    }, [values]);
    
    
    return (
        <div className='tutorial-div'>
            <div className='prev-next-container'>
                <button>prev</button>
                <button>next</button>
            </div>
            
            <div>
                <ListBlocks blocks={blocks}/>
            </div>

        </div>
    );
}