import express from 'express';
import cors from 'cors';
import  router from './api/api.js';


const app = express();

let isLogin = () => false;

//Define middlewares
app.use(express.json());
app.use(cors());
app.use(express.static('./datos'));
app.use("/", router);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});

