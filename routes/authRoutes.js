import express from "express";
import { getAuth, RegisterNewUser, LoginUser , UpdateUser, DeleteUser } from "../controllers/authControllers.js";
import authentication from "../middlewares/authentication.js";


const router = express.Router();

router.get('/', authentication, getAuth); 

router.post('/register', RegisterNewUser);

router.post('/login', LoginUser);

router.put('/update/:id', UpdateUser); 

router.delete('/delete/:id', DeleteUser); 

export default router;