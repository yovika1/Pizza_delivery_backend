import { createClient } from "redis";

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});


client.on("error", (err) => console.error("Redis Error:", err));

export const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Connected to Redis");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
};

export const saveOTP = async (key, otp, ttl = null) => {
  try {
    console.log("Saving OTP...");
    if (ttl) {
      // Save OTP with TTL
      await client.setEx(key, ttl, otp);
    } else {
      // Save OTP without TTL
      await client.set(key, otp);
    }
    console.log("OTP saved successfully!");
  } catch (error) {
    console.error("Error saving OTP:", error);
    throw error;
  }
};

// Get OTP by key
export const getOTP = async (key) => {
  try {
    const otp = await client.get(key);
    return otp;
  } catch (error) {
    console.error("Error retrieving OTP:", error);
    throw error;
  }
};
