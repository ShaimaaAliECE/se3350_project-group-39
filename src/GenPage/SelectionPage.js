import "./SelectionPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slider,PageHeader, Select, Image } from "antd";
import "antd/dist/antd.css";
import useToken from '../useToken';
import Header from "../Header/Header";

const { Option } = Select;

function SelectionPage() {
  const [level, setLevel] = useState(0);
  const [listSize, setListSize] = useState(0);
  const [algo, setAlgo] = useState("b");
  const navigate = useNavigate();
  const {removeToken} = useToken();

  const sortImage = {
    b: "https://cdn.programiz.com/cdn/farfuture/kn1zM7ZGIj60jcTe3mv8gAtbrvFHqxgqfQ7F9MdjPuA/mtime:1582112622/sites/tutorial2program/files/Bubble-sort-0.png",
    q: "https://cdn.programiz.com/cdn/farfuture/QA-TsXFkcz3cNyJikcbIWxepFVDu8ntl220KzlG8zdw/mtime:1617189492/sites/tutorial2program/files/quick-sort-partition-third-step.png",
    m: "https://cdn.programiz.com/cdn/farfuture/PRTu8e23Uz212XPrrzN_uqXkVZVY_E0Ta8GZp61-zvw/mtime:1586425911/sites/tutorial2program/files/merge-sort-example_0.png"
  }

  return (
    <div>
      
      <div className="App">
          <div className="App-header">
                    
          <Header />      
          <PageHeader className="site-page-header" title="Select Your Algo" />


          <div className="Frame">

            <p className="sign" align="center">Select a Algorithm</p>
            
            <div align="center" style={{padding:"10px"}}>
              
            <Select
              defaultValue="b"
              style={{ width: '75%' }}
              onChange={(value) => {
                console.log(value)
                setAlgo(value);
              }}
            >
              <Option value="b">Bubble Sort</Option>
              <Option value="q">Quick Sort</Option>
              <Option value="m">Merge Sort</Option>
            </Select>
            </div>

            <div align="center">
            <Image align="center" style={{padding:"10px"}}
              width={'50%'}
              src={sortImage[algo]}
              fallback="https://cdn.programiz.com/cdn/farfuture/QA-TsXFkcz3cNyJikcbIWxepFVDu8ntl220KzlG8zdw/mtime:1617189492/sites/tutorial2program/files/quick-sort-partition-third-step.png"
            />
            </div>

            <p className="sign" align="center">Select a Level</p>
          <div align="center" style={{padding:"10px"}}>
                      <Slider
                        defaultValue={0}
                        disabled={false}
                        max={10}
                        onChange={(value) => {
                          setLevel(value);
                        }}
                      />
                      <p className="sign" align="center">Difficulty: {level}</p>
          </div>

          <p className="sign" align="center">Select a List Size []</p>
          <div align="center" style={{padding:"10px"}}>
          <Slider
                        defaultValue={0}
                        disabled={false}
                        max={10}
                        onChange={(value) => {
                          setListSize(value);
                        }}
                      />
                      <p className="sign" align="center">Size of List: {listSize}</p>
                      </div>
                      <div align="center" style={{padding:"10px"}}>

           <div aligh="center" className="submit-btn">
           <button  className="btn" onClick={() => (navigate('/Game'))}>Start</button>
             </div> 
             </div> 
          </div>

         
          
          </div>



          
          

        
      </div>
    </div>
  );
}

export default SelectionPage;


