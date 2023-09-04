import cron from 'node-cron';
import {CoinService} from "../../application/coin-services";
import {RoomService} from "../../application/room-service";


export class CoinCronJob {
    constructor(private readonly coinService: CoinService, private readonly roomService: RoomService) {

        this.schedule = cron.schedule('0 * * * *', async () => {
            try {

                const roomId = 'roomId'; // ID de la sala que deseas procesar

                // Elimina todas las monedas de la sala
                //await coinService.deleteCoinsInRoom(roomId);

                // Genera nuevas monedas para la sala
                //await coinService.generateCoinsForRoom(roomId);

                console.log('Se han eliminado y regenerado las monedas en la sala:', roomId);
            } catch (error) {
                console.error('Error en el cron job:', error);
            }
        });

        console.log('Cron job programado para ejecutarse cada hora.');
    }

    start(): void {
        // Inicia el cron job
        this.schedule.start();
    }

    stop(): void {
        // Detiene el cron job
        this.schedule.stop();
    }

    private schedule: cron.ScheduledTask;
}