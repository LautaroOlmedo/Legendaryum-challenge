import Redis from 'redis';

// ---------- ---------- ---------- ---------- ----------


import {Coin} from "../../../domain/coin";
import {ICoinRepository} from "../../../domain/coin-repository";


export class CoinRepositoryRedis implements ICoinRepository{
    constructor() {
    }

    public async getAll(): Promise<any> {
        return Promise.resolve(undefined);
    }

    public async generate(coin: Coin): Promise<any> {
        try {
            
        }catch (e) {
            
        }
    }

    delete(coinID: string): Promise<any> {
        return Promise.resolve(undefined);
    }



}