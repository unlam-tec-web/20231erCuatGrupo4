const express = require('express');
const fs = require('fs');
const cors = require("cors");
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;


//Define Datos Cognito
const poolData = {
  UserPoolId : "sa-east-1_l3EaiYZAh",
  ClientId : "2g16n0k6ki6s2ebvddhsch5es8"
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);



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
  console.log("JSON:" + JSON.stringify(req.body));

  var attributeList = [];

  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value:req.body.email}));

  /*attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value:"Prasad Jayashanka"}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"preferred_username",Value:"jay"}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"gender",Value:"male"}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"birthdate",Value:"1991-06-21"}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"address",Value:"CMB"}));
  attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value:"+5412614324321"}));
  */

  userPool.signUp(req.body.username, req.body.password, attributeList, null, function(err, result){
    if (err) {
      console.log(err);
      res.json(err);
      return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    res.json({
      bienvenido: `${cognitoUser.getUsername()}`
    })
  });

});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});


app.post('/login', (req, res) => {
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
      res.json({'resp':'OK'})
    },
    onFailure: function(err) {
      console.log(err);
      res.json({'resp':'Credenciales Incorrectas'})
    },

  });
});
