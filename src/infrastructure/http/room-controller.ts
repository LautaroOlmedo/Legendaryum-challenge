import {Request, Response} from 'express';

// ---------- ---------- ---------- ---------- ----------

import {Room} from "../../domain/room";
import {RoomService} from "../../application/room-service";
import {CacheManager} from "../database/redis/redis";
import {MetaverseRoomService} from "../../application/metaverseRoom-service";

export class RoomController {
    constructor(private readonly metaverseRoomService: MetaverseRoomService, private readonly cacheManager: CacheManager) {
    }

    async getRoom(req: Request, res: Response){
        try{
            const {id} = req.params;
            const room = await this.metaverseRoomService.getOne(id)
            if (room instanceof Error) {
                return res.status(500).json({ error: 'Internal server error' });
            }else if (!room) {
                return res.status(404).json({ error: 'Room not found' });
            }

            return res.status(200).json(room);

        }catch (e) {
            console.log(e)
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}