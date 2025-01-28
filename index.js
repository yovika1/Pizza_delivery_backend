import connectDB from "./dbConnection/Connection.js";
import usersRouter from "./routes/UserRoutes.js";
import Express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectRedis } from "./controllers/redisClient.js";
import router from "./routes/GatewayRoutes.js";

dotenv.config();
// const stripe = new Stripe(process.env.STRIPE_PAYMENT);

const app = Express();

app.use(Express.json());
app.use(cors());
app.use(usersRouter);
app.use(router)


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
    process.exit(); 
  }
};

startServer();
