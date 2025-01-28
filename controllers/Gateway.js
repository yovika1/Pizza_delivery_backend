import stripe from "../config/stripe.js";

export const createCheckout = async (req, res) => {
  const { orderId, amount } = req.body;
  console.log("req body", req.body)

  const convertUsdToInr = (amountInDollars, usdToInrRate = 83) =>{
    return Math.round( amountInDollars * usdToInrRate *100); 

  };

  try {
    if(!amount || !orderId) {
      return res.status(400) . json({
        message:'order ID and amount are required'
      })
    }
const amountInPaise  = convertUsdToInr(amount);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `Order #${orderId}`,
            },
            unit_amount: amountInPaise,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url});
  } catch (error) {
    console.error("Error creating Stripe session:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

export const handleStripeWebhook = async (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      "your-webhook-secret"
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Example: Update order status in your database
      console.log(`Payment successful for session: ${session.id}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

