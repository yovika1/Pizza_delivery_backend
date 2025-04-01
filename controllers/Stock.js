import { Notification } from "../schema/Notification.js";
import { NotificationStock } from "../schema/Stock.js";

export const checkStock = async (req, res) => {
    try {
        const { items } = req.body;

        for (const item of items) {
            const stockItem = await NotificationStock.findOne({ name: item.name });

            const conditions = new Map([
                [!stockItem, () => res.status(404).json({ message: `Stock item not found: ${item.name}` })],
                [stockItem?.quantity < item.quantity, () => res.status(400).json({ message: `Not enough stock for ${item.name}` })]
            ]);

            for (const [condition, action] of conditions) {
                if (condition) return action();
            }

            // Reduce stock quantity
            stockItem.quantity -= item.quantity;

            stockItem.quantity < 2 && !stockItem.lowStockNotification &&
                (stockItem.lowStockNotification = true,
                await Notification.create({
                    message: `⚠️ Stock for ${item.name} is low (${stockItem.quantity} left).`,
                    stockItem: stockItem._id
                }));

            await stockItem.save();
        }

        res.json({ message: "Stock updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error updating stock", error });
    }
};


export const getLowStockItems = async (req, res) => {
    try {
      const lowStockItems = await NotificationStock.find({ lowStockNotification: true });
      res.json({
        message: 'fetch sucessfully',
        lowStockItems});
    } catch (error) {
      res.status(500).json({ message: "Error fetching low stock items", error });
    }
  };
