import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { io } from 'socket.io-client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const URL = "http://localhost:5000";
const socket = io(URL, {auth: {username: ""}, autoConnect: false});

root.render(
  <div className='root-container'>
    <App socket={socket}/>
  </div>
);
