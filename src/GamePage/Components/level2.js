import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import "./listBlock.css";
import useSound from 'use-sound';
import WinSound from '../../Sounds/win.mp3';
import ErrorSound from '../../Sounds/error.mp3';
import { notification } from "antd";
import Timer from "../../GenPage/Timer";

function Level2({ blocks, steps, countUp, countDown, algorithm, level }) {
    const [width, setWidth] = useState(
    Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5)
  );
  const [list, setList] = useState(blocks);
  const [current, setCurrent] = useState([]); //Currently highlighted blue blocks
  const [currentStepValid, setCurrentStepValid] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [won, setWon] = useState(false);
  const color = blocks.length <= 50 && width > 14 ? "black" : "transparent";
  let isDraggable = true;

  // sounds
  const [playWinSound] = useSound(WinSound);
  const [playErrorSound] = useSound(ErrorSound);

  useEffect(() => {
    setCurrentStepValid(false);
  }, [steps]);

  useEffect(() => {
    handleSteps();
    checkCurrentStep(list);

    // send message for current step correct
    if (currentStepValid && !completed) 
      notification.success({
        message: 'Hooray!',
        description: 'You got it! Click on the right arrow to move to the next step',
        placement: 'topLeft'
      })
  }, [currentStepValid])

  useEffect(() => {
    setWidth(
        Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 8)
      );
    setCurrentStepValid(false);
    setList(blocks);
    checkCurrentStep(blocks);
  }, [blocks]);

  useEffect(() => {
    if (completed) setWon(true);
  }, [completed]);

  useEffect(() => {
    if (won) handleLevelComplete();
  }, [won]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    // accomodate invalid dragging of items
    if (!current.includes(result.destination.index)) {
      playErrorSound();
      return;
    }

    const items = Array.from(list);
    console.log(items)
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setList(items);
    checkCurrentStep(items);
  };

  // Switches what is being stored in the current array
  function handleSteps() {
    return correctBlocks[steps] ? setCurrent(correctBlocks[steps].current) : undefined;

    // console.log(steps);
    //   switch(steps){
    //     case 0:
    //       setCurrent([0,1]);
    //       break;
    //     case 1:
    //       setCurrent([2,3,4])
    //       break;
    //     case 2:
    //       setCurrent([0,1,2,3,4])
    //       break;
    //     case 3:
    //       setCurrent([5,6])
    //       break;
    //     case 4:
    //       setCurrent([7,8,9])
    //       break;
    //     case 5:
    //       setCurrent([5,6,7,8,9])
    //       break;
    //     case 6:
    //       setCurrent([0,1,2,3,4,5,6,7,8,9])
    //       break;
    //     default:
    //       break;
    //   }
  }

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

  // function to trigger when the user wins the level
  function handleLevelComplete() {
    playWinSound();

    notification.success({
      message: 'Congrats!',
      description: 'You have successfully completed the level',
      placement: 'topLeft'
    });
  }

  // increment the step counter
  const handleNextStep = () => {
    // if the current step is not valid don't progress
    if (!currentStepValid) return;

    let complete = true;

    // check if the user completed the level
    const arrCpy = JSON.parse(JSON.stringify(blocks));
    arrCpy.sort((first, second) => first - second);

    arrCpy.forEach((item, index) => {
      if (!(list[index] === item)) {
        complete = false;
        return;
      }
    });

    if (complete) {
      setCompleted(true);
    }

    // count up the step
    countUp();
  }

  return (
    <div>
      <div className='prev-next-container'>
          <button onClick={countDown}><FaAngleLeft /></button>
          <button onClick={handleNextStep}><FaAngleRight /></button>
      </div>
      {!won ? <Timer algorithm={algorithm} level={level} completed={completed} /> : undefined}
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

                if(current.includes(index)) {
                  bg = ( currentStepValid ? "#4bc52e" : "yellow" );
                  isDraggable = true;
                } else {
                  bg = "black";
                  isDraggable = false;
                }

                // Checking if the final array is sorted
                const checkSort = (arr) => {
                  for(let i = 0; i < arr.length; i++)
                  {
                    if(arr[i] > arr[i+1])
                      return false;
                  }
                }

                  if(steps === 7)
                  {
                    if(checkSort(list)) {
                      bg = "#4bc52e"
                      isDraggable = true;
                    } else {
                      bg = "red"
                    }
                    console.log(steps)
                  }
                
                const style = {
                  color: color,
                  height: height,
                  width: width,
                };
                return (
                  <Draggable
                    key={index}
                    draggableId={"" + index}
                    index={index}
                    isDragDisabled={!isDraggable} 
                  >
                  
                    {(provided) => {
                        
                        return (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div
                          style={{ backgroundColor: current.includes(index) ? currentStepValid ? "#4bc52e" : "yellow" : bg || "black", ...style }}
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

export default Level2;