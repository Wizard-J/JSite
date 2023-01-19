import React from 'react';
import Layout from "./views/Layout/Layout";
import {HashRouter as Router} from "react-router-dom";
import "antd/dist/antd.css";
import "./views/Layout/Layout";
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Layout/>
            </Router>
        </div>
    );
}

export default App;
