import {CoinRepositoryRedis} from "./database/redis/coin-repository";
import {CoinService} from "../application/coin-services";
import {RoomRepositoryRedis} from "./database/redis/room-repository";
import {RoomService} from "../application/room-service";
import {MetaverseRoomService} from "../application/metaverseRoom-service";
import {RoomController} from "./http/room-controller";


const coinRepositoryRedis: CoinRepositoryRedis = new CoinRepositoryRedis;
const coinService: CoinService = new CoinService(coinRepositoryRedis)

const roomRepositoryRedis: RoomRepositoryRedis = new RoomRepositoryRedis()
const roomService: RoomService = new RoomService(roomRepositoryRedis)

const metaverseRoomService: MetaverseRoomService = new MetaverseRoomService(coinService, roomService);



export const roomController = new RoomController();