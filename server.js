const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware para leer JSON en el body
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

app.post("/enviar-respuesta", (req, res) => {
  const { respuesta } = req.body;

  console.log("Respuesta recibida:", respuesta);

  // Configuramos el transporte de Nodemailer con Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_DESTINO,
    subject: "Respuesta a tu invitación 💌",
    text: `La persona respondió: ${respuesta}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo:", error);
      return res.status(500).send("Error al enviar el correo: " + error.message);
    }
    console.log("Correo enviado:", info.response);
    res.send("Correo enviado con éxito");
  });
});

// Puerto para el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
