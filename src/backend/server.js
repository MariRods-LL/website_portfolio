const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");


require("dotenv").config();



const app = express();
app.use(cors());
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Recebido:", req.body);

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
    text: email, message,
  });

  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("Servidor rodando..."));
