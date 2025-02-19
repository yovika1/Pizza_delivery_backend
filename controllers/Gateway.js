import stripe from "../config/stripe.js";
import { Order } from "../schema/Order.js";
export const createCheckout = async (req, res) => {
  const { orderId, amount } = req.body;
  console.log("req body", req.body);
};

export const handleStripeWebhook = async (request, response) => {
  const stringifyData = request?.body;
  const data = stringifyData;
  const paymentId = data?.data?.object?.id;
  try {
    if (data.type === "payment_intent.succeeded") {
      console.log("💰 Payment captured!");
      await Order.findOneAndUpdate(
        {
          paymentId: paymentId,
        },
        {
          status: "paid",
        },
        { new: true }
      );
      // await updateOrder(orderId, "success");
    } else if (data.type === "payment_intent.payment_failed") {
      console.log("❌ Payment failed.");
      // await updateOrder(orderId, "failed");
    }
    response.send();
  } catch (error) {
    console.log("catch message ", error.message);
    // await updateOrder(new mongoose.Types.ObjectId(orderId), "failed");
  }
};
