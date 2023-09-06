import express from 'express';
import {metaverseRoomController, roomController} from "../dependencies";

const metaverseRoomRouter: express.Router = express.Router();

metaverseRoomRouter.post('/', metaverseRoomController.create.bind(metaverseRoomController))
metaverseRoomRouter.delete('/', metaverseRoomController.delete.bind(metaverseRoomController))


export { metaverseRoomRouter };