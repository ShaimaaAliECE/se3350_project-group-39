import "./selectionPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slider,PageHeader, Select, Image } from "antd";
import "antd/dist/antd.min.css";
import useToken from '../useToken';
import Header from "../Header/Header";
import Expand from 'react-expand-animated';
import Game from '../GamePage/Game';

const { Option } = Select;
function SelectionPage() {
  const [level, setLevel] = useState(1);
  const [listSize, setListSize] = useState(10);
  const [clicked, setClicked] = useState(false);
  const [algo, setAlgo] = useState("mergeSort");
  const navigate = useNavigate();
  const {removeToken} = useToken();

  const sortImage = {
    bubbleSort: "https://cdn.programiz.com/cdn/farfuture/kn1zM7ZGIj60jcTe3mv8gAtbrvFHqxgqfQ7F9MdjPuA/mtime:1582112622/sites/tutorial2program/files/Bubble-sort-0.png",
    quickSort: "https://cdn.programiz.com/cdn/farfuture/QA-TsXFkcz3cNyJikcbIWxepFVDu8ntl220KzlG8zdw/mtime:1617189492/sites/tutorial2program/files/quick-sort-partition-third-step.png",
    mergeSort: "https://cdn.programiz.com/cdn/farfuture/PRTu8e23Uz212XPrrzN_uqXkVZVY_E0Ta8GZp61-zvw/mtime:1586425911/sites/tutorial2program/files/merge-sort-example_0.png"
  }

  function handleClick() {
    setClicked(!clicked)
}

  return (
    <div className="App">
        <div className="App-header">
        <div className="Frame">

          <p align="center" className="sign" >Select a Algorithm</p>
          
          <div className="barDiv">
            
            <div className="dropdown">
                  <Select
                  defaultValue="mergeSort"
                  onChange={(value) => {
                    console.log(value)
                    setAlgo(value);
                  }}
                >
                  <Option value="bubbleSort">Bubble Sort</Option>
                  <Option value="quickSort">Quick Sort</Option>
                  <Option value="mergeSort">Merge Sort</Option>
                </Select>
            </div>
          

          <div >
              <Image align="bottom"
                width={300}
                height={325}
                
                src={sortImage[algo]}
                fallback="https://cdn.programiz.com/cdn/farfuture/QA-TsXFkcz3cNyJikcbIWxepFVDu8ntl220KzlG8zdw/mtime:1617189492/sites/tutorial2program/files/quick-sort-partition-third-step.png"
              />
          </div>
          

          </div>

          <div  className="barDiv">
            <p className="sign" align="center">Level: {level}</p>
            <Slider
                style={{width: "200px"}}
                defaultValue={0}
                disabled={false}
                max={10}
                onChange={(value) => {
                  setLevel(value);
                }}
            />
                        
                        </div>
            <div align="center" style={{padding:"10px"}}>    
        </div>

        {/* <p className="sign" align="center">Select a List Size []</p> */}


        <div  className="barDiv">
            <p className="sign" align="center">Size of List: {listSize}</p>
            <Slider
                style={{width: "200px"}}
                defaultValue={0}
                disabled={false}
                max={10}
                onChange={(value) => {
                  setListSize(value);
                }}
            />
                        
                        </div>
            <div align="center" style={{padding:"10px"}}>

        
        </div>

        <div className="barDiv">
          <button className="submit"  onClick={handleClick }>Start</button>
          <Expand className="expand" open={clicked}>
              <div className="expandDiv">
                hello
                  {/*<Game algorythm={algo} difficulty={level} size={listSize}/>*/}
              </div>
          </Expand>
            </div> 
            </div> 
        
        </div>
    </div>
  );
}

export default SelectionPage;


