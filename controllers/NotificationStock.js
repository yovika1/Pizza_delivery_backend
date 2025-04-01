import { Notification } from "../schema/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate("stockItem");
    res.json({
      message: 'fetch sucessfully',
      notifications
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { read: true });
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};
