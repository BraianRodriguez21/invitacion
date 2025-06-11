const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ mensaje: 'Método no permitido' });
  }

  const { respuesta } = req.body;

  if (!respuesta) {
    return res.status(400).json({ mensaje: 'Falta la respuesta' });
  }

  const { EMAIL_USER, EMAIL_PASS, EMAIL_RECEIVER } = process.env;

  if (!EMAIL_USER || !EMAIL_PASS || !EMAIL_RECEIVER) {
    return res.status(500).json({ mensaje: 'Faltan variables de entorno' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: EMAIL_USER,
    to: EMAIL_RECEIVER,
    subject: 'Respuesta a tu invitación 💌',
    text: `La persona ha respondido: ${respuesta}`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ mensaje: 'Respuesta enviada por correo ✅' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return res.status(500).json({ mensaje: 'Error al enviar correo', error });
  }
};

