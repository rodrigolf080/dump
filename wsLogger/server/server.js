const fs = require('fs')
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    fs.appendFile('logs/' + `${socket.id}`, `${socket.id}` + ':' + 'IP\n', (err => {
      if (err) {
        throw err;
      }
      console.log("Setup up file " + `${socket.id}`)
    }))
    socket.on('message', (message) =>   {
      fs.appendFile('logs/' + `${socket.id}`, `${message}` + '\n', (err) => {
        if (err){
          throw err;
        }
        console.log("Updated file " + `${socket.id}`)
      });
      io.emit('message', `${socket.id} => ${message}` );
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );


// Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => {

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });



