import {Coin} from "./coin";

export interface ICoinRepository{
    getAll(): Promise<Coin[] | Error>;
    generate(positionX: number, positionY: number, positionZ: number): Promise<Coin | Error>;
    delete(coinID: string): Promise <any>;
}