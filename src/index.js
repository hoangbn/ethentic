import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
    timeout: 3000,
    position: positions.TOP_RIGHT,
    containerStyle: {
        zIndex: 10000
    }
};

const Root = () => (
    <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...options}>
            <App />
        </AlertProvider>
    </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));