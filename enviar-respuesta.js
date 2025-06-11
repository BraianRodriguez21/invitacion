const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
if (req.method !== 'POST') {
    return res.status(405).json({ mensaje: 'Método no permitido' });
}
const { respuesta } = req.body;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
    }
});

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject: 'Respuesta a tu invitación 💌',
    text: `La persona ha respondido: ${respuesta}`
};

try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ mensaje: 'Respuesta enviada por correo ✅' });
    } catch (error) {
    return res.status(500).json({ mensaje: 'Error al enviar correo', error });
    }
};
