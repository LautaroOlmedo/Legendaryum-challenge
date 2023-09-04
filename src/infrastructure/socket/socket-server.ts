import socketIo from 'socket.io';
import {Server as WebSocketServer} from 'socket.io'
import { Server as HttpServer } from 'http';
import express from 'express';
import {RoomService} from "../../application/room-service";

export class SocketServer {
    private io: socketIo.Server;

    constructor(httpServer: HttpServer) {
        this.io = new socketIo.Server(httpServer);
        this.setupSocketConnection();
    }

    public setupSocketConnection() {
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado:', socket.id);

            socket.on('client:joinRoom', data => {
                console.log(data)
                //const room = metaverseRoomService.getOne(data.room.id)
                socket.emit( "server:joinedRoom",`user ${data.user.name} joined the room`)

            });


            socket.on('collectCoin', (coinId) => {

            });
        });
    }
}
