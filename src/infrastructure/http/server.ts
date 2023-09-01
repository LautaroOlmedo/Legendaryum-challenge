import express, { Request, Response } from 'express';
import morgan from "morgan";
import http from 'http';

import path from 'path'

// --------------------------------------------------------

import { roomRouter } from "./room-router";
import {SocketServer} from "../socket/socket-server";
import {config} from '../config';


const {port} = config.server;

const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api/room', roomRouter);


let server: http.Server;
server = http.createServer(app);
const socketServer: SocketServer = new SocketServer(server);
socketServer.setupSocketConnection();

export const serverBootstrap = (): void =>{
    server.listen(port, (): void => {
        console.log(`Server listening on port ${port}`);
    });
}






