export class Coin{
    constructor(id: string) {
        this.id = id;
        //this.coinName = coinName;
        this.positionX = 0;
        this.positionY = 0;
        this.positionZ = 0;
    }
    //public coinName: string;
    public id: string
    public positionX: number
    public positionY: number
    public positionZ: number

    public getID(): string{
        return this.id
    }

}