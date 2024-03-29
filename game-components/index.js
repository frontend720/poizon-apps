const express = require('express')
const app = express()
const server = require("http").createServer(app);
const io = require('socket.io')(server, {cors: {origin:  "*"}})

app.set("view engine", "ejs")
app.get("/home", (req, res) => {
    res.render("home")
} )

io.on('connection', (socket) => {
   console.log(`${socket.id} has entered room`)

   socket.on("room", (data) => {  
    socket.broadcast.emit("room", data)
   })
})


server.listen(4500, ()=> {
    console.log("listening on port 4500")
})
