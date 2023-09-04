import Redis from 'ioredis'

export class CacheManager{

    public readonly client;
    constructor(url: string) {
        this.client = new Redis(url)

    }
    async connectIfNecessary(): Promise<void>{
        if(this.client.status === 'ready'){
            return;
        }
        await this.client.connect()
    }

    async isHealthy(): Promise<boolean>{
        try {
            await this.connectIfNecessary();
            this.client.ping;
            console.log("database is connected")
            return true;
        }catch (e) {
            console.log("failed to connect to the database")
            return false
        }
    }
}