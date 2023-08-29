import express, {Request, Response} from 'express';
import morgan from "morgan";
import cors from 'cors';

// ---------- ---------- ---------- ---------- ----------

export class ServerBootstrap{
    constructor() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        this.app.use(morgan('dev'))
        //this.app.use(cors());


        this.app.get('/', (req: Request, res: Response) => {
            res.status(200).json({message: "Hello World!!"})
        });

        this.listen();
    }

    public listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server listening on port ${this.port}`)
        });
    }

    public app: express.Application = express();
    private port: number = 8000;
}