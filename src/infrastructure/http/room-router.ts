import express from 'express';
import {roomController} from "../dependencies";

const roomRouter: express.Router = express.Router();

roomRouter.get('/redis', roomController.run.bind(roomController))
roomRouter.get('/:id', roomController.getRoom.bind(roomController))


export { roomRouter };