const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const axios = require("axios");

dotenv.config();
const app = express();

// Segurança CORS evitando que outros sites mal inencionados, façam requisições para o backend.
const allowedOrigins = [
  "http://localhost:5500",// para testes locais
  "http://localhost:3000",// para testes locais
  "http://localhost:5501",// para testes locais
  "http://127.0.0.1:3000",// para testes locais
  "http://127.0.0.1:5500",// para testes locais
   "http://localhost:3000/send",// para testes locais
   
   "https://website-portfolio-o8vp.onrender.com",
  "https://MariRods-LL.github.io"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Bloqueado pelo CORS"));
    }
  }
}));

//limitação de taxa para evitar spam.
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use(express.json());


const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

// Validação de email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

app.post("/send", async (req, res) => {
  const { name, email, message, token } = req.body;

  //  Verifica token
  if (!token) {
    return res.status(400).json({ error: "Token reCAPTCHA ausente" });
  }

  //  Valida dados
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  try {
    // Verificação do reCAPTCHA
    const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";

    const response = await axios.post(verifyUrl, null, {
      params: {
        secret: process.env.RECAPTCHA_SECRET,
        response: token
      }
    });

    if (!response.data.success) {
      return res.status(400).json({ error: "reCAPTCHA inválido" });
    }

    // 📧 Envio do email
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
      from: process.env.EMAIL_USER,
      to: "mariannarodrigues968@gmail.com",
      subject: `Nova mensagem do site de ${name}`,
      text: `
Nome: ${name}
Email: ${email}
Mensagem: ${message}
      `,
    });

    res.json({ status: "ok" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro no servidor" });
  }
});
//rodando o servidor em localhost:3000
const PORT = process.env.PORT || 3000;// alteração para opção do Render
app.listen(PORT, () => console.log("Servidor rodando"));