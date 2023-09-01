import socketIo from 'socket.io';
import {Server as WebSocketServer} from 'socket.io'
import { Server as HttpServer } from 'http';
import express from 'express';

export class SocketServer {
    private io: socketIo.Server;

    constructor(httpServer: HttpServer) {
        this.io = new socketIo.Server(httpServer);
        this.setupSocketConnection();
    }

    public setupSocketConnection() {
        this.io.on('connection', (socket) => {
            console.log('Cliente conectado:', socket.id);
            // Manejar eventos de conexión, habitaciones, recolección de monedas, etc.

            // Ejemplo: Un cliente se une a una sala
            socket.on('joinRoom', (roomId) => {
                socket.join(roomId);
                // Lógica para notificar al cliente sobre las monedas disponibles en la sala
            });

            // Ejemplo: Un cliente recolecta una moneda
            socket.on('collectCoin', (coinId) => {
                // Lógica para marcar la moneda como no disponible y notificar a todos los clientes
            });
        });
    }
}
