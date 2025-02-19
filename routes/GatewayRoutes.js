import express from 'express';
import { createCheckout } from '../controllers/Gateway.js';

const webhookRouter = express.Router();

webhookRouter.post('/create-checkout-session',createCheckout);


export default webhookRouter;