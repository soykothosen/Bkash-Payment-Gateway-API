require("dotenv").config();
const fetch = require("node-fetch");

const executePayment = require('../../action/executePayment.js');

const bkashCallback = async(req, res) => {
    try{
        if(req.query.status === 'success'){
          res.send(await executePayment(req.query.paymentID));
        }else{
          res.send("Payment "+ req.query.status);
        }
      }catch(e){
        console.log(e);
      }
};

module.exports = bkashCallback;