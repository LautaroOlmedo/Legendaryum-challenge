import { v4 as uuidv4 } from 'uuid';

// ---------- ---------- ---------- ---------- ----------

import {IRoomRepository} from "../domain/room-repository";
import {Room} from "../domain/room";



export class RoomService{
    constructor(private readonly repository: IRoomRepository) {
    }

    async create(name: string): Promise<Room | Error>{
        try {
            const roomID: string = uuidv4();
            const room: Room = new Room(roomID, name);
            const generatedRoom: Room | Error = await this.repository.create(room);
            if (generatedRoom instanceof Room) {
                return generatedRoom;
            }else {
                throw new Error();
            }
        }catch (e) {
            console.log(e)
            throw new Error()
        }
    }
}