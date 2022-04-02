import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'https://reilitics-be.herokuapp.com/api/';
// axios.defaults.headers =
// {
//   'Authorization': `Bearer ${localStorage.getItem('x-auth-token')}`,
//   // 'x-auth-token': localStorage.getItem('x-auth-token'),
//   'Content-Type': 'application/json'
// }
export const updateAuthorizationToken = (token) => {
  if (token) {
    console.log('old')
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    // axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept";
    console.log(axios.defaults.headers)
    // cachedAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else {
    console.log('new')
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('x-auth-token')}`;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    // axios.defaults.headers.common["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, Content-Type, Accept";
    // delete cachedAxios.defaults.headers.common["Authorization"];
  }
};
ReactDOM.render(
  <React.StrictMode>
    <App />
    {updateAuthorizationToken()}
  </React.StrictMode>,
  document.getElementById('root')
);

