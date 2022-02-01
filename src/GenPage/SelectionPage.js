import './selectionPage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown,Slider, Switch} from 'antd';
import "antd/dist/antd.css";

import { PageHeader } from 'antd';

const menu = (
  <Menu className="Menu"> 
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Merge Sort</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Quick Sort</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Bubble Sort</a>
    </Menu.Item>
  </Menu>
);



function SelectionPage() {
  return (
    <div >
      <header className="App">
        <div className="App-header">
                  <PageHeader
                    className="site-page-header"
                    title="Select Your Algo"
                    />
              <div style={{"padding":"10px","theme": "#1DA57A"}}>
              <Dropdown overlay={menu}>
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
      <Slider defaultValue={0} disabled={false} max={10} 
      />
      Slider Value: {4}
    </div>
   
                  
 
          <button>Start</button>
        </div>
      </header>
    </div>
  );
}

export default SelectionPage;
