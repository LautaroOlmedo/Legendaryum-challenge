import cron from 'node-cron';

// ---------- ---------- ---------- ---------- ----------

import {MetaverseRoomService} from "../../application/metaverseRoom-service";


export class CoinCronJob {
    constructor(private readonly metaverseRoomService: MetaverseRoomService) {
        this.schedule = cron.schedule('0 * * * *', () => {
            console.log('Cron job programado para ejecutarse cada hora.');
        });
    }

    start(roomID: string): void {
        // Inicia el cron job con el ID de la sala
        this.schedule = cron.schedule('0 * * * *', async () => {
            try {
                const metaverseRoom = await this.metaverseRoomService.getOne(roomID)

                //await this.metaverseRoomService.delete()
               //await this.metaverseRoomService.


            } catch (e) {
                console.error("cron job error", e);
            }
        });


        this.schedule.start();
    }

    stop(): void {

        this.schedule.stop();
    }

    private schedule: cron.ScheduledTask;
}