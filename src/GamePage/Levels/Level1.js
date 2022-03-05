import React, { useEffect, useState } from 'react';
import ListBlocks from '../Components/ListBlock';
import './Level1.css';

export default function Level1({blocks, swap, compare, needsSorting, sorted}) {
    
    const [ list, setList ] = useState(blocks);
    const [ selected, setSelected ] = useState(false);
    

    const [width, setWidth] = useState(
        Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
    );
    
    const color = blocks.length <= 50 && width > 14 ? 'black' : 'transparent'

    useEffect(() => {
        setList(blocks);

        setWidth(
            Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
        );

    }, [blocks])
    
    return (
        <div className='tutorial-div'>
            
            <div className='prev-next-container'>
                <button>prev</button>
                <button>next</button>
            </div>
            
            <div>
                <ul className="list">
                    {list.map((block, i) => {
                        const height = ((block * 500) / blocks.length) + 10;
                        let bg = "turquoise"

                        if (selected)   {
                            bg = "blue";
                        }

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