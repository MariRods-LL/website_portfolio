const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const axios = require("axios");

dotenv.config();
const app = express();

app.set("trust proxy", 1);

const allowedOrigins = [ // Segurança CORS evitando que outros sites mal inencionados, façam requisições para o backend.
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "https://marirods-ll.github.io"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Bloqueado pelo CORS:", origin);
      callback(null, false);
    }
  }
}));

//  limitar o tamanho do corpo da requisição

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(limiter);

// rota  para teste
app.get("/", (req, res) => {
  res.send("API OK  ");
});

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// rota principal
app.post("/send", async (req, res) => {
  const { name, email, message, token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token reCAPTCHA ausente" });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email inválido" });
  }

  try {
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
      to: "mariannnarodrigues968@gmail.com",
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
// Iniciar o servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 

