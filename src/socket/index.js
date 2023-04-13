const onlineUsers = []

export const newConnectionHandler = socket => {
  // "connection" is NOT A CUSTOM EVENT. This is a socket.io event, it's triggered every time a new client connects!
  console.log("A new client connected! it's id is:", socket.id)
  // 1. Emit a "welcome" event to the connected client
  socket.emit("welcome", { message: `HELLO ${socket.id}` })

  // 2. Listen to an event emitted by FE called "setUsername", this event should contain the username in the payload
  socket.on("setUsername", payload => {
    console.log(payload)

    // 2.1 Whenever we receive the username, we have to keep track of it together with the socket.id
    onlineUsers.push({ username: payload.username, socketId: socket.id })

    // 2.2 Then we have to send the list of online users to the current user that just "logged in"
    socket.emit("loggedIn", onlineUsers)

    // 2.3 We have also to inform everybody else of the new user which just joined
    socket.broadcast.emit("updateOnlineUsersList", onlineUsers)
  })
}
