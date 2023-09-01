
import {Coin} from "../domain/coin";
import {Room} from "../domain/room";
import {Area} from '../domain/room'
import {CoinService} from "./coin-services";
import {RoomRepository} from "../domain/room-repository";
import {MetaverseRoomDTO} from "./DTOs/metaverseRoom-dto";

export class MetaverseRoomService {
    constructor(
        private coinService: CoinService
    ) {}

    async createRoomWithCoins(
        metaverseRoomDTO: MetaverseRoomDTO
    ): Promise<void> {
        const {roomName, roomArea, coinQuantity} = metaverseRoomDTO
        const room: Room = new Room(roomName);

        const coins: Coin[] | Error = await this.coinService.generate(coinQuantity, roomArea);



    }
}

