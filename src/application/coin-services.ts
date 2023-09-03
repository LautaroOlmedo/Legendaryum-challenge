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

          for (let i: number = 0; i < coinQuantity; i++) {
              const coinID: string = uuidv4()
              const coin: Coin = new Coin(coinID);
              let generatedCoin: Coin | Error = await this.repository.generate(coin);
              if (generatedCoin instanceof Coin) {
                  coins.push(generatedCoin);
              }else {
                  console.error('error when generating a coin:', generatedCoin);
                  return new Error('error when generating a coin');
              }
          }
          this.generateRandomPosition(coins, area)
          return coins;
      }catch (e) {
          console.log(e)
          return new Error('Internal server error');
      }
   }

   private generateRandomPosition(coins: Coin[], roomArea: { xmin: number; xmax: number; ymin: number; ymax: number; zmin: number; zmax: number }): void{
       const {xmin, xmax, ymin, ymax, zmin, zmax} = roomArea
       for (let i: number = 0; i < coins.length; i++) {
           coins[i].positionX = (xmin + Math.random() * (xmax - xmin));
           coins[i].positionY = (ymin + Math.random() * (ymax - ymin));
           coins[i].positionZ = (zmin + Math.random() * (zmax - zmin));
       }
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
           console.log(e)
           throw new Error('internal server error')
       }
    }
}