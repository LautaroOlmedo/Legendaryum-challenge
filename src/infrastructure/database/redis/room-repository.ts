import Redis from "ioredis";

// ---------- ---------- ---------- ---------- ----------

import {Room} from "../../../domain/room";
import {IRoomRepository} from "../../../domain/room-repository";
import {Coin} from "../../../domain/coin";
import {CacheManager} from "./redis";

export class RoomRepositoryRedis implements IRoomRepository{
    constructor(private readonly cacheManager: CacheManager) {
    }

    public async getOne(roomID: string): Promise<any>{
        try {
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('could not connect to Redis');
            }

            const roomKey: string = `room:${roomID}`;
            const coinKeys: string[] = await this.client.lrange(roomKey, 1, -1);

            return { room: roomID, coins: coinKeys };
        }catch (e) {
            console.error('internal server error', e);
            throw new Error('internal server error');
        }
    }
    public async create(room: Room, coins: Coin[]): Promise<Room | Error> {
        try {
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('could not connect to Redis');
            }

            //await this.client.multi();

            const roomKey: string = `room:${room.getID()}`;
            const roomData: string = JSON.stringify(room);
            await this.client.rpush(roomKey, roomData);
            const  addCoins: void | Error = await this.addCoinsToRoom(roomKey, coins)
            if(addCoins instanceof Error){
                throw new Error('could not add coins to the room');
           }
            console.log(room)

            //const results = await this.client.exec();

            //if (!results.every((result) => result === 'OK')) {
            //  throw new Error('the transaction failed');
            //}
            return room;
        } catch (e) {
            console.error('internal server error', e);
            throw new Error('internal server error');
        }
    }
    private async addCoinsToRoom(roomKey: string, coins: Coin[]): Promise<void | Error> {
        try{
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('could not connect to Redis');
            }

            const coinKeys: string[] = coins.map((coin: Coin ): string => `coin:${coin.id}`);
            await this.client.rpush(roomKey, ...coinKeys);
        }catch (e) {
            console.error('internal server error', e);
            throw new Error('internal server error');
        }
    }

    private client: Redis = this.cacheManager.client;
}