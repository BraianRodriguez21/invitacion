const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/enviar-respuesta', async (req, res) => {
  const { respuesta } = req.body;

  if (!process.env.EMAIL_DESTINO) {
    return res.status(500).send('ERROR: No está definida la variable EMAIL_DESTINO');
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_DESTINO,
      subject: 'Respuesta a tu invitación 💌',
      text: `La persona respondió: ${respuesta}`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.response);
    res.send('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).send('Error al enviar correo: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
