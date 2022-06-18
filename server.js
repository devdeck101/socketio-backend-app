const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const PORT = 4000

const app = express()

const server = http.createServer(app)

//create the socket using the service instance
const io = socketIO(server)

io.on('connection', socket => {
    console.log('New user connected.')

    socket.on('infoEvent', (information) => {
        console.log(`Information received: ${information}`)
        io.sockets.emit('infoEvent', information)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(PORT, () => console.log(`Listening server on port ${PORT}`))


// var WebSocketServer = require('websocket').server;
// var http = require('http');

// //Porta que o server irá escutar
// const port = 4000;

// //Cria o server
// var server = http.createServer();


// //Server irá escutar na porta definida em 'port'
// server.listen(port, () => {
//     //Server está pronto
//     console.log(`Server está executando na porta ${port}`);
// });

// //Cria o WebSocket server
// wsServer = new WebSocketServer({
//   httpServer: server
// });


// //Chamado quando um client deseja conectar
// wsServer.on('request', (request) => {
//     //Estado do led: false para desligado e true para ligado
//     let state = false;

//     //Aceita a conexão do client
//     let client = request.accept(null, request.origin);

//     //Chamado quando o client envia uma mensagem
//     client.on('message', (message) => {
//         //Se é uma mensagem string utf8
//         if (message.type === 'utf8') {
//             //Mostra no console a mensagem
//             console.log(message.utf8Data);
//         }
//     });


//   //Cria uma função que será executada a cada 1 segundo (1000 millis) para enviar o estado do led
//   let interval = setInterval(() => {
//     //Envia para o client "ON" ou "OFF" dependendo do estado atual da variável state
//     client.sendUTF(state? "ON" : "OFF");
//     //Inverte o estado
//     state = !state;
// }, 1000);//Tempo entre chamadas => 1000 millis = 1 segundo 

// //Chamado quando a conexão com o client é fechada
// client.on('close', () => {
//     console.log("Conexão fechada");
//     //Remove o intervalo de envio de estado
//     clearInterval(interval);
// });
// });
