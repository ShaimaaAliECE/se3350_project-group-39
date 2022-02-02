import './selectionPage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown,Slider, Switch} from 'antd';
import "antd/dist/antd.css";

import { PageHeader } from 'antd';

const menu = (
  <Menu className="Menu" selectable> 
    <Menu.Item>
      Merge Sort
    </Menu.Item>
    <Menu.Item>
      Quick Sort
    </Menu.Item>
    <Menu.Item>
      Bubble Sort
    </Menu.Item>
  </Menu>
);



function SelectionPage() {

  const [level, setLevel] = useState(0)
  const [algo, setAlgo] = useState("")
  return (
    <div >
      <header className="App">
        <div className="App-header">

                  <PageHeader
                    className="site-page-header"
                    title="Select Your Algo"
                    />


              <div style={{"padding":"10px","theme": "#1DA57A"}}>


              <Dropdown overlay={menu} trigger={(value)=> {
                console.log(value)
        setAlgo(value)
      }}>
                  <a className="ant-dropdown-link" href="#">
                    Choose an Algo Here
                  </a>
                </Dropdown>
              </div>

              <div style={{"padding":"10px","theme": "#1DA57A"}}>
             
              </div>
              <div style={{
      display: 'block', width: 700, padding: 30
    }}>
      <h2>Select a Level</h2>
      <Slider defaultValue={0} disabled={false} max={10} onChange={(value)=> {
        
        setLevel(value)
      }}
      />
      Slider Value: {level}
    </div>

    {algo}
   
                  
 
          <button>Start</button>
        </div>
      </header>
    </div>
  );
}

export default SelectionPage;
