import "./selectionPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slider, Switch, PageHeader, Select } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

function SelectionPage() {
  const [level, setLevel] = useState(0);
  const [algo, setAlgo] = useState("");

  return (
    <div>
      <header className="App">
        <div className="App-header">
          <PageHeader className="site-page-header" title="Select Your Algo" />

          <div
            style={{
              display: "block",
              padding: 30,
            }}
          >
            <h2>Select a Level</h2>
            <Select
              defaultValue="Bubble Sort"
              style={{ width: 120 }}
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


          <div
            style={{
              display: "block",
              width: 700,
              padding: 30,
            }}
          >
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

          <button>Start</button>
        </div>
      </header>
    </div>
  );
}

export default SelectionPage;
