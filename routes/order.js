import express from "express";
import { createOrder, fetchOrder } from "../controllers/Order..js";
const orderRouter = express.Router()

orderRouter.post('/createOrder',createOrder);
orderRouter.get('/orderDetails', fetchOrder);

export default orderRouter;