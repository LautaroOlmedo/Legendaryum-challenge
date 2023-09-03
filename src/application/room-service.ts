import { v4 as uuidv4 } from 'uuid';

// ---------- ---------- ---------- ---------- ----------

import {IRoomRepository} from "../domain/room-repository";
import {Room} from "../domain/room";
import {Coin} from "../domain/coin";



export class RoomService{
    constructor(private readonly repository: IRoomRepository) {
    }

    async getOne(roomID: string):Promise<Room | Error>{
        try {
            const room: Room | Error = await this.repository.getOne(roomID);
            return room;
        }catch (e) {
            console.log(e)
            throw new Error('internal server error')
        }
    }

    async create(name: string, coins: Coin[]): Promise<Room | Error>{
        try {
            const roomID: string = uuidv4();
            const room: Room = new Room(roomID, name);
            const generatedRoom: Room | Error = await this.repository.create(room, coins);
            if (generatedRoom instanceof Room) {
                return generatedRoom;
            }else {
                throw new Error('no se pudo crear la room');
            }
        }catch (e) {
            console.log(e)
            throw new Error()
        }
    }
}