import Redis from 'ioredis';

// ---------- ---------- ---------- ---------- ----------

import {Coin} from "../../../domain/coin";
import {Room} from "../../../domain/room";
import {CacheManager} from "./redis";
import {IMetaverseRoomRepository} from "../../../domain/metaverseRoom-repository";
import {MetaverseRoom} from "../../../domain/metaverseRoom";


export class MetaverseRoomRepositoryRedis implements IMetaverseRoomRepository{
    constructor(private readonly cacheManager: CacheManager) {
    }

    async getOneRoom(roomID: string): Promise<any>{
        try {
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('could not connect to Redis');
            }
            const roomKey: string = `room:${roomID}`;

            if(await this.client.exists(roomKey) === 0){
                return null
            }

            const roomName: string | null = await this.client.lindex(roomKey, 0);
            const coinKeys: string[] = await this.client.lrange(roomKey, 1, -1);

            return { room: roomID, roomName: roomName, coins: coinKeys };
        }catch (e) {
            console.error('internal server error', e);
            throw new Error('internal server error');
        }
    }

    async create(room: Room, coins: Coin[]): Promise<MetaverseRoom | Error> {
        try{
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('could not connect to Redis');
            }


            const roomKey: string = `room:${room.getID()}`;
            const  addCoins: void | Error = await this.addCoinsToRoom(roomKey, coins)
            if(addCoins instanceof Error){
                throw new Error('could not add coins to the room');
            }

            const roomWhitCoins: MetaverseRoom = new MetaverseRoom(room.getID(), room, coins)
            return roomWhitCoins

        }catch (e) {
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

            const coinKeys: string[] = coins.map((coin: Coin ): string => `coin:${coin.getID()}`);
            await this.client.rpush(roomKey, ...coinKeys);
        }catch (e) {
            console.error('internal server error', e);
            throw new Error('internal server error');
        }
    }

    private client: Redis = this.cacheManager.client;
}