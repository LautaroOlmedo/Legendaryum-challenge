import {Coin} from "./coin";
import {Room} from "./room";

export class MetaverseRoom{
    constructor( id: string, room: Room, coins: Coin[]) {
        this.id = id;
        this.room = room;
        this.coins = coins;
    }

    private id: string;
    private coins: Coin[];
    private room: Room;

    public getID(): string{
        return this.id;
    }

    public getRoom(): Room{
        return this.room
    }

    public getCoins(): Coin[]{
        return this.coins;
    }

    public SetCoins(coins: string[]): Coin[]{
        return this.coins;
    }
}