# :envelope: Chat App

I built this simple chat app to learn Socket.io. I added some features like choosing username, displaying online users, sending and receiveing private messages, "user is writing" notification.

## Features

![](/img/chatapp.gif)

> User must choose unique username to enter the chat app. Usernames are stored in localStorage. If user has any username in localStorage, chat page opens directly.

> If user chooses an username that has already been chosen by someone else before, app displays warning message "Username already taken.".

> Online users are listed on the left side.

> When user clicks any username on the online users list, messaging page opens. User can send and receive private message.

> When user is typing, messaging page displays "Writing..." under the username.

## :rocket: Run

To run this app on your local machine:

1. Clone the repo.
2. Install required dependencies and start server:
```
cd server
npm install
node server.js
```
3. Install required dependencies and start React app:
```
cd client
npm install
npm start
```
4. You can view the app on http://localhost:3000

## :hammer_and_wrench: Tools

* Socket.io
* Node.js
* Express
* React

## :books: To Learn More

* Socket.io: https://socket.io/
* Node.js: https://nodejs.org/en/
* Express: https://expressjs.com/
* React: https://reactjs.org/
* Create-React-App: https://create-react-app.dev/
