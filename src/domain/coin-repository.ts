import {Coin} from "./coin";

export interface ICoinRepository{
    getAll(): Promise<Coin[] | Error>;
    generate(coin: Coin): Promise<Coin | Error>;
    delete(coinID: string): Promise <any>;
}