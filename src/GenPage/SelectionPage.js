import "./selectionPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slider, PageHeader, Select, Image } from "antd";
import "antd/dist/antd.min.css";
import useToken from "../useToken";
import Header from "../Header/Header";
import Expand from "react-expand-animated";
import Game from "../GamePage/Game";
import axios from "axios";
import Timer from "./Timer";

const { Option } = Select;
function SelectionPage(props) {
  const [level, setLevel] = useState(1);
  const [time, setTime] = useState(0);
  const [listSize, setListSize] = useState(10);
  const [clicked, setClicked] = useState(false);
  const [algo, setAlgo] = useState("mergeSort");
  const navigate = useNavigate();

  const sortImage = {
    bubbleSort:
      "https://cdn.programiz.com/cdn/farfuture/kn1zM7ZGIj60jcTe3mv8gAtbrvFHqxgqfQ7F9MdjPuA/mtime:1582112622/sites/tutorial2program/files/Bubble-sort-0.png",
    quickSort:
      "https://cdn.programiz.com/cdn/farfuture/QA-TsXFkcz3cNyJikcbIWxepFVDu8ntl220KzlG8zdw/mtime:1617189492/sites/tutorial2program/files/quick-sort-partition-third-step.png",
    mergeSort:
      "https://cdn.programiz.com/cdn/farfuture/PRTu8e23Uz212XPrrzN_uqXkVZVY_E0Ta8GZp61-zvw/mtime:1586425911/sites/tutorial2program/files/merge-sort-example_0.png",
  };

  const handleTime = (curTime) => {
    console.log(curTime);
    setTime(curTime);
  };

  // record the score in the backend
  const handleExit = () => {
    axios({
      method: "POST",
      url: "/add_entry",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: {
        algorithm: algo,
        level: level,
        // time: time
        time: 0,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="App">
      <div className="Frame">
        <p align="center" className="sign">
          Select a Algorithm
        </p>

        <div className="barDiv">
          <Select
            defaultValue="mergeSort"
            onChange={(value) => {
              console.log(value);
              setAlgo(value);
            }}
          >
            <Option value="bubbleSort">Bubble Sort</Option>
            <Option value="quickSort">Quick Sort</Option>
            <Option value="mergeSort">Merge Sort</Option>
          </Select>
          <div>
            <Image
              align="bottom"
              width={300}
              height={150}
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
            max={5}
            min={1}
            onChange={(value) => {
              setLevel(value);
            }}
          />
        </div>

        {/* <p className="sign" align="center">Select a List Size []</p> */}

        <div className="barDiv">
          <p className="sign" align="center">
            Size of List: {listSize}
          </p>
          <Slider
            style={{ width: "300px" }}
            defaultValue={10}
            disabled={false}
            min={10}
            max={100}
            onChange={(value) => {
              setListSize(value);
            }}
          />
        </div>

        <div align="center" style={{ padding: "10px" }}></div>

        <div className="barDiv">
          {!clicked ? (
            <button className="submit" onClick={() => setClicked(true)}>
              Start
            </button>
          ) : (
            <button
              className="submit"
              onClick={() => {
                setClicked(false);
                handleExit();
              }}
            >
              Exit
            </button>
          )}
          <Expand className="expand" open={clicked}>
            <div className="expandDiv">
              {clicked ? (
                <>
                  <Game algorythm={algo} difficulty={level} size={listSize} />
                  <Timer handleTimeChange={handleTime} />
                </>
              ) : undefined}
            </div>
          </Expand>
        </div>
      </div>
    </div>
  );
}

export default SelectionPage;
