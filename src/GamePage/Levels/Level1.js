import React from 'react';
import ListBlocks from '../Components/ListBlock';
import './Level1.css';

export default function Level1() {
    return (
        <div>
            <div className='prev-next-container'>
                <button>prev</button>
                <button>next</button>
            </div>

            <ListBlocks needsSorting={false}/>
        </div>
    );
}