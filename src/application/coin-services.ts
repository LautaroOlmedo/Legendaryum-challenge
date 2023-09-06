import { v4 as uuidv4 } from 'uuid';

// ---------- ---------- ---------- ---------- ----------

import {ICoinRepository} from "../domain/coin-repository";
import {Coin} from "../domain/coin";
import {RoomAreaDTO} from "./DTOs/metaverseRoom-dto";


export class CoinService {
   constructor(private readonly repository: ICoinRepository) {
   }

   public async generate(coinQuantity: number, area: RoomAreaDTO): Promise<Coin[] | Error>{

      try {
          if(!this.validateQuantity(coinQuantity, area)){
              throw new Error('the three-dimensional area cannot contain this amount of coins')
          }
          let coins: Coin[] = [];

          for (let i: number = 0; i < coinQuantity; i++) {
              const coinID: string = uuidv4()
              const coin: Coin = new Coin(coinID);
              this.generateCoinPosition(coin, area)
              let generatedCoin: Coin | Error = await this.repository.generate(coin);
              if (generatedCoin instanceof Coin) {
                  coins.push(generatedCoin);
              }else {
                  return new Error('could not create the coin');
              }
          }
          return coins;
      }catch (e) {
          console.error('internal server error', e);
          throw new Error('internal server error');
      }
   }

   private generateCoinPosition(coin: Coin, roomArea: RoomAreaDTO): void{
       const {xmin, xmax, ymin, ymax, zmin, zmax} = roomArea
       coin.setPositionX( Math.round(xmin + Math.random() * (xmax - xmin)));
       coin.setPositionY( Math.round(ymin + Math.random() * (ymax - ymin)));
       coin.setPositionZ(Math.round(zmin + Math.random() * (zmax - zmin)));
   }


    private validateQuantity(coinQuantity: number, roomArea: RoomAreaDTO): boolean{
       const {xmin, xmax, ymin, ymax, zmin, zmax} = roomArea
       const vol: number = (xmax - xmin + 1) * (ymax - ymin + 1) * (zmax - zmin + 1)
       if (vol < coinQuantity){
           return false;
       }else if(coinQuantity <= 0){
           return false;
       }
       return true;
   }

   public async collectCoin(coinID: string): Promise <null | Error>{
       return this.repository.collectCoin(coinID);
   }

   private validatePosition(): void{}

}