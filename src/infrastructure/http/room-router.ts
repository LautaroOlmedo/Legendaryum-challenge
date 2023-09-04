import express from 'express';

// ---------- ---------- ---------- ---------- ----------

import {roomController} from "../dependencies";

const roomRouter: express.Router = express.Router();

roomRouter.get('/:id', roomController.getRoom.bind(roomController))

export { roomRouter };