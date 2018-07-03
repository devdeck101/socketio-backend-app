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