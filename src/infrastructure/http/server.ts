import express, { Request, Response } from 'express';
import morgan from "morgan";
import http from 'http';
import {SocketServer} from "../socket/socket-server";

// ---------- ---------- ---------- ---------- ----------

import {config} from '../config';
import { roomRouter } from "./room-router";
import {metaverseRoomRouter} from "./metaverseRoom-router";



const {port} = config.server;

const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/api/room', roomRouter);
app.use('/api/metaverseRoom', metaverseRoomRouter);


let server: http.Server;
server = http.createServer(app);
const socketServer: SocketServer = new SocketServer(server);
socketServer.setupSocketConnection();

export const serverBootstrap = (): void =>{
    server.listen(port, (): void => {
        console.log(`Server listening on port ${port}`);
    });
}






