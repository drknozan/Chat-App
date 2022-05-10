import './App.css';
import React, { useEffect, useState } from 'react';
import Chat from './Chat';

function App({ socket }) {
  const [userList, setUserList] = useState([]);
  const [username, setUsername] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const [writing, setWriting] = useState(false);
  const [alertUsername, setAlertUsername] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('username')) {
      socket.auth.username = localStorage.getItem('username');
      socket.connect();
    }
  }, [])

  socket.on("users", (users) => {
    users = users.filter(user => user !== socket.auth.username);
    setUserList([...users]);
  })

  socket.on("pm", ({message, toUsername, fromUsername}) => {
    setMessagesList([...messagesList, {message: message, to: toUsername, from: fromUsername}]);
    setWriting(false);
  })

  socket.on("writing", ({fromUsername}) => {
    if(selectedUser === fromUsername) {
        setWriting(true);
    }
  })

  socket.on("connect_error", (err) => {
    if(err.message === "username already taken") {
      setAlertUsername(true);
    }
  })

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    socket.auth.username = username;
    socket.connect();
  }

  if (socket.connected === true) {
    return (
      <div className="container">
        <div className="users-bar">
          {
            userList.map((user) => {
              return(
                <div className="users-bar__user" key={user} onClick={() => {setSelectedUser(user)}}>
                  {user}
                </div>
              )
            })
          }
        </div>
        { selectedUser &&
            <Chat selectedUser={selectedUser} socket={socket} messagesList={messagesList} setMessagesList={setMessagesList} writing={writing}/>
        }
      </div>
    )
  } else {
    return (
      <div className='register-container'>
        {
          alertUsername &&
            <b className='register-alert'>Username already taken.</b>
        }
        <form className='register-form' onSubmit={handleUsernameSubmit}>
          <input className='register-input' onChange={(e) => setUsername(e.target.value)}></input>
          <button className='register-button'>Enter</button>
        </form>
      </div>
    )
  }
}

export default App;
