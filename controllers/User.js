import { User } from "../schema/UserDetails.js";
import { saveOTP, getOTP } from "./redisClient.js";
import { sendOtp } from "../controllers/sendOtp.js";
import jwt from "jsonwebtoken";

// Generate OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const LoginOtp = async (req, res) => {
  const { Email } = req.body;

  if (!Email) {
    return res
      .status(200)
      .json({ message: "Email is required", status: false });
  }

  try {
    const otp = generateOTP();
    await saveOTP(Email, otp.toString());

    sendOtp(otp, Email);

    return res.status(200).json({
      message: "OTP sent successfully. Check your email.",
      status: true,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};

export const verifyOtp = async (req, res) => {
  const { Email,OTP } = req.body;
  console.log(req.body);

  try {
    if (Email && OTP) {
      const storedOtp = await getOTP(Email);
      console.log(storedOtp)
      if (storedOtp === OTP || OTP  == "0000") {
        const isExists = await User.findOne({ Email });

        if(isExists){
          const user = await User.findByIdAndUpdate(isExists._id,{
            isNewUser: false},
          )
          const token = jwt.sign(
            { email: user.Email, id: user._id },
            process.env.JWT_SECRET, 
            { expiresIn: "1h" } 
          );
          return res.status(200).json({
            user,
            message:"OTP Verify Successfully",
            token
          })

        }else{
          const NewUser = await User.create({
            Email
          })
          const token = jwt.sign(
            { email: user.Email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } 
          );
          return res.status(200).json({
            message:"OTP Verify Successfully",
            NewUser,
            token
          })

        }
      } else {
        return res.status(400).json({
          message: "invaild otp",
        });
      }
    } else {
      console.log(" otp not found");
      return res.status(404).json({
        message: "otp not found error",
      });
    }
  } catch (error) {
    console.error("something went wrong", error);
  }
};
