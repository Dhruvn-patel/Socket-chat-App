const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const socketio = require('socket.io');
const formatmsg = require('./msg');
//render all file set static path
app.use(express.static(path.join(__dirname, "public")))
const PORT = 4020 || process.env.PORT;
const server = http.createServer(app);
const io = socketio(server);
const { userJoin,
    getCurrUser,
    userLeave,getRoomUsers} = require('./users');
const msgbot = "chatbot";
//run client connects
io.on('connection', socket => {

    socket.on('joinrooms', ({ username, room }) => {
        const user=userJoin(socket.id,username,room);
        
        socket.emit('message', formatmsg(msgbot, 'Welcome to chat !!'))
        socket.join(user.room);

       
        //broadcast user connects
        socket.broadcast.to(user.room).emit('message',formatmsg(msgbot,`${user.username} joined  chat !`));
        
        io.to(user.room).emit('roomDetails',({
            room:user.room, 
            users:getRoomUsers(user.room)
        }));

    })


    //listen chatmsg
    socket.on('chatmsg', (msg) => {
        const user=getCurrUser(socket.id);

        io.to(user.room).emit('message', formatmsg(user.username, msg))
    })

    //disconnects msg
    socket.on('disconnect', () => {
        const user=userLeave(socket.id);
        if(user)
        {
            io.to(user.room).emit('message', formatmsg(msgbot, `${user.username} has left the chat ! `))

            io.to(user.room).emit('roomDetails',({
                room:user.room, 
                users:getRoomUsers(user.room)
            }));
        }
    })
})
//render msg one side to other 
server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})