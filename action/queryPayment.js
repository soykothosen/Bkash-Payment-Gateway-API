require("dotenv").config();
const fetch = require("node-fetch");

const bkashAuth = require('../action/bkashAuth.js');

const queryPayment = async (paymentID) => {
    const auth = await bkashAuth(); // you can store token in your redis or session or db
    const queryResponse = await fetch(
      process.env.BASE_URL+'/checkout/payment/status',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: auth,
          "x-app-key": process.env.KEY,
        },
        body: JSON.stringify({
          paymentID
        }),
      }
    );
    const queryResult = await queryResponse.json();
    return queryResult;
  };
    
  module.exports = queryPayment;