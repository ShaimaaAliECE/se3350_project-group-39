import "./selectionPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slider, Switch, PageHeader, Select, Image } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

function SelectionPage() {
  const [level, setLevel] = useState(0);
  const [listSize, setListSize] = useState(0);
  const [algo, setAlgo] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <header className="App">
        <div className="App-header">
          <PageHeader className="site-page-header" title="Select Your Algo" />

          <div
            style={{
              display: "block",
              width: 500,
              padding: 30,
            }}

          >
            <h2>Select a Algorithm</h2>
            <Image
              width={'25%'}
              src="https://cdn.onlinewebfonts.com/svg/img_546218.png"
            />
            <Select
              defaultValue="b"
              style={{ width: '75%' }}
              onChange={(value) => {
                console.log(value);
                setAlgo(value);
              }}
            >
              <Option value="b">Bubble Sort</Option>
              <Option value="q">Quick Sort</Option>
              <Option value="m">Merge Sort</Option>
            </Select>
          </div>


    <div style={{ width: 700, padding: 30, display: "block", borderRadius: 7, borderWidth: 2, borderColor: '#f1f1f1' }} className="profile">
            <h2>Select a Level</h2>
            <Slider
              defaultValue={0}
              disabled={false}
              max={10}
              onChange={(value) => {
                setLevel(value);
              }}
            />
            Slider Value: {level}
          </div>



          <div
          >
            <h2>Select a List Size []</h2>
            <Slider
              defaultValue={0}
              disabled={false}
              max={10}
              onChange={(value) => {
                setListSize(value);
              }}
            />
            Slider Value: {listSize}
          </div>
          <div
            style={{
              display: "block",
              width: 700,
              padding: 30,
            }}

          ><button onClick={() => (navigate('/Game'))}>Start</button></div>

        </div>
      </header>
    </div>
  );
}

export default SelectionPage;
