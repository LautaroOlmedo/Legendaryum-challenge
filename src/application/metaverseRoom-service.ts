

// ---------- ---------- ---------- ---------- ----------

import {Coin} from "../domain/coin";
import {Room} from "../domain/room";
import {CoinService} from "./coin-services";
import {RoomService} from "./room-service";
import {MetaverseRoomDTO, RoomAreaDTO} from "./DTOs/metaverseRoom-dto";
import {MetaverseRoomRepositoryRedis} from "../infrastructure/database/redis/metaverseRoom-repository";
import {MetaverseRoom} from "../domain/metaverseRoom";

export class MetaverseRoomService {
    constructor(
        private coinService: CoinService,
        private readonly roomService: RoomService,
        private readonly metaverseRoomRepository: MetaverseRoomRepositoryRedis
    ) {}

    async getOne(roomID: string):Promise<any>{
        try {
            const metaverseRoom: MetaverseRoom | Error = await this.metaverseRoomRepository.getOneRoom(roomID);
            if (metaverseRoom instanceof Error) {
                throw new Error('could not found the room');
            }
            return metaverseRoom;
        }catch (e) {
            console.error('internal server error', e);
            throw new Error('internal server error');
        }
    }

    async createRoomWithCoins(
         roomName: string, roomArea: RoomAreaDTO, coinQuantity: number
    ): Promise<null | Error> {
        try {
            const coins: Coin[] | Error = await this.coinService.generate(coinQuantity, roomArea);
            if(coins instanceof Error){
                throw new Error('failed to create coins')
            }
            const room: Room | Error = await this.roomService.create(roomName)

            if(room instanceof Error){
                throw new Error('failed to create room')
            }
            const metaverseRoom: MetaverseRoom | Error = await this.metaverseRoomRepository.create(room, coins)
            if(metaverseRoom instanceof Error){
                throw new Error('failed to create metaverseRoom')
            }
            console.log('room and coins generate whit exit!!')
            return null;
        }catch (e) {
            console.log(e)
            return Error('internal server error');
        }
    }

    async collectedCoin(roomID: string, positionX: number, positionY: number, positionZ: number): Promise<null | Error>{
        try {
            const metaverseRoom: MetaverseRoom | Error = await this.metaverseRoomRepository.getOneRoom(roomID);

            if(metaverseRoom instanceof Error){
                throw new Error('cannot find the room')
            }
            for (let i: number = 0; i < metaverseRoom.getCoins().length; i++) {
                if(metaverseRoom.getCoins()[i].getPositionX() === positionX && metaverseRoom.getCoins()[i].getPositionY() === positionY && metaverseRoom.getCoins()[i].getPositionZ()=== positionZ){
                    const coinDeleted: Error | null = await this.coinService.collectCoin(metaverseRoom.getCoins()[i].getID());
                    if(coinDeleted instanceof Error){
                        throw new Error('cannot collect the coin');
                    }
                }
            }
            return null;
        }catch (e) {
            console.log(e);
            return Error('internal server error');
        }
    }
}

