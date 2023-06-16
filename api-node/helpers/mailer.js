const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'theboys.tallerweb1@gmail.com',
    pass: 'jnnnhatbpirmzpeu'
  }
});

const mailOptions = {
  from: 'theboys.tallerweb1@gmail.com',
  to: 'dario.benitez@gmail.com',
  subject: 'Verificación de cuenta',
  html: '<h1>Hola</h1><p>Gracias por registrarte. Por favor, haga clic en el siguiente enlace para verificar su cuenta:</p><a href="http://localhost:3000/verificar">Verificar cuenta</a>'
};

let enviarMailValidacionDeMail = () => {
  return new Promise((res, rej) => {
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        rej('Error al enviar mail')
      } else {
        res('Email enviado: ' + info.response);
      }
    });
  });
}

module.exports = {
  enviarMailValidacionDeMail
}
