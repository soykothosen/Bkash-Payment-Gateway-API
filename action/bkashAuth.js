require("dotenv").config();
const fetch = require("node-fetch");

const bkashAuth = async() => {
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
       //console.log(tokenResult);
      return tokenResult.id_token;
    }catch(e){
     console.log(e);
    }
 };

 module.exports = bkashAuth;