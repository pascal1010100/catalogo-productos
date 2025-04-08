import nodemailer from "nodemailer";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// 📧 Enviar email
export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.VENDOR_EMAIL,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Correo enviado a:", to);
    return info;
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
    throw error;
  }
};

// 📲 Enviar WhatsApp
export const sendWhatsAppMessage = async (message) => {
  try {
    const response = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${process.env.VENDOR_WHATSAPP}`,
      body: message,
    });

    console.log("✅ WhatsApp enviado:", response.sid);
    return response;
  } catch (error) {
    console.error("❌ Error al enviar WhatsApp:", error);
    throw error;
  }
};
