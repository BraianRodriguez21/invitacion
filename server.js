const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public")); // Sirve index.html

app.post("/enviar-respuesta", (req, res) => {
  const { respuesta } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_DESTINO,
    subject: "Respuesta a tu invitación 💌",
    text: `La persona respondió: ${respuesta}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar:", error);
      return res.status(500).send("Error al enviar");
    }
    res.send("Correo enviado con éxito");
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
