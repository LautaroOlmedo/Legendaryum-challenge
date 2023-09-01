import Redis from 'redis';

// ---------- ---------- ---------- ---------- ----------

import {ICoinRepository} from "../../../domain/coin-repository";
import {Coin} from "../../../domain/coin";

export class CoinRepositoryRedis implements ICoinRepository{
    constructor() {


    }

    public async generate(coin: Coin): Promise<any> {
        try {
            
        }catch (e) {
            
        }
    }

}