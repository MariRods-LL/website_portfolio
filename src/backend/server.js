import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); 


const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: email,
    to: "mariannarodrigues968@gmail.com",
    subject: `Nova mensagem do Site de ${name}`,
    text: message,
  });

  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("Servidor rodando..."));
