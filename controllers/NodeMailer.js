
import nodemailer from "nodemailer";

export const nodeMailer = async(otp, email) =>{
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

// **Send Low Stock Email**
export const sendLowStockEmail = async (items, email) => {
  try {
    const emailContent = items.map(item => `${item.name} - Stock: ${item.quantity}`).join("\n");

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "🚨 Low Stock Alert!",
      text: `The following items have low stock:\n\n${emailContent}`,
    });

    console.log("✅ Low Stock Email Sent: %s", info.messageId);
  } catch (error) {
    console.error("❌ Error sending low stock email:", error);
  }
};