import express from 'express';
import { createCheckout, handleStripeWebhook } from '../controllers/Gateway.js';

const router = express.Router();

router.post('/create-checkout-session',createCheckout);

router.post(
    "webhook",
    express.raw({
        type:'application/json'
    }),
    handleStripeWebhook
)
export default router;