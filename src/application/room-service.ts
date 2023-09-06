

// ---------- ---------- ---------- ---------- ----------

import {IRoomRepository} from "../domain/room-repository";
import {Room} from "../domain/room";
import {Coin} from "../domain/coin";



export class RoomService{
    constructor(private readonly repository: IRoomRepository) {
    }

    async create(roomName: string): Promise<Room | Error>{
        try {

            const generatedRoom: Room | Error = await this.repository.create(roomName);

            if (generatedRoom instanceof Error) {
                throw new Error('could not create the room');
            }
            return generatedRoom;

        }catch (e) {
            console.error('internal server error', e);
            throw new Error('internal server error');
        }
    }
}