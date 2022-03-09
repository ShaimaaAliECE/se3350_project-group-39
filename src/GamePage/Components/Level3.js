import { fireEvent } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import "./listBlock.css";

function Level3({ blocks, sorted, swap, needsSorting, steps, countUp, countDown }) {
    const [width, setWidth] = useState(
    Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5)
  );
  const [list, setList] = useState(blocks);
  const [current, setCurrent] = useState([]); //The blocks the user should be highlighting
  const [outside, setOutside] = useState([]); //The blocks left of the current array
  const [outOfPlace, setOutOfPlace] = useState([]); //The array that stores the values of the blocks that are out of place
  const [changes,setChanges] = useState([]);

  const color = blocks.length <= 50 && width > 14 ? "black" : "transparent";
  let dropOrNotToDrop = false;

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

  const checkChange = (move) => {

    let arr = outOfPlace;
    console.log(JSON.stringify(move.source.index) + "Dasdasd")
    let start = move.source.index;
    let end = move.destination.index;
    arr.push(start)
    arr.push(end)

    if (!current.includes(end) || !current.includes(end)) {
     setOutOfPlace(arr)
    }
  };

  // Switches what is being stored in the current array
  function handleSteps() {
    console.log(steps);
      switch(steps){
        case 0:
          setCurrent([0, 1]);
          setOutside([2, 3, 4, 5, 6, 7, 8, 9])
          checkArr();
          break;
        case 1:
          setCurrent([list[2], list[3], list[4]])
          setOutside([list[0], list[1],list[5], list[6], list[7], list[8], list[9]]);
          checkArr();
          break;
        case 2:
          checkArr();
          setCurrent([list[0], list[1], list[2], list[3], list[4]])
          setOutside([ list[5], list[6], list[7], list[8], list[9]]);
          
          break;
        case 3:
          checkArr();
          setCurrent([list[5], list[6]])
          setOutside([list[0], list[1], list[2], list[3], list[4],list[7], list[8], list[9]]);
          
          break;
        case 4:
          checkArr();
          setCurrent([list[7], list[8],list[9]])
          setOutside([list[0], list[1], list[2], list[3], list[4],list[5],list[6]]);
          break;
        case 5:
          checkArr();
          setCurrent([list[5],list[6],list[7], list[8],list[9]])
          setOutside([list[0], list[1],list[2], list[3], list[4]]);  
          break;
        case 6:
          checkArr();
          setCurrent([list[0], list[1], list[2], list[3], list[4],list[5],list[6],list[7],list[8],list[9]])
          setOutside([]);
          break;
        default:
          break;
      }
  }

// This checks if any blocks are out of array
function checkArr()
{
    let arr = []; //holding array
    let leftOffset = 0;



    //Checks the left array
    //Loop thtough left from 0 to length
    // for(let i = 0 + leftOffset; i < left.length; i++)
    // {
    //     //Check the index of list see if corresponding values match
    //     if(list[i] !== left[i])
    //     {
    //         arr.push(i);

    //         leftOffset += whichMoved(list, left);
    //     }
    // }
    // console.log('left: ' + left);
    
    // //Checks the right array
    // for(let i = left.length + current.length; i < list.length; i++)
    // {
    //     if(list[i] !== right[i] && (right.length!=0))
    //     {
    //       arr.push(i)
    //     }
           
    // }
    // console.log('right: ' + right);

    // //Checks the current array to see if its in order
    // for(let i = current.length; i < list.length - left.length; i++)
    // {
    //     if(list[i+1] < list[i])
    //         arr.push(i);
    // }
    // console.log('current: ' + current)

    console.log(arr + "dsa")
    setOutOfPlace(arr);
}

//a,b
  function whichMoved(a, b) {
    for(var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            if(a[i+1] === b[i]) {
                return 1;
            } else {
                return -1;
            }
          }
        }
  }


  return (
    <div>
      <div className='prev-next-container'>
          <button onClick={countDown}><FaAngleLeft /></button>
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
              {list.map((block, i) => {
                
                const height = ((block * 500) / list.length) + 10 ;
                let bg = "turquoise";

                // the array is resetted
                if (needsSorting){
                  bg = "turquoise";
                }

                  // for(let x = 0; x < outOfPlace.length; x++)
                  // {
                  //   if(i === outOfPlace[x]) {
                  //     console.log(i)
                  //     bg="red";
                  //     //dropOrNotToDrop = false;
                  //   }
                      
                  // }
                  if (outOfPlace.includes(i)) {
                    bg="red";
                  }
                  console.log(steps +"step")

                  const checkSort = (arr) =>{
                    for(let i = 0; i < arr.length; i++)
                    {
                      if(arr[i] > arr[i+1])
                        return false;
                    }
                    return true;
                  }

                  // if(steps === 7)
                  // {
                  //   if(checkSort(list))
                  //     bg = "#4bc52e"
                  //   else
                  //     bg = "red"
                  //   console.log(steps)
                  // }
                
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
    </div>
  );
}

export default Level3;