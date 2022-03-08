import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import "./listBlock.css";

function Level3({ blocks, sorted, swap, needsSorting, steps }) {
    const [width, setWidth] = useState(
    Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5)
  );
  const [list, setList] = useState(blocks);
  const [current, setCurrent] = useState([]); //The blocks the user should be highlighting
  const [left, setLeft] = useState([]); //The blocks left of the current array
  const [right, setRight] = useState([]); //The blocks right of the current array

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
          setCurrent([list[0], list[1]]);
          setRight([list[2], list[3], list[4], list[5], list[6], list[7], list[8], list[9]])
          break;
        case 1:
          setCurrent([list[2], list[3], list[4]])
          setLeft([list[0], list[1]]);
          setRight([ list[5], list[6], list[7], list[8], list[9]]);
          break;
        case 2:
          setCurrent([list[0], list[1], list[2], list[3], list[4]])
          setLeft([]);
          setRight([ list[5], list[6], list[7], list[8], list[9]]);
          break;
        case 3:
          setCurrent([list[5], list[6]])
          setLeft([list[0], list[1], list[2], list[3], list[4]]);
          setRight([list[7], list[8], list[9]]);
          break;
        case 4:
          setCurrent([list[7], list[8],list[9]])
          setLeft([list[0], list[1], list[2], list[3], list[4],list[5],list[6]]);
          setRight([]);
          break;
        case 5:
          setCurrent([list[5],list[6],list[7], list[8],list[9]])
          setLeft([list[0], list[1],list[2], list[3], list[4]]);
          setRight([]);
          break;
        case 6:
          setCurrent([list[0], list[1], list[2], list[3], list[4],list[5],list[6],list[7],list[8],list[9]])
          setLeft([]);
          setRight([]);
          break;
        default:
          break;
      }


  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="blocks" direction="horizontal">
        {(provided) => (
          <ul
            className="listBlocks"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((block, i) => {
              
              const height = ((block * 500) / list.length) + 10 ;
              let bg = "turquoise";

              // the array is resetted
              if (needsSorting){
                bg = "turquoise";
              }

                for(let x = 0; x < current.length; x++)
                {
                  if(i === current[x]) {
                    bg="blue";
                    dropOrNotToDrop = false;
                  }
                    
                }

                const checkSort = (arr) =>{
                  for(let i = 0; i < arr.length; i++)
                  {
                    if(arr[i] > arr[i+1])
                      return false;
                  }
                  return true;
                }

                if(steps === 7)
                {
                  if(checkSort(list))
                    bg = "#4bc52e"
                  else
                    bg = "red"
                  console.log(steps)
                }
              
              const style = {
                backgroundColor: bg,
                color: color,
                height: height,
                width: width,
              };
              return (
                <Draggable
                  key={i}
                  draggableId={"" + i}
                  index={i}
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
  );
}

export default Level3;