import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "./login/Login";
function App() {
    return (
        <div className="App">
            <Login />
        </div>
    );
}

export default App;
