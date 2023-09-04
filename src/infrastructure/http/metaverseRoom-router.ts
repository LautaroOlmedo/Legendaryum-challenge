import express from 'express';
import {metaverseRoomController, roomController} from "../dependencies";

const metaverseRoomRouter: express.Router = express.Router();

metaverseRoomRouter.post('/', metaverseRoomController.create.bind(metaverseRoomController))


export { metaverseRoomRouter };