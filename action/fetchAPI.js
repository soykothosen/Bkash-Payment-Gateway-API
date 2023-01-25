const fetch = require("node-fetch");

const fetchAPI = async(url,data)=>{
    const fetchResponse = await fetch(url,{
        method: data.method,
        headers: data.headers,
        body: data.body

    });
    
    return await fetchResponse.json();

}