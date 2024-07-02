import express from "express";
import { getAllPrompts, CreateNewPrompt, UpdatePrompt, DeletePrompt } from "../controllers/promptControllers.js";

const router = express.Router();

router.get('/', getAllPrompts); 

router.post('/', CreateNewPrompt); 

router.put('/update/:id', UpdatePrompt); 

router.delete('/delete/:id', DeletePrompt); 

export default router;