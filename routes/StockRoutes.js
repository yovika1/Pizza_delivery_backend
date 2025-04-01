import express from 'express';
import { getNotifications, markNotificationAsRead,  } from '../controllers/NotificationStock.js';
import { createInventory, getItems, updateInverntoryItem } from '../controllers/Inventory.js';
import { checkStock, getLowStockItems } from '../controllers/Stock.js';

const router = express.Router();

router.post("/update-stock", checkStock);
router.get("/low-stock", getLowStockItems)

router.post('/createInventory', createInventory);
router.get('/gettingInventory',getItems);
router.put('/updateInventory/:id',updateInverntoryItem);

router.get('/getstock-notify',getNotifications);
router.put('/mark-notification/:id',markNotificationAsRead);

export default router;