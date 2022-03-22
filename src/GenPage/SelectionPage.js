import "./selectionPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slider, PageHeader, Select, Image, Divider } from "antd";
import "antd/dist/antd.min.css";
import useToken from "../useToken";
import Header from "../Header/Header";
import Expand from "react-expand-animated";
import Game from "../GamePage/Game";
import axios from "axios";
import levelData from '../Levels.json';
import Timeout from "./Timeout";
import { useParams } from "react-router-dom";


const { Option } = Select;




function SelectionPage() {
  // states
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(0.0);
  const [listSize, setListSize] = useState(levelData["levels"][`${level}`]["size"]);
  const [clicked, setClicked] = useState(false);
  const [algo, setAlgo] = useState("mergeSort");
  const navigate = useNavigate();
  const word = "Start";
  // Images used when the user is selecting an algo
  const sortImage = {
    bubbleSort: "./assets/AlgoImages/bubbleSort.png",
    quickSort: "./assets/AlgoImages/quickSort.png",
    mergeSort: "./assets/AlgoImages/bubbleSort.png",
  };

  function refreshLevel(lvl, alg) {
    setLevel(lvl ? lvl : 1);

    setAlgo(alg ? alg : "MergeSort");
  }

  useEffect(() => {
    setListSize(levelData["levels"][`${level}`]["size"]);
  }, [level]);

  // Function to set the difficulty
  function getDifficulty() {

    let value = level
    if (value === 1 || value === 2) {
      return "./assets/Levels/easy.png"
    }
    else if (value === 3 || value === 4) {
      return "./assets/Levels/medium.png"
    }
    else {
      return "./assets/Levels/hard.png"
    }
  }

  return (
    <div className="App">
      <div className="Frame">
      <div className="submit-btn">
                        <button className="btn" onClick={() => {navigate('/MenuPage')}}>
                            back
                        </button>
                    </div>
        <p align="center" className="sign">
          Select an Algorithm
        </p>
      <div className="options-container">
        <div className="barDiv">
          <Select
          className="selection-box"
            defaultValue="mergeSort"
            value={algo ? algo : 1}
            onChange={(value) => {
              console.log(value);
              setAlgo(value);
            }}
          >
            <Option value="bubbleSort">Bubble Sort</Option>
            <Option value="quickSort">Quick Sort</Option>
            <Option value="mergeSort">Merge Sort</Option>
          </Select>
          <div className="imgDiv">
            <Image
              align="bottom"
              width={275}
              height={100}
              src={sortImage[algo]}
              fallback="https://cdn.programiz.com/cdn/farfuture/QA-TsXFkcz3cNyJikcbIWxepFVDu8ntl220KzlG8zdw/mtime:1617189492/sites/tutorial2program/files/quick-sort-partition-third-step.png"
            />
          </div>
        </div>

        <div className="barDiv">
          <p className="sign" align="center">
            Level: {level}
          </p>
          <Slider
            style={{ width: "300px" }}
            defaultValue={1}
            disabled={false} 
            min={1}
            max={6}
            value={level ? level : 1}
            onChange={(value) => {
              setLevel(value);
            }}
          />
          <div className="imgDiv">
            <Image
              align="bottom"
              width={300}
              height={130}
              src={getDifficulty()}
              fallback="https://cdn.programiz.com/cdn/farfuture/QA-TsXFkcz3cNyJikcbIWxepFVDu8ntl220KzlG8zdw/mtime:1617189492/sites/tutorial2program/files/quick-sort-partition-third-step.png"
            />
          </div>
        </div>

        <div className="barDiv">
          <p className="sign" align="center">
            Size of List: {listSize}
          </p>
          <Slider
            style={{ width: "270px" }}
            defaultValue={listSize}
            value={listSize}
            max={50}
            step={1}
            onChange={(value) => {
              setListSize(value);
            }}
            onAfterChange={() => {
              console.log("listsize = " + listSize);
            }}

            disabled={levelData["levels"][`${level}`]["tutorial"] ? true : false}
          />
        </div>

        <Divider />

        <div className="expand">
          <div className="expandDiv">
            <Game
              algorithm={algo}
              difficulty={level}
              size={listSize}
              clicked={clicked}
              refreshLevel={refreshLevel}
            />
          </div>
          <Timeout />
        </div>
      </div>
    </div>
    </div>
  );
}

export default SelectionPage;
