import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ruta para enviar el correo
app.post('/enviar-respuesta', async (req, res) => {
  const { respuesta } = req.body;

  const { EMAIL_USER, EMAIL_PASS, EMAIL_DESTINO } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_DESTINO) {
    return res.status(500).send('ERROR: Faltan variables en .env');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_DESTINO,
      subject: '💌 Invitación respondida',
      text: `La persona respondió: ${respuesta}`
    });

    res.status(200).send('Correo enviado');
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).send('Error al enviar el correo');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
