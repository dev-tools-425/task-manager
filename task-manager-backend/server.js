require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/user', require('./routes/user'));
app.use('/api/task', require('./routes/task'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));
// Socket.IO connection
const http = require('http').Server(app);
const io = require('socket.io')(http,{
    cors: {
        origins: ['http://localhost:4200']
    }
});
http.listen(7001, '::1', function () {
console.log("scoket is listing on port 7001")
});
io.on('connection', (socket) => {
    console.log('A user connected');
    // Send the initial task list to the new client
    // socket.emit('taskUpdated', tasks);
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});
exports.socketIO = io;
