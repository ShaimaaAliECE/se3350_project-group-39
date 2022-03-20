import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight, FaHeart } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import "./listBlock.css";


function Level4({ blocks, steps, countUp, countDown }) {
    const [width, setWidth] = useState(
    Math.min(20, Math.ceil(window.innerWidth / blocks.length) - 5)
  );
  const [list, setList] = useState(blocks);
  const [current, setCurrent] = useState([]); //The blocks the user should be highlighting
  const [outOfPlace, setOutOfPlace] = useState([]); //The array that stores the values of the blocks that are out of place
  const [currentStepValid, setCurrentStepValid] = useState(false);
  const [changes,setChanges] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [life1, setLife1] = useState(true);
  const [life2, setLife2] = useState(true);
  const [life3, setLife3] = useState(true);
  const [visible, setVisible] = useState(false); // fucntion for popup
  const [loading, setLoading] = useState(false); // fucntion for loss popup

  const color = blocks.length <= 50 && width > 14 ? "black" : "transparent";
  let dropOrNotToDrop = false;

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

  // calls the pop up after losing game
  useEffect(() => {
    if(mistakes > 2){
      showModal();
    }
  }, [mistakes])


  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
        
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

  //checks how many lives user has
  const checkLives = () => {
    if(mistakes === 0){
      setLife1(false)
    }
    if(mistakes === 1){
      setLife2(false);
    }
    if(mistakes === 2){
      setLife3(false);
    }
  }

  // Checks what change the user has made in terms of moving the blocks
  const checkChange = (move) => {

    let arr = outOfPlace;
    let start = move.source.index;
    let end = move.destination.index;

    
    if ((!current.includes(end) || !current.includes(end)) && end!=start) {
      arr.push(start)
      arr.push(end)
      setMistakes(mistakes + 1);
      checkLives();
    }

    if (current.includes(end)) {
      const endIndex = arr.indexOf(current[end]);
      const startIndex = arr.indexOf(current[start]);
      arr.splice(endIndex, 1);
      arr.splice(startIndex, 1);
    }

    setOutOfPlace(arr)
  };

  // functions to show pop up after losing game
  const showModal = () => {
    setVisible(true);
  };

  // functions to handle pop-up
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  // functions which closes pop up
  const handleCancel = () => {
    setVisible(false);
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
        case 7:
            setCurrent([10, 11]);
            break;
        case 8:
            setCurrent([12, 13, 14]);
            break;
        case 9:
            setCurrent([10,11,12,13,14]);
            break;
        case 10:
            setCurrent([15,16]);
            break;
        case 11:
            setCurrent([17,18,19]);
            break;
        case 12:
            setCurrent([15,16,17,18,19]);
            break;
        case 13:
            setCurrent([10,11,12,13,14,15,16,17,18,19]);
            break;
        case 14:
            setCurrent([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
            break;
        default:
            break;
      }
  }

  return (
    <div className="lvl4">
      <div className='prev-next-container'>
          <button onClick={countDown}><FaAngleLeft /></button>
          <button onClick={countUp}><FaAngleRight /></button>
      </div>
      <div className="lives">
      <div>{life1 ? <FaHeart/> : null}</div>
      <div>{life2 ? <FaHeart/> : null}</div>
      <div>{life3 ? <FaHeart/> : null}</div> 
      </div>
      <div className="game-lost-pop-up">{visible? <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          closable = {false}
          maskClosable = {false}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              key="link"
              href="https://google.com"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Restart Level
            </Button>,
            <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
            >
              Return To Previous Level
            </Button>,
            <Button
            key="link"
            href="http://localhost:3000/MenuPage"
            type="primary"
            loading={loading}
            onClick={handleOk}
            >
              Quit Game
            </Button>,
          ]}
        >
          <h1 className="pop-up-content">Oh No... You Lost All Your Lives</h1>
          <h2 className="pop-up-content">You now have the choice to:</h2>

        </Modal> : null}</div>
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

export default Level4;