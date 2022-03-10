import { fireEvent } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import "./listBlock.css";

function Level3({ blocks, sorted, swap, needsSorting, steps, countUp, countDown }) {
    const [width, setWidth] = useState(
    Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5)
  );
  const [list, setList] = useState(blocks);
  const [current, setCurrent] = useState([]); //The blocks the user should be highlighting
  const [outOfPlace, setOutOfPlace] = useState([]); //The array that stores the values of the blocks that are out of place
  const [currentStepValid, setCurrentStepValid] = useState(false);
  const [changes,setChanges] = useState([]);
  const [mistakes, setMistakes] = useState(0);


  const color = blocks.length <= 50 && width > 14 ? "black" : "transparent";
  let dropOrNotToDrop = false;
  let stepInstructions = "";

  useEffect(() => {
    setCurrentStepValid(false);
  }, [steps]);

  useEffect(() => {
    handleSteps();
    checkCurrentStep(list);
  }, [currentStepValid]);

  useEffect(() => {
    setCurrentStepValid(false);
    setWidth(
      Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
    );
    setList(blocks);
    checkCurrentStep(blocks);
  }, [blocks])


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    
    console.log(JSON.stringify(result) + "Dasdasd")
    
    // FOR EACH CHANGE then check validity, if the des
    //Check if block can be changed, if not 
    
    checkChange(result);
    
    const items = Array.from(list);
    console.log(items)
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
  };

  useEffect(() => {
    checkCurrentStep(list);
  }, [list])

  function checkCurrentStep(items) {
    let array = items.slice(current[0], current[current.length - 1] + 1);

    let sortedArray = JSON.parse(JSON.stringify(array));
    sortedArray.sort((first, second) => first - second);
    let isEqual = true;

    array.forEach((item, index) => {
      if (!(sortedArray[index] === item)) {
        isEqual = false;
        return;
      }
    });

    if (isEqual) {
      setCurrentStepValid(true);
    } else {
      setCurrentStepValid(false);
    }
  }

  // Checks what change the user has made in terms of moving the blocks
  const checkChange = (move) => {

    let arr = outOfPlace;
    console.log(JSON.stringify(move.source.index) + "Dasdasd")
    let start = move.source.index;
    let end = move.destination.index;

    
    if ((!current.includes(end) || !current.includes(end)) && end!=start) {
      arr.push(start)
      arr.push(end)
      setMistakes(mistakes + 1);
    }

    if (current.includes(end)) {
      const endIndex = arr.indexOf(current[end]);
      const startIndex = arr.indexOf(current[start]);
      arr.splice(endIndex, 1);
      arr.splice(startIndex, 1);
    }

    setOutOfPlace(arr)
  };

  // Switches what is being stored in the current array
  function handleSteps() {
    console.log(steps);
      switch(steps){
        case 0:
          setCurrent([0, 1]);
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
          <button onClick={countDown}><FaAngleLeft /></button>
          <button onClick={countUp}><FaAngleRight /></button>
      </div>
      <div>mistakes {mistakes}</div>
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

                // 
                  if (outOfPlace.includes(i)) {
                    bg="red";
                  }
                  console.log(steps +"step")
                  console.log("blebble " + mistakes)


                // If the user moves the correct step into order
                  if (current.includes(i) && !outOfPlace.includes(i)) {
                    bg = (currentStepValid ? '#4bc52e' : 'turquoise' )
                  }
                  console.log(steps +"step")

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
                        <div 
                          style={style}
                        >
                          {block}
                        </div>
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

export default Level3;