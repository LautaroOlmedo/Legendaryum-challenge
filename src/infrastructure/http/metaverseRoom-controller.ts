import {Request, Response} from 'express'

// ---------- ---------- ---------- ---------- ----------

import {MetaverseRoomService} from "../../application/metaverseRoom-service";
import {MetaverseRoomDTO} from "../../application/DTOs/metaverseRoom-dto";

export class MetaverseRoomController{
    constructor(private readonly metaverseService: MetaverseRoomService) {
    }

    async create(req: Request, res: Response): Promise<any>{
        try {
            const {roomName, roomArea, coinQuantity} = req.body
            const roomWhitCoins = {roomName, roomArea, coinQuantity}
            roomWhitCoins.roomName = roomName;
            roomWhitCoins.roomArea = roomArea;
            roomWhitCoins.coinQuantity = coinQuantity
            const response = await this.metaverseService.createRoomWithCoins(roomWhitCoins)

            if (response instanceof Error){
                res.status(500).send('ERROR')
            }else{
                res.status(201).send('successful')
            }



        }catch (e) {
            console.error(e)
            return e
        }
    }
}