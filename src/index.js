import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SelectionPage from './GenPage/SelectionPage'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuPage from './Menu Page/MenuPage';
import Profile from './Profile/Profile';
import useToken from './useToken';
import Game from './GamePage/Game';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/SelectionPage" element={<SelectionPage token={localStorage.getItem('token')}/>}></Route>
        <Route path="/MenuPage" element={<MenuPage/>}></Route>
        <Route path="/Profile" element={<Profile token={localStorage.getItem('token')} setToken={() => {const { saveToken } = useToken(); return saveToken; }} />}></Route>
        <Route path="/Game" element={<Game/>}></Route>

      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
