import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./listBlock.css";

function ListBlocks({ blocks, compare, sorted, swap }) {
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
  
  }, [blocks]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  console.log(list);


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
              const height = (block * 500) / blocks.length;
              let bg = "turquoise";

              // i th element is being compared with some other element
              if (
                compare &&
                (i === compare[0] || i === compare[1])
              ) {
                bg = "#ffff50";
              }

              if (swap && (i === swap[0] || i === swap[1])) {
                bg = "red";
              }
              // i th element is in its correct position
              if (sorted && sorted.includes(i)) {
                bg = "#4bc52e";
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

export default ListBlocks;
