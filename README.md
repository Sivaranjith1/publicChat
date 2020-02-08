# A public chat using websocket
This is a public chat where the user can choose an anonymous username and chat with the other users. The focus on this project was the backend.

# packages
```json
    "body-parser": "^1.18.3",
    "express": "^4.16.3",
    "jsonwebtoken": "^8.3.0",
    "mongodb": "^3.5.2",
    "mongoose": "^5.1.6",
    "socket.io": "^2.1.1"
```

# socket paths
## status
send the status as a string ex. "writing"

## input
The message that should be sent when the user type as message.

The data is an object:
```js
data = {
    name: username, //username in string
    message: msg,   //the messagte typed by the user in string
}
```

## clear
Will clear the chat. No data