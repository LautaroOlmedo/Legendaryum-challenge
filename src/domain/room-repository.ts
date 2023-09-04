import {Room} from "./room";
import {Coin} from "./coin";

export interface IRoomRepository{
    getOne(roomID: string): any
    create(room: Room, coins: Coin[]): Promise<Room | Error>
}