import {Coin} from "./coin";

export interface ICoinRepository{
    generate(coin: Coin): Promise<Coin | Error>
}