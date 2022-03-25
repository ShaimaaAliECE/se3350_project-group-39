import "./App.css";
import React from "react";
import Login from "./login/Login";
import useToken from "./useToken";

function App() {
    const { setToken } = useToken();
    return (
        <div className="App">
            <Login setToken={setToken} />
        </div>
    );
}

export default App;
