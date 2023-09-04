import {CoinRepositoryRedis} from "./database/redis/coin-repository";
import {CoinService} from "../application/coin-services";
import {RoomRepositoryRedis} from "./database/redis/room-repository";
import {RoomService} from "../application/room-service";
import {MetaverseRoomService} from "../application/metaverseRoom-service";
import {RoomController} from "./http/room-controller";
import {CacheManager} from "./database/redis/redis";
import {config} from "./config";
import {MetaverseRoomController} from "./http/metaverseRoom-controller";

const cacheManager: CacheManager = new CacheManager(config.redis.url)


const coinRepositoryRedis: CoinRepositoryRedis = new CoinRepositoryRedis(cacheManager);
const coinService: CoinService = new CoinService(coinRepositoryRedis)

const roomRepositoryRedis: RoomRepositoryRedis = new RoomRepositoryRedis(cacheManager);
const roomService: RoomService = new RoomService(roomRepositoryRedis);

const metaverseRoomService: MetaverseRoomService = new MetaverseRoomService(coinService, roomService);


export const roomController = new RoomController(roomService, cacheManager);
export const metaverseRoomController = new MetaverseRoomController(metaverseRoomService)
