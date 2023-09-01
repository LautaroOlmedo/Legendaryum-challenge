import {RoomController} from "./http/room-controller";
import {CoinService} from "../application/coin-services";
import {MetaverseRoomService} from "../application/metaverseRoom-service";
import {CoinRepositoryRedis} from "./database/redis/coin-repository";


const coinRepository = new CoinRepositoryRedis
const coinService = new CoinService(coinRepository)
const metaverseRoomService = new MetaverseRoomService(coinService)


export const roomController = new RoomController();