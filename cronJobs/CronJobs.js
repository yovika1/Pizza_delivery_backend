import cron from "node-cron";
import { NotificationStock } from "../schema/StockSchema.js";
import { Notification } from "../schema/NotificationSchema.js";
import { sendLowStockEmail } from "../controllers/sendOtp.js";

cron.schedule("0 * * * *", async () => {
  console.log("🔄 Running stock check...");

  try {
    const lowStockItems = await NotificationStock.find({ 
      quantity: { $lt: 20 }, 
      lowStockNotification: false 
    });

    if (lowStockItems.length > 0) {
      for (const item of lowStockItems) {
        item.lowStockNotification = true;
        await item.save();

        // Create a notification in the database
        await Notification.create({
          message: `⚠️ Stock for ${item.name} is low (${item.quantity} left).`,
          stockItem: item._id,
        });
      }

      // Send email alert 🚀
      await sendLowStockEmail(lowStockItems);

      console.log("📩 Low stock email sent & notifications created.");
    } else {
      console.log("✅ No low stock items found.");
    }
  } catch (error) {
    console.error("❌ Error in stock cron job:", error);
  }
});
