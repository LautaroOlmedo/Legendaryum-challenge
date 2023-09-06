
import {MetaverseRoom} from "./metaverseRoom";
import {Room} from "./room";
import {Coin} from "./coin";


export interface IMetaverseRoomRepository{
    create( room: Room, coins: Coin[]): Promise<MetaverseRoom | Error>
    getOneRoom(roomID: string): Promise<MetaverseRoom | Error>
}