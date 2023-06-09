import express from 'express';
import fs from 'fs';
import AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import multer from 'multer';
import lodash from 'lodash';

const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;


//Define Datos Cognito
const poolData = {
  UserPoolId : "sa-east-1_l3EaiYZAh",
  ClientId : "2g16n0k6ki6s2ebvddhsch5es8"
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./datos/imagenes/')
  },
  filename: (req, file, cb) => {
    const extension = file.originalname.split('.').pop()
    cb(null,`${Date.now()}.${extension}`)
  }
})

const upload = multer({storage});

//Definir Endpoints

router.post('/generarNuevoProducto',upload.single('imagen'),(req, res) => {

  fs.readFile('./datos/productos.json', (err, data) => {

    if (err) {
      console.error(err);
      res.error(500).send({'resp': 'Error al Grabar'});
      return ;
    }

    const productos = JSON.parse(data);

    const nuevoId = productos.length > 0
                     ? parseInt(lodash.maxBy(productos,'Id').Id) + 1 : 1;

    const nuevoProducto = {
      Id: nuevoId.toString(),
      Nombre: req.body.nombre,
      Descripcion: req.body.descripcion,
      Precio: req.body.precio,
      ImageUrl: 'imagenes/' + req.file.filename,
    };

    productos.push(nuevoProducto);

    console.log(productos);

    const jsonString = JSON.stringify(productos);

    fs.writeFile('./datos/productos.json', jsonString, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.send({'resp': 'OK'})
  });

})


router.post('/grabarCompra', (req, res) => {

  console.log(req.body);

  fs.readFile('./datos/productos.json', (err, data) => {

    if (err) {
      console.error(err);
      res.error(500).send({'resp': 'Error al Grabar'});
      return ;
    }

    const carrito = req.body;
    const productos = JSON.parse(data);

    const listaFiltrada = lodash.differenceBy(productos, carrito, 'Id');

    console.log(listaFiltrada);

    const jsonString = JSON.stringify(listaFiltrada);

    fs.writeFile('./datos/productos.json', jsonString, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });

    res.send({'resp': 'Gracias por su compra'})

})


router.get('/getImagenes', (req, res) => {
  fs.readFile('./datos/productos.json', (err, data) => {
    res.send(JSON.parse(data));
  });
});

router.get('/getImagenPorId', (req, res) => {

  fs.readFile('./datos/productos.json', (err, data) => {

    const productos = JSON.parse(data);
    const producto = productos.find(p => p.Id === req.body.IdImagen)

    res.send(producto);
  });
});

router.post('/registrar', (req, res) => {
  console.log("JSON:" + JSON.stringify(req.body));

  var attributeList = [];

  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:req.body.email}));

  userPool.signUp(req.body.username, req.body.password, attributeList, null, function(err, result){
    if (err) {

      if (err.name === 'InvalidPasswordException') {
        res.json({'resp':`El password debe tener al menos 8 caracteres, 1 caracter especial y una mayuscula.`})
      } else if (err.name === 'InvalidParameterException') {
        res.json({'resp':`Se ingreso un email invalido o falto completar algun dato en el formulario.`})
      } else if (err.name === 'UsernameExistsException') {
        res.json({'resp':`Ya existe un usuario registrado con ese Nombre`})
      } else {
        res.json({'resp':`Hubo un error con el registro de su usaurio`})
      }
      return;
    }
    res.json({'resp':'OK'})
  });

});

router.post('/login', (req, res) => {
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username : req.body.username,
    Password : req.body.password,
  });

  var userData = {
    Username : req.body.username,
    Pool : userPool
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      console.log('id token + ' + result.getIdToken().getJwtToken());
      console.log('refresh token + ' + result.getRefreshToken().getToken());
      res.json({'resp':'OK', 'token': result.getAccessToken().getJwtToken()})
    },
    onFailure: function(err) {

      console.log(err.code);
      switch (err.code) {

        case "UserNotConfirmedException":
          console.log("El usuario aún no ha confirmado su correo electrónico.");
          res.json({ 'resp': "Aún no ha confirmado su correo electrónico." });
          break;
        case "NotAuthorizedException":
          console.log("Credenciales inválidas.");
          res.json({ 'resp': "Credenciales inválidas." });
          break;

        default:
          console.log("Se produjo un error al intentar iniciar sesión:", err);
          res.json({ 'resp': err });
      }
    },
  });
});

export default router;
