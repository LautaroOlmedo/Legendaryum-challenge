import {Room} from "./room";

export interface IRoomRepository{
    getOne(roomID: number): Promise<Room | Error>
    create(room: Room): Promise<Room | Error>
}