
export class Room{
    constructor(id: string, roomName: string) {
        this.id = id;
        this.roomName = roomName;
    }
    private id: string;
    private roomName: string;

    public getID(): string{
        return this.id;
    }

    public getName(): string{
        return this.roomName;
    }
}

