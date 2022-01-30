import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Start Page/App';
import SelectionPage from './Selection Page/selectionPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/selectionPage" element={<SelectionPage/>}></Route>
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
