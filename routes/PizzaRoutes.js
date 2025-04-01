import express from 'express';
import { createPizza, deletePizza, getAll, updatedPizza } from '../controllers/Pizza.js';

const pizzaRouter = express.Router()

pizzaRouter.post('/create', createPizza);
pizzaRouter.get('/getting-pizza',getAll);
pizzaRouter.delete('/delete/:id',deletePizza);
pizzaRouter.put('/updated-pizza/:id',updatedPizza);

export default pizzaRouter;