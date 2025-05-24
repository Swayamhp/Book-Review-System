import express from 'express';
import { registerUser,loginUser, getuserData, updateUserData } from '../controller/user.controller.js';

const router = express.Router();

router.post('/register',registerUser);
router.post('/login', loginUser);
router.get('/users/:id',getuserData);
router.put('/users/:id',updateUserData);


export default router;