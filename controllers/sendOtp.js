
import nodemailer from "nodemailer"

export const sendOtp = async(otp, email) =>{
  try {
    const Transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS
      }

    })

    const info = await Transporter.sendMail({
      from:process.env.SMTP_USER,
      to:email,
      subject:'OTP from pizza-delivery check it Now',
      text:`Your OTP ${otp}`,
    });
    console.log("Message sent:%s ",info.messageId)
    
  } catch (error) {
    console.log(error)
  }
}