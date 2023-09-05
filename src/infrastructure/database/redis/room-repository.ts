import Redis from "ioredis";
import { v4 as uuidv4 } from 'uuid';

// ---------- ---------- ---------- ---------- ----------

import {Room} from "../../../domain/room";
import {IRoomRepository} from "../../../domain/room-repository";
import {CacheManager} from "./redis";

export class RoomRepositoryRedis implements IRoomRepository{
    constructor(private readonly cacheManager: CacheManager) {
    }


    public async create(roomName: string): Promise<Room | Error> {
        try {
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('could not connect to Redis');
            }

            const roomID: string = uuidv4();
            const room: Room = new Room(roomID, roomName);

            //await this.client.multi();

            const roomKey: string = `room:${room.getID()}`;
            const roomData: string = JSON.stringify(room.getName());
            await this.client.rpush(roomKey, roomData);
            return room;
        } catch (e) {
            console.error('internal server error', e);
            throw new Error('internal server error');
        }
    }

    private client: Redis = this.cacheManager.client;
}