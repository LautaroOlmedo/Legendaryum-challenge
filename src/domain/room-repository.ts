import {Room} from "./room";
import {Coin} from "./coin";

export interface IRoomRepository{
    getOne(roomID: string): Promise<Room | Error>
    create(room: Room, coins: Coin[]): Promise<Room | Error>
    //addCoinsToRoom(roomName: string, coins: Coin[]): Promise<any>
}