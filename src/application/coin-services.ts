import {ICoinRepository} from "../domain/coin-repository";
import {Coin} from "../domain/coin";
import {CoinDTO} from "./DTOs/coin-dto";

export class CoinService {
   constructor(private readonly repository: ICoinRepository) {
   }
   public async generate(coinQuantity: number, area: { xmin: number; xmax: number; ymin: number; ymax: number; zmin: number; zmax: number }): Promise<Coin[] | Error>{
      try {
          let coins: Coin[] = [];

          for (let i: number = 0; i < coinQuantity - 1; i++) {
              const coin: Coin = new Coin(i + 1);
              let generatedCoin: Coin | Error = await this.repository.generate(coin);
              if (generatedCoin instanceof Coin) {
                  coins.push(generatedCoin);
              }else {
                  throw new Error();
              }
          }
          this.generateRandomPosition(coins, area)
          return coins;
      }catch (e) {
          console.log(e)
          return Error('an error occurs when generating a currency')
      }
   }

   private generateRandomPosition(coins: Coin[], roomArea: { xmin: number; xmax: number; ymin: number; ymax: number; zmin: number; zmax: number }): void{
       const {xmin, xmax, ymin, ymax, zmin, zmax} = roomArea
       for (let i: number = 0; i < coins.length - 1; i++) {
           coins[i].positionX = (xmin + Math.random() * (xmax - xmin));
           coins[i].positionY = (ymin + Math.random() * (ymax - ymin));
           coins[i].positionZ = (zmin + Math.random() * (zmax - zmin));
       }
   }

   private validatePosition(): void{}

    public deleteCoin(): void{

    }


}