require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();

const port = process.env.PORT? process.env.PORT : 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const bkashToken = async() => {
   try{
    const tokenResponse = await fetch(
      process.env.BASE_URL+"/checkout/token/grant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            username: process.env.USER_NAME,
            password: process.env.PASSWORD,
          },
          body: JSON.stringify({
            app_key: process.env.KEY,
            app_secret: process.env.SECRET,
          }),
        }
      );
      const tokenResult = await tokenResponse.json();
     return tokenResult.id_token;
   }catch(e){
    console.log(e);
   }
};

const executePayment = async (paymentID) => {
  const token = await bkashToken(); // call from redis or session
  const executeResponse = await fetch(
    process.env.BASE_URL+'/checkout/execute',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: token,
        "x-app-key": process.env.KEY,
      },
      body: JSON.stringify({
        paymentID
      }),
    }
  );
  const executeResult = await executeResponse.json();
  return executeResult;
};
  

app.get("/", (req, res) => {
 try{
    res.send('Hello Bkash');
 }catch(e){
    console.log(e);
 }
});


app.get("/bkash/create", async (req, res) => {
  console.log("/create");
    try{
        const token = await bkashToken(); 
        const createResopnse = await fetch(
          process.env.BASE_URL+"/checkout/create",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              authorization: token,
              "x-app-key": process.env.KEY,
            },
            body: JSON.stringify({
              mode: "0011",
              payerReference:" ",
              callbackURL: "http://localhost:4000/bkash/callback",
              amount: "500", // amount should be dynamic
              currency: "BDT",
              intent: "sale",
              merchantInvoiceNumber: "INV" + uuidv4().substring(0, 5), // should be unique number
            }),
          }
        );
        const createResult = await createResopnse.json();  
        res.redirect(createResult.bkashURL);
    }catch(e){
        console.log(e);
    }
  
  });

  app.get("/bkash/callback", async(req, res) => {
    try{
      if(req.query.status === 'success'){
        res.send(await executePayment(req.query.paymentID));
      }else{
        res.send("Payment "+ req.query.status);
      }
    }catch(e){
      console.log(e);
    }
  });

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);