import * as io from 'socket.io-client'

const socket = io.connect();
const sendButton = document.querySelector('#sendButton');

sendButton.addEventListener('click', () => {
  const message = document.querySelector('input#text').value;
  const sendData = {
    message
  };
  socket.emit('saveData', sendData);
});

socket.on('setView', (dataByServer, serverFunction) => {
  const view = document.querySelector('#view');
  view.innerHTML = '';
  view.innerHTML = dataByServer.messages.join('<br />');
});
