import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import "./listBlock.css";

function Level2({ blocks, current, sorted, swap, needsSorting, needsSwapping }) {
    const [width, setWidth] = useState(
    Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5)
  );
  const [list, setList] = useState(blocks);
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
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log("fuck is this" + items[1])

    setList(items);
  };

  const handleSorting = () =>{
      
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
              const height = ((block * 500) / blocks.length) + 10 ;
              let bg = "turquoise";

              // the array is resetted
              if (needsSorting){
                bg = "turquoise";
              }

              if((i===0))
              {
                  bg = "blue";
                  console.log("penis" + blocks[1] + " " + block)
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