import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import "./listBlock.css";

function Level2({ blocks, sorted, swap, needsSorting, steps }) {
    const [width, setWidth] = useState(
    Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5)
  );
  const [list, setList] = useState(blocks);
  const [current, setCurrent] = useState([]);
  const color = blocks.length <= 50 && width > 14 ? "black" : "transparent";

  useEffect(() => {
    setWidth(
      Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
    );
      setList(blocks);  
  
  }, [blocks, sorted]);


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(list);
    console.log(items)
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log("fuck is this" + items[1])

    setList(items);
  };

  const handleSteps = () =>{
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
              const items = Array.from(list);
              let j = 0;

              const height = ((block * 500) / blocks.length) + 10 ;
              let bg = "turquoise";

              // the array is resetted
              if (needsSorting){
                bg = "turquoise";
              }

              
                if((i===j || i===(j+1)) && (items[0] > items[1]))
                {
                    bg = "blue";
                    console.log("penis" + items[i] + "77" + items[i+1])
                    console.log(j)
                    
                }

                for(let x = 0; x < current.length; x++)
                {
                  
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
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div style={style}>{block}</div>
                    </li>
                  )}
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

export default Level2;