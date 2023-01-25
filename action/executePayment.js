require("dotenv").config();
const fetch = require("node-fetch");

const bkashAuth = require('../action/bkashAuth.js');

const executePayment = async (paymentID) => {
    const auth = await bkashAuth(); // you can store token in your redis or session or db
    const executeResponse = await fetch(
      process.env.BASE_URL+'/checkout/execute',
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
    const executeResult = await executeResponse.json();
    return executeResult;
  };
    
  module.exports = executePayment;