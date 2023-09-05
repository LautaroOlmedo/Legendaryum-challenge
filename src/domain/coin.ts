export class Coin{
    constructor(id: string, positionX: number, positionY: number, positionZ: number) {
        this.id = id;
        //this.coinName = coinName;
        this.positionX = positionX;
        this.positionY = positionY;
        this.positionZ = positionZ;
    }

    private id: string
    private positionX: number
    private positionY: number
    private positionZ: number

    public getID(): string{
        return this.id
    }

    public getPositionX(): number{
        return this.positionX;
    }

    public getPositionY(): number{
        return this.positionY;
    }

    public getPositionZ(): number{
        return this.positionZ;
    }

    public setPositionX(x: number): void{
        this.positionX = x;
    }

    public setPositionY(y: number): void{
        this.positionY = y;
    }

    public setPositionZ(z: number): void{
        this.positionZ = z;
    }
}