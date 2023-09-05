import {CoinRepositoryRedis} from "./database/redis/coin-repository";
import {CoinService} from "../application/coin-services";
import {RoomRepositoryRedis} from "./database/redis/room-repository";
import {RoomService} from "../application/room-service";
import {MetaverseRoomService} from "../application/metaverseRoom-service";
import {RoomController} from "./http/room-controller";
import {CacheManager} from "./database/redis/redis";
import {config} from "./config";
import {MetaverseRoomController} from "./http/metaverseRoom-controller";
import {CoinCronJob} from "./cronjob/coin-cronJob";
import { MetaverseRoomRepositoryRedis} from "./database/redis/metaverseRoom-repository";

const cacheManager: CacheManager = new CacheManager(config.redis.url)


const coinRepositoryRedis: CoinRepositoryRedis = new CoinRepositoryRedis(cacheManager);
const coinService: CoinService = new CoinService(coinRepositoryRedis)

const roomRepositoryRedis: RoomRepositoryRedis = new RoomRepositoryRedis(cacheManager);
const roomService: RoomService = new RoomService(roomRepositoryRedis);

const metaverseRoomRepositoryRedis: MetaverseRoomRepositoryRedis = new MetaverseRoomRepositoryRedis(cacheManager);
const metaverseRoomService: MetaverseRoomService = new MetaverseRoomService(coinService, roomService, metaverseRoomRepositoryRedis);

const coinCronJob: CoinCronJob = new CoinCronJob(coinService, roomService);

//const roomAreaDTO: RoomAreaDTO = new RoomAreaDTO();
//const metaverseRoomDTO: MetaverseRoomDTO = new MetaverseRoomDTO(roomAreaDTO);

export const roomController = new RoomController(metaverseRoomService, cacheManager);
export const metaverseRoomController = new MetaverseRoomController(metaverseRoomService);
