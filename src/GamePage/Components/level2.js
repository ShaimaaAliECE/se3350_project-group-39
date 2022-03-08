import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import "./listBlock.css";

function Level2({ blocks, sorted, swap, needsSorting, steps, countUp }) {
    const [width, setWidth] = useState(
    Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5)
  );
  const [list, setList] = useState(blocks);
  const [current, setCurrent] = useState([]); //Currently highlighted blue blocks
  const color = blocks.length <= 50 && width > 14 ? "black" : "transparent";
  let dropOrNotToDrop = true;

  useEffect(() => {
    handleSteps();
  }, [steps]);

  useEffect(() => {
    setWidth(
        Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
      );
        setList(blocks);
  }, [blocks])


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(list);
    console.log(items)
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  // Switches what is being stored in the current array
  function handleSteps() {
    console.log(steps);
      switch(steps){
        case 0:
          setCurrent([0,1]);
          break;
        case 1:
          setCurrent([2,3,4])
          break;
        case 2:
          setCurrent([0,1,2,3,4])
          break;
        case 3:
          setCurrent([5,6])
          break;
        case 4:
          setCurrent([7,8,9])
          break;
        case 5:
          setCurrent([5,6,7,8,9])
          break;
        case 6:
          setCurrent([0,1,2,3,4,5,6,7,8,9])
          break;
        default:
          break;
      }


  }

  return (
    <div>
      <div className='prev-next-container'>
          <button><FaAngleLeft /></button>
          <button onClick={countUp}><FaAngleRight /></button>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="blocks" direction="horizontal">
          {(provided) => (
            <ul
              className="listBlocks"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {list.map((block, index) => {
                
                const height = ((block * 500) / list.length) + 10 ;
                let bg = "turquoise";

                // the array is resetted
                if (needsSorting){
                  bg = "turquoise";
                }

                  if(current.includes(index)) {
                    bg="yellow";
                    dropOrNotToDrop = false;
                  } else {
                    bg="black";
                    dropOrNotToDrop = true;
                  }

                // Checking if the final array is sorted
                const checkSort = (arr) =>{
                  for(let i = 0; i < arr.length; i++)
                  {
                    if(arr[i] > arr[i+1])
                      return false;
                  }

                  if(steps === 7)
                  {
                    if(checkSort(list)) {
                      bg = "#4bc52e"
                      dropOrNotToDrop = false;
                    }
                    else
                      bg = "red"
                    console.log(steps)
                  }
                }
                
                const style = {
                  backgroundColor: bg,
                  color: color,
                  height: height,
                  width: width,
                };
                return (
                  <Draggable
                    key={index}
                    draggableId={"" + index}
                    index={index}
                    isDragDisabled={dropOrNotToDrop} 
                  >
                  
                    {(provided) => {
                        
                        return (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div style={style}>{block}</div>
                      </li>
                    )}}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Level2;