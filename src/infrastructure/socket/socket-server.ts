import socketIo from 'socket.io';
import { Server as HttpServer } from 'http';
import {MetaverseRoomService} from "../../application/metaverseRoom-service";

// ---------- ---------- ---------- ---------- ----------


export class SocketServer {
    private io: socketIo.Server;
    // private readonly metaverseRoomService: MetaverseRoomService

    constructor(httpServer: HttpServer, ) {
        this.io = new socketIo.Server(httpServer);
        this.setupSocketConnection();
    }

    public setupSocketConnection(): void {
        this.io.on('connection', (socket) => {
           socket.on("client:joinServer", (username: string): void =>{
               const user = {
                   username,
                   id: socket.id
               }
               socket.emit('server:hello', 'can you hear me?', 1, 2, 'abc');
           });

           socket.on("client:createRoom", async ({roomName, coinsQuantity, roomArea}): Promise<void> => {

               //if((await this.metaverseRoomService.createRoomWithCoins(roomName, roomArea, coinsQuantity) !== null)){
               //    socket.emit("server:roomCreated", `Sala ${roomName} creada con éxito`);
              // };
               socket.emit('server:createdRoomError', 'Error en la creación de la sala');
           });

           socket.on("client:joinRoom", async (roomID: string, username: string): Promise<void> =>{
               //if(await this.metaverseRoomService.getOne(roomID)){
               //   socket.join(roomID);
               //    socket.to(roomID).emit("server:connectedToRoom", `user ${username} is connected`);
               //}
           });

           socket.on("client:collectCoin", async (roomName, positionX: number, positionY: number, positionZ: number): Promise<void> =>{
               // if (metaverseRoomService.collectedCoin(positionX, positionY, positionZ)){
               //     socket.to(roomName).emit("server:collectedCoin", `coin ${1} is collected`);
               // };
               //socket.emit('server:collectedCoinError', 'mistake collecting the coin');
           })
        });
    }
}
