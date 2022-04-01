import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'https://reilitics-be.herokuapp.com/api/';
axios.defaults.headers =
{
  'Authorization': `Bearer ${localStorage.getItem('x-auth-token')}`,
  // 'x-auth-token': localStorage.getItem('x-auth-token'),
  'Content-Type': 'application/json'
}
// export const updateAuthorizationToken = (token) => {
//   if (token) {
//     console.log('token', token)
//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//     // cachedAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//   } 
  // else {
  //   delete axios.defaults.headers.common["Authorization"];
  //   // delete cachedAxios.defaults.headers.common["Authorization"];
  // }
// };
ReactDOM.render(
  <React.StrictMode>
    <App />

  </React.StrictMode>,
  document.getElementById('root')
);

