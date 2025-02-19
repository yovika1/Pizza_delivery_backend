import stripe from "../config/stripe.js";
import { Order } from "../schema/Order.js";

export const createOrder = async (req, res) => {
  try {
    console.log("Received Order Data:", req.body);

    const {
      userId,
      items,
      grandTotal,
      contactNumber,
      subtotal,
      address,
      email,
    } = req.body;
    console.log("req_body", req.body);
    if (
      !items.length ||
      !subtotal ||
      !grandTotal ||
      !contactNumber ||
      !address
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const customer = await stripe.customers.create({
      name: "Jenny Rosen",
      email: "jennyrosen@example.com",
    });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: grandTotal * 100,
      currency: "INR",
      description: "Software development services",
      shipping: {
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      automatic_payment_methods: { enabled: true },
      customer: customer.id,
    });

    const newOrder = new Order({
      userId,
      items,
      subtotal,
      grandTotal,
      contactNumber,
      address,
      email,
      paymentId: paymentIntent.id,
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully!",
      order: newOrder,
      intent: paymentIntent,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error placing order", error: error.message });
  }
};

export const fetchOrder = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId");

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};
