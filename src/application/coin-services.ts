import { v4 as uuidv4 } from 'uuid';

// ---------- ---------- ---------- ---------- ----------

import {ICoinRepository} from "../domain/coin-repository";
import {Coin} from "../domain/coin";


export class CoinService {
   constructor(private readonly repository: ICoinRepository) {
   }

   public async getAll(): Promise<Coin[] | Error>{
       try {
           const coins: Coin[] | Error = await this.repository.getAll();
           return coins;
       }catch (e) {
           console.log(e)
           throw new Error('internal server error')
       }
   }
   public async generate(coinQuantity: number, area: { xmin: number; xmax: number; ymin: number; ymax: number; zmin: number; zmax: number }): Promise<Coin[] | Error>{
      try {
          let coins: Coin[] = [];
          if(!this.validateQuantity(coinQuantity, area)){
              throw new Error('the three-dimensional area cannot contain this amount of coins')
          }

          for (let i: number = 0; i < coinQuantity; i++) {
              const coinID: string = uuidv4()
              const coin: Coin = new Coin(coinID);
              this.generateRandomPosition(coin, area)
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

   private generateRandomPosition(coin: Coin, roomArea: { xmin: number; xmax: number; ymin: number; ymax: number; zmin: number; zmax: number }): void{
       const {xmin, xmax, ymin, ymax, zmin, zmax} = roomArea
       coin.positionX = Math.round(xmin + Math.random() * (xmax - xmin));
       coin.positionY = Math.round(ymin + Math.random() * (ymax - ymin));
       coin.positionZ = Math.round(zmin + Math.random() * (zmax - zmin));
   }

   private validateQuantity(coinQuantity: number, roomArea: { xmin: number; xmax: number; ymin: number; ymax: number; zmin: number; zmax: number }): boolean{
       const {xmin, xmax, ymin, ymax, zmin, zmax} = roomArea
       const vol: number = (xmax - xmin + 1) * (ymax - ymin + 1) * (zmax - zmin + 1)
       if (vol < coinQuantity){
           return false;
       }
       return true;
   }

   private validatePosition(): void{}

    public async deleteCoin(sharedPositionX: number, sharedPositionY: number, sharedPositionZ: number): Promise<any>{
       try {
           const coins: Coin[] | Error  = await this.getAll();
           if(coins instanceof Error){
               throw new Error
           }

           for (let i = 0; i < coins.length; i++) {
               if(coins[i].positionX === sharedPositionX && coins[i].positionY === sharedPositionY && coins[i].positionZ === sharedPositionZ){
                   await this.repository.delete(coins[i].id);
               }
           }
           return null;
       }catch (e) {
           console.error('internal server error', e);
           throw new Error('internal server error');
       }
    }
}