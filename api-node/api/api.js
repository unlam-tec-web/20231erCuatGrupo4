const express = require('express');
const fs = require('fs');
const cors = require("cors");
const os = require('os');

const app = express();



let isLogin = () => false;

let logger = (req, res, next) => {
  console.log('Peticion de tipo: ', req.method );
  next();
}

let showIP = (req, res, next) => {
  console.log('IP: 127.0.0.1');
  next();
};


//Define middlewares
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(showIP);



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

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});











