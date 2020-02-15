import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import MetaMask from './components/MetaMask'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(<BrowserRouter><MetaMask /></BrowserRouter>, document.getElementById('root'));