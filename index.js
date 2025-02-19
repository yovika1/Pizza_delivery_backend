import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbConnection/Connection.js";
import usersRouter from "./routes/UserRoutes.js";
import webhookRouter from "./routes/GatewayRoutes.js";
import PizzaRouter from "./routes/PizzaRoutes.js";
import { connectRedis } from "./controllers/redisClient.js";
import orderRouter from "./routes/order.js";
import { handleStripeWebhook } from "./controllers/Gateway.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

app.use(usersRouter);
app.use(PizzaRouter);
app.use(orderRouter)

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully!");

    await connectRedis();
    console.log("Redis connected successfully!");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
