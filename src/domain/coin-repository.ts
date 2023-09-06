import {Coin} from "./coin";

export interface ICoinRepository{
    generate(coin: Coin): Promise<Coin | Error>;
    collectCoin(coinID: string): Promise <null | Error>;
}