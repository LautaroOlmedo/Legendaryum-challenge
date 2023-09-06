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


    public async generate(coin: Coin): Promise<Coin | Error> {
        try {
            const isConnected: boolean = await this.cacheManager.isHealthy();
            if (!isConnected) {
                throw new Error('could not connect to Redis');
            }
            //await this.client.multi();

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

    public async collectCoin(coinID: string): Promise<null | Error> {
        try {
            const coinKey: string = `coin:${coinID}`;
            const coinData: string | null = await this.client.get(coinKey);
            if(!coinData){
                throw new Error('cannot found the coin');
            }
            const coinJSON = JSON.parse(coinData);
            const coin: Coin = new Coin(coinJSON.id)
            coin.setPositionX(coinJSON.positionX)
            coin.setPositionY(coinJSON.positionY)
            coin.setPositionZ(coinJSON.positionZ)


            coin.setCollected();
            console.log(coin)
            await this.client.set(`coin:${coin.getID()}`, JSON.stringify(coin));
            return null
        } catch (e) {
            console.error('error while deleting the coin:', e);
            throw new Error('internal server error');
        }
    }

    private client: Redis = this.cacheManager.client;



}