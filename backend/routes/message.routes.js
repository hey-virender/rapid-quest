import Router from 'express';
import { getAllChats } from '../controllers/message.controller.js';

const router = Router();

router.get("/chats/:user", getAllChats);

export default router;