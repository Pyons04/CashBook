const fs = require('fs');
const express = require('express');
const http = require('http')
const connection = require('./mySqlConnection');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.set({'Content-Type': 'text/html'});
  res.sendFile('./dist/index.html')
})


const MAX_MESSAGES_SIZE = 30;
const data = {messages: []};

io.sockets.on('connection', (socket) => {
  // ----------------------------------------------------------------------
  // 2-1. クライアントの描画処理を呼ぶ.
  // ----------------------------------------------------------------------
  socket.emit('setView', data);
  // ----------------------------------------------------------------------
  // 2-2. クライアントから送信されたメッセージをサーバーにて保存する処理.
  // ----------------------------------------------------------------------
  socket.on('saveData', (dataByClient) => {
    data.messages.unshift(dataByClient.message);
    if (data.messages.length > MAX_MESSAGES_SIZE) {
      data.messages.splice(data.messages.length - 1);
    }
    console.log(data.messages)
    io.sockets.emit('setView', data);
  });
});

server.listen(8000);
