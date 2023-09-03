
import {Coin} from "../domain/coin";
import {Room} from "../domain/room";
import {CoinService} from "./coin-services";
import {RoomService} from "./room-service";
import {MetaverseRoomDTO} from "./DTOs/metaverseRoom-dto";

export class MetaverseRoomService {
    constructor(
        private coinService: CoinService,
        private readonly roomService: RoomService
    ) {}

    async createRoomWithCoins(
        metaverseRoomDTO: {roomName: string, roomArea: { xmin: number; xmax: number; ymin: number; ymax: number; zmin: number; zmax: number }, coinQuantity: number}
    ): Promise<null | Error> {
        try {
            const {roomName, roomArea, coinQuantity} = metaverseRoomDTO

            const coins: Coin[] | Error = await this.coinService.generate(coinQuantity, roomArea);
            if(coins instanceof Error){
                throw new Error('failed to create coins')
            }
            const room: Room | Error = await this.roomService.create(roomName, coins)

            if(room instanceof Error){
                throw new Error('failed to create room')
            }
            console.log('room and coins generate whit exit!!')
            return null;
        }catch (e) {
            console.log(e)
            return Error('internal server error');
        }
    }


    async collectedCoin(positionX: number, positionY: number, positionZ: number): Promise<any>{
        try {
            const collectedCoin = await this.coinService.deleteCoin(positionX, positionY, positionZ);
        }catch (e) {
            console.log(e);
            return Error('internal server error');
        }
    }
}

