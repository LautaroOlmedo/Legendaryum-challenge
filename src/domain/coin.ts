export class Coin{
    constructor(id: string) {
        this.id = id;
        //this.coinName = coinName;
        this.positionX = 0;
        this.positionY = 0;
        this.positionZ = 0;
        this.collected= false;
    }

    private id: string
    private positionX: number
    private positionY: number
    private positionZ: number
    private collected: boolean

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

    getCollected(): boolean{
        return this.collected
    }
    public setCollected(): void{
        this.collected = true;
    }
}