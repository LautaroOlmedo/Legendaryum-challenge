import {Room} from "../../../domain/room";
import {IRoomRepository} from "../../../domain/room-repository";
export class RoomRepositoryRedis implements IRoomRepository{
    public async create(room: Room): Promise<any> {
        return Promise.resolve(undefined);
    }

    public async getOne(roomID: number): Promise<any> {
        return Promise.resolve(undefined);
    }

}