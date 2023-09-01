
import {Coin} from "../domain/coin";
import {Room} from "../domain/room";
import {Area} from '../domain/room'
import {CoinService} from "./coin-services";
import {RoomRepository} from "../domain/room-repository";

export class MetaverseRoomService {
    constructor(
        private coinService: CoinService
    ) {}

    async createRoomWithCoins(
        roomName: string,
        roomArea: { xmin: number; xmax: number; ymin: number; ymax: number; zmin: number; zmax: number },
        coinQuantity: number
    ): Promise<void> {
        const room: Room = new Room(roomName);

        const coins: Coin[] | Error = await this.coinService.generate(coinQuantity, roomArea);



    }
}

