import "./selectionPage.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Slider, Switch, PageHeader, Select, Image } from "antd";
import "antd/dist/antd.css";
import useToken from '../useToken';
import Header from "../Header/Header";

const { Option } = Select;

function SelectionPage() {
  const [level, setLevel] = useState(0);
  const [listSize, setListSize] = useState(0);
  const [algo, setAlgo] = useState("");
  const navigate = useNavigate();
  const {removeToken} = useToken();

  return (
    <div>
      
      <div className="App">
          <div className="App-header">
                    
          <PageHeader className="site-page-header" title="Select Your Algo" />


          <div className="loginFrame">
          <p className="sign" align="center">Select a Algorithm</p>
            

            <div align="center" style={{padding:"10px"}}>
              
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

            <div align="center">
            <Image align="center" style={{padding:"10px"}}
              width={'25%'}
              src="https://cdn.programiz.com/cdn/farfuture/PRTu8e23Uz212XPrrzN_uqXkVZVY_E0Ta8GZp61-zvw/mtime:1586425911/sites/tutorial2program/files/merge-sort-example_0.png"
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


