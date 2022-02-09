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
  const [level, setLevel] = useState(0);
  const [listSize, setListSize] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [algo, setAlgo] = useState("b");
  const navigate = useNavigate();
  const {removeToken} = useToken();

  const sortImage = {
    b: "https://cdn.programiz.com/cdn/farfuture/kn1zM7ZGIj60jcTe3mv8gAtbrvFHqxgqfQ7F9MdjPuA/mtime:1582112622/sites/tutorial2program/files/Bubble-sort-0.png",
    q: "https://cdn.programiz.com/cdn/farfuture/QA-TsXFkcz3cNyJikcbIWxepFVDu8ntl220KzlG8zdw/mtime:1617189492/sites/tutorial2program/files/quick-sort-partition-third-step.png",
    m: "https://cdn.programiz.com/cdn/farfuture/PRTu8e23Uz212XPrrzN_uqXkVZVY_E0Ta8GZp61-zvw/mtime:1586425911/sites/tutorial2program/files/merge-sort-example_0.png"
  }

  function renderInfo() {
    return(
      <Game/>
    );
  }



  return (
    <div>
      
      <div className="App">
          <div className="App-header">
                    
          <Header removeToken={removeToken}/>      


          <div className="Frame">

            <p align="center" className="sign" >Select a Algorithm</p>
            
            <div className="barDiv">
              
            <Select
              defaultValue="b"
              onChange={(value) => {
                console.log(value)
                setAlgo(value);
              }}
            >
              <Option className="op" value="b">Bubble Sort</Option>
              <Option value="q">Quick Sort</Option>
              <Option value="m">Merge Sort</Option>
            </Select>
            <Image align="bottom"
              width={300}
              height={150}
              
              src={sortImage[algo]}
              fallback="https://cdn.programiz.com/cdn/farfuture/QA-TsXFkcz3cNyJikcbIWxepFVDu8ntl220KzlG8zdw/mtime:1617189492/sites/tutorial2program/files/quick-sort-partition-third-step.png"
            />

            </div>

            

            {/* <p className="sign" align="center">Select a Level</p> */}
          <div className="barDiv">
          <p className="sign" align="center">Difficulty: {level}</p>
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
           <button className="submit"  onClick={() => setClicked(!clicked) }>Start</button>
           <Expand className="expand" open={clicked}>
                <div className="expandDiv">
                    {renderInfo()}
                </div>
            </Expand>
             </div> 
             </div> 
          
          </div>
      </div>
    </div>
  );
}

export default SelectionPage;


