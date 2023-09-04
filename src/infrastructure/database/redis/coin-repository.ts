import Redis from 'ioredis';

// ---------- ---------- ---------- ---------- ----------

import {Coin} from "../../../domain/coin";
import {ICoinRepository} from "../../../domain/coin-repository";
import {CacheManager} from "./redis";


export class CoinRepositoryRedis implements ICoinRepository{
    constructor(private readonly cacheManager: CacheManager) {
    }

    public async getAll(): Promise<Coin[] | Error> {
        //const client: Redis = this.cacheManager.client;

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

    public async generate(coin: Coin): Promise<Coin | Error> {
        //const client: Redis = this.cacheManager.client;
        try {
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('could not connect to Redis');
            }
            //await this.client.multi();

            const coinKey: string = `coin:${coin.id}`;
            const coinData: string = JSON.stringify(coin);

            const ttlInSeconds: number = 3600;
            await this.client.setex(coinKey, ttlInSeconds, coinData);


            await this.client.set(coinKey, coinData);
            await this.client.sadd('coins', coinKey);

            //const results = await this.client.exec();

            //if (!results.every((result) => result === 'OK')) {
              //  throw new Error('La transacción en Redis falló');
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