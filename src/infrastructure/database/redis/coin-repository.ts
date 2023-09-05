import Redis from 'ioredis';

// ---------- ---------- ---------- ---------- ----------

import {Coin} from "../../../domain/coin";
import {ICoinRepository} from "../../../domain/coin-repository";
import {CacheManager} from "./redis";
import {RoomAreaDTO} from "../../../application/DTOs/metaverseRoom-dto";
import {v4 as uuidv4} from "uuid";


export class CoinRepositoryRedis implements ICoinRepository{
    constructor(private readonly cacheManager: CacheManager) {
    }

    public async getAll(): Promise<Coin[] | Error> {
       try {
           const coinKeys: string[] = await this.client.smembers('coins');
           const coins: Coin[] = [];
           for (const coinKey of coinKeys) {
               const coinData: string | null = await this.client.get(coinKey);
               if (coinData) {
                   coins.push(JSON.parse(coinData));
               }
           }
           return coins;
       }catch (e) {
           console.error('internal server error', e);
           throw new Error('internal server error');
       }
    }

    public async generate(positionX: number, positionY: number, positionZ: number): Promise<Coin | Error> {
        try {
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('could not connect to Redis');
            }
            //await this.client.multi();
            const coinID: string = uuidv4()
            const coin: Coin = new Coin(coinID, positionX, positionY, positionZ);

            const coinKey: string = `coin:${coin.getID()}`;
            const coinData: string = JSON.stringify(coin);

            const ttlInSeconds: number = 3600;
            await this.client.setex(coinKey, ttlInSeconds, coinData);


            await this.client.set(coinKey, coinData);
            await this.client.sadd('coins', coinKey);

            //const results = await this.client.exec();

            //if (!results.every((result) => result === 'OK')) {
              //  throw new Error('the transaction failed');
            //}
            return coin;
        }catch (e) {
            console.error('internal server error', e);
            throw new Error('internal server error');
        }
    }


    delete(coinID: string): Promise<any> {
        return Promise.resolve(undefined);
    }

    private client: Redis = this.cacheManager.client;



}