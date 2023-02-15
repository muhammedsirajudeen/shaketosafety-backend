const express=require('express')
const app=express()
const https = require("https");
const fs = require("fs");
const cors=require('cors')
app.use(cors())
require('dotenv').config();
const accountSid =  process.env.SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.SECRET_ID; // Your Auth Token from www.twilio.com/console

const client = require('twilio')(accountSid, authToken);


//
app.use(express.json())
app.post("/",(req,res)=>{
    console.log(req.body)
    if(req.body.latitude){
      client.messages
      .create({
        body: `Your friend  ${req.body.name} is in danger. The location details of your friend is .Latitude
        ${req.body.latitude}  Longitude ${req.body.longitude}`,
        to: '+918078054457', // Text this number
        from: '+19283962209', // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));

    }
    else{
      client.messages
      .create({
        body: `Your friend  ${req.body.name} is in danger location details are currently unavailable`,
        to: '+918078054457', // Text this number
        from: '+19283962209', // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
   
    }


    res.send("hey")
})

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("/etc/letsencrypt/live/shaketosafety.ddns.net/privkey.pem"),
      cert: fs.readFileSync("/etc/letsencrypt/live/shaketosafety.ddns.net/fullchain.pem"),
    },
    app
  )
  .listen(443, () => {
    console.log("server is runing at port 4000");
  });

