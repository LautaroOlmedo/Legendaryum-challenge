import {Room} from "../../../domain/room";
import {IRoomRepository} from "../../../domain/room-repository";
import {Coin} from "../../../domain/coin";
import {CacheManager} from "./redis";
import Redis from "ioredis";
export class RoomRepositoryRedis implements IRoomRepository{
    constructor(private readonly cacheManager: CacheManager) {
    }

    public async getOne(roomID: string): Promise<any>{
        try {
            const room: string | null = await this.client.get(`room:${roomID}`);
            //const room: string[] | null = await this.client.lrange(`room:${roomID}`, 0, 1)
            if (!room){
                return null;
            }
            return room;
        }catch (e) {
            console.error(e);
        }
    }
    public async create(room: Room, coins: Coin[]): Promise<Room | Error> {
        try {
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('No se pudo conectar a Redis');
            }

            const roomKey: string = `room:${room.getID()}`;
            const roomData: string = JSON.stringify(room);
            await this.client.set(roomKey, roomData);
            const  addCoins: void | Error = await this.addCoinsToRoom(roomKey, coins)
            if(addCoins instanceof Error){
                throw new Error('no se pudo agregar las monedas a la sala');
           }
            console.log(room)
            return room;
        } catch (e) {
            console.error('failed to load room', e);
            throw new Error('failed to load room');
        }
    }

    private async addCoinsToRoom(roomKey: string, coins: Coin[]): Promise<void | Error> {
        try{
            const coinKeys: string[] = coins.map((coin: Coin ): string => `coin:${coin.id}`);


            await this.client.rpush(roomKey, ...coinKeys);

            console.log(`Monedas agregadas a la sala en Redis`);
        }catch (e) {
            console.log(e);
            throw new Error('failed to load coins in room');
        }
    }

    private client: Redis = this.cacheManager.client;
}