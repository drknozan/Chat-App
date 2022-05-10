import React, { useState } from 'react';

const Chat = ({ selectedUser, socket, messagesList, setMessagesList, writing }) => {
    const [message, setMessage] = useState('');

    const handleMessageSubmit = (e) => {
        e.preventDefault();
        socket.emit("pm", {
            message: message,
            toUsername: selectedUser,
            fromUsername: socket.auth.username
        });
        setMessagesList([...messagesList, {message: message, to: selectedUser}]);
        document.querySelector('.chat-area__form__input').value = '';
    }

    const handleWriting = (e) =>{
        setMessage(e.target.value);
        socket.emit("writing", selectedUser);
    }

    return(
            <div className="chat-area">
                <div className="chat-area__user-info">
                    {selectedUser}
                    {
                        writing &&
                            <b className="chat-area__user-info__writing">Writing...</b>
                    }
                </div>
                <div className="chat-area__messages">
                    {
                        messagesList.map((m, i) => {
                            if(m.to === selectedUser) {
                                return(<div className="chat-area__messages__sent" key={i}>{m.message}</div>)
                            }else if(m.to === socket.auth.username && m.from === selectedUser) {
                                return(<div className="chat-area__messages__received" key={i}>{m.message}</div>)
                            }
                        })
                    }
                </div>
                <form className="chat-area__form" onSubmit={handleMessageSubmit}>
                    <input className="chat-area__form__input" type="text" onChange={handleWriting}></input>
                    <button className="chat-area__form__button">Send</button>
                </form>
            </div>
        )
}

export default Chat