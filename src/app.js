const express = require('express');
const app = express();
const path = require('path') 
const socketio = require('socket.io');
const port = process.env.PORT || 3000
const http = require('http')
const server = http.createServer(app);
const io = socketio(server);
const Filter = require('bad-words');
const {genrateMessage,genrateLocation}=require('../public/utils/message');
const {addUser,removeUser,getUser,getUserInRoom} = require('../public/utils/users');
const { Admin } = require('mongodb');
const publicDiPath = path.join(__dirname,'../public');

io.on('connection',(socket)=>{
    // console.log("New web socketion")
    socket.on('join',(options,callback)=>{

        const {error , user} = addUser({id:socket.id , ...options});

        if(error){
            return callback(error)
        }
        socket.join(user.room);
        socket.emit('message',genrateMessage('Admin','Welcome!'))
        socket.broadcast.to(user.room).emit('message',genrateMessage('Admin',`${user.username} is joined!`))
        io.to(user.room).emit('roomData',{
            room:user.room,
            users: getUserInRoom(user.room)
        })
        callback();
    })

    socket.on('chatMessage',(message,callback)=>{
        const user = getUser(socket.id);
        const filter = new Filter();

        if(filter.isProfane(message)){
            return callback('Please use a clean message')
        }
        io.to(user.room).emit('message',genrateMessage(user.username,message))
        callback()
    })

    socket.on('sendLocation',(coords,cb)=>{
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage',genrateLocation(user.username,`http://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        cb();
    })
    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',genrateMessage('Admin',`${user.username} has left!`));
            io.to(user.room).emit('roomData',{
                room:user.room,
                users: getUserInRoom(user.room)
            })
        }
    })
})
app.use(express.static(publicDiPath));

server.listen(port,()=>{
    console.log(`Server running on ${port}`)
})