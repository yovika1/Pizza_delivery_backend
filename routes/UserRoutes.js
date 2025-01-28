import express from 'express';
import { LoginOtp, verifyOtp } from '../controllers/User.js';

const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
    res.send("login successfully");
});

usersRouter.post('/send-otp',LoginOtp);
usersRouter.post('/verify',verifyOtp)


export default usersRouter;
