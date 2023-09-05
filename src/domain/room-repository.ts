import {Room} from "./room";
import {Coin} from "./coin";

export interface IRoomRepository{
    create(roomName: string): Promise<Room | Error>
}