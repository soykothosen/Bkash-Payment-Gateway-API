require("dotenv").config();
const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");

const bkashAuth = require('../../action/bkashAuth.js');

const createPayment = async(req, res) => {
    console.log("create payment");
       try{
          const auth = await bkashAuth(); 
          const createResopnse = await fetch(
            process.env.BASE_URL+"/checkout/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                authorization: auth,
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
    
    };
    
    module.exports = createPayment;