const express = require('express');
const fs = require('fs');
const cors = require("cors");
const os = require('os');
const servidorMail = require('../helpers/mailer');

const app = express();



let isLogin = () => false;

let logger = (req, res, next) => {
  console.log('Peticion de tipo: ', req.method );
  next();
}


//Define middlewares
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(express.static('../datos'));



//Definir Endpoints

app.get('/getImagenes', (req, res) => {
  fs.readFile('../datos/productos.json', (err, data) => {
    res.send(JSON.parse(data));
  });
});

app.get('/getImagenPorId', (req, res) => {

  fs.readFile('../datos/productos.json', (err, data) => {

    const productos = JSON.parse(data);
    const producto = productos.find(p => p.Id === req.body.IdImagen)

    res.send(producto);
  });
});


app.post('/registrar', (req, res) => {
  servidorMail.enviarMailValidacionDeMail().then((mensaje) => { res.send(mensaje)});
});

app.get('/verificar', (req, res) => {
  res.send("Mail Verificado");
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
