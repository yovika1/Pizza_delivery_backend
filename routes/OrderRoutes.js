import express from "express";
import { autoUpdatesOrders, createOrder } from "../controllers/Order..js";
import { pizzaBuilder } from "../controllers/PizzaBuilder.js";

export const orderRouter = express.Router()
export const customRouter = express.Router();

orderRouter.post('/createOrder',createOrder);
orderRouter.get('/order-details',autoUpdatesOrders)
customRouter.post('/create-pizza-builder',pizzaBuilder);

