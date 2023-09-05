import { v4 as uuidv4 } from 'uuid';

// ---------- ---------- ---------- ---------- ----------

import {ICoinRepository} from "../domain/coin-repository";
import {Coin} from "../domain/coin";
import {RoomAreaDTO} from "./DTOs/metaverseRoom-dto";


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
   public async generate(coinQuantity: number, area: RoomAreaDTO): Promise<Coin[] | Error>{

      try {
          if(!this.validateQuantity(coinQuantity, area)){
              throw new Error('the three-dimensional area cannot contain this amount of coins')
          }
          let coins: Coin[] = [];
          let x: number = 0;
          let y: number = 0;
          let z: number = 0;
          let coinArea = {positionX: 0, positionY: 0, positionZ: 0}

          for (let i: number = 0; i < coinQuantity; i++) {
              coinArea = this.generateCoinPosition(x, y, z, area);
              let generatedCoin: Coin | Error = await this.repository.generate(coinArea.positionX, coinArea.positionY, coinArea.positionZ);
              if (generatedCoin instanceof Coin) {
                  coins.push(generatedCoin);
              }else {
                  throw new Error('could not create the coin');
              }
          }
          return coins;
      }catch (e) {
          console.error('internal server error', e);
          throw new Error('internal server error');
      }
   }

   private generateCoinPosition(x: number, y: number, z: number, roomArea: RoomAreaDTO): any{
       const {xmin, xmax, ymin, ymax, zmin, zmax} = roomArea
       x = Math.round(xmin + Math.random() * (xmax - xmin));
       y = Math.round(ymin + Math.random() * (ymax - ymin));
       z = Math.round(zmin + Math.random() * (zmax - zmin));

       return  {
           x, y, z
       }

   }

   private validateQuantity(coinQuantity: number, roomArea: RoomAreaDTO): boolean{
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

           for (let i: number = 0; i < coins.length; i++) {
               if(coins[i].getPositionX() === sharedPositionX && coins[i].getPositionY() === sharedPositionY && coins[i].getPositionZ()=== sharedPositionZ){
                   await this.repository.delete(coins[i].getID());
               }
           }
           return null;
       }catch (e) {
           console.error('internal server error', e);
           throw new Error('internal server error');
       }
    }
}