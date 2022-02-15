import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'https://reilitics-be.herokuapp.com/api/'
axios.defaults.headers =
{
  'Authorization': `Bearer ${localStorage.getItem('x-auth-token')}`,
  // 'x-auth-token': localStorage.getItem('x-auth-token'),
  'Content-Type': 'application/json'
}
ReactDOM.render(
  <React.StrictMode>
    <App />

  </React.StrictMode>,
  document.getElementById('root')
);

