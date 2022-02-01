import './selectionPage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SelectionPage() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Select Your Options</h1>
          <p1>Choose Your Algorithm</p1>
          <p1>Select a Level</p1>
          <p1>List Size</p1>
          <button>Start</button>
        </div>
      </header>
    </div>
  );
}

export default SelectionPage;
