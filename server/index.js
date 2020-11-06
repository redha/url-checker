// index.js

/*** Required External Modules ***/
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const { log } = require('console');
/*** App Variables */

const app = express();
const PORT = process.env.PORT || 44335;

/***  App Configuration ***/
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.header("Content-Type", "application/json");
    
    next();
});

app.use('/static', express.static(path.join(__dirname, 'public')))

/*** Routes Definitions ***/
app.get('/', (req, res)=>{
    res.status(200).send({"error": { "code": "", "hint": ""}, "content": "[0, 1, 2, 3]"});
})

const checkTunnel = async function(url){
  let responseToReturn = {"status": 999, "content": "empty"};
  try{
    let res = await fetch(`${url}`);
    if (res.status){
      responseToReturn = { status: res.status, statusText: res.statusText };
    }
  }
  catch(err){
    responseToReturn = { error: true, message: err.message, status: 599 };
  }
  return responseToReturn;
};

app.get('/:tunnel', async (req, res)=>{
  let data = await checkTunnel(req.params.tunnel);
  console.log(`DATA IS:`);
  console.log(data);
  console.log(`Let's send it.....`);
  res.send(data);
})

/*** Server Activation ***/
app.listen(PORT, () => {
    console.log(`App and Running from port ${PORT}`);
});