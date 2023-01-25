require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT? process.env.PORT : 4000;
//bkash router
const bkashRouter = require('./routes/bkashRouter.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/bkash', bkashRouter);

app.get("/", (req, res) => {
 try{
    res.send('Hello Bkash');
 }catch(e){
    console.log(e);
 }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);