import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();


const stripe = new Stripe(process.env.STRIPE_PAYMENT_KEY);

export default stripe;