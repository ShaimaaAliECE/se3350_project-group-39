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
function SelectionPage() {
    const [level, setLevel] = useState(1);
    const [time, setTime] = useState(0.0);
    const [listSize, setListSize] = useState(10);
    const [clicked, setClicked] = useState(false);
    const [algo, setAlgo] = useState("mergeSort");
    const navigate = useNavigate();

    const sortImage = {
        bubbleSort:
            "./assets/AlgoImages/bubbleSort.png",
        quickSort:
            "./assets/AlgoImages/quickSort.png",
        mergeSort:
            "./assets/AlgoImages/bubbleSort.png",
    };

    // method to set time from the timer component
    const handleTime = (curTime) => {
      setTime(curTime);
    }

    // method to store the statistics when a level ends
    const handleCompletion = () => {
      axios({
        method: 'POST',
        url: '/add_entry',
        data: {
          algorithm: algo,
          level: level,
          time: 0
          // time: time
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then((res) => {
          console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
                        defaultValue={0}
                        disabled={false}
                        max={5}
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
                        max={100}
                        step={10}
                        onChange={(value) => {
                            setListSize(value);
                        }}
                    />
                </div>

                <div align="center" style={{ padding: "10px" }}></div>

                <div className="barDiv">
                { !clicked ? 
                    <button
                        className="submit"
                        onClick={() => setClicked(true)}
                    >
                        Start
                    </button> :
                    <button
                        className="submit"
                        onClick={() => { setClicked(false); handleCompletion(); }}
                    >
                        Exit
                    </button>
                }
                    <Expand className="expand" open={clicked}>
                        <div className="expandDiv">
                            <Game
                                algorythm={algo}
                                difficulty={level}
                                size={listSize}
                            />
                        { clicked ?
                            <Timer handleTimeChange={handleTime} />
                            : undefined
                        }
                        </div>
                    </Expand>
                </div>
            </div>
        </div>
    );
}

export default SelectionPage;
