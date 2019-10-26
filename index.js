"use strict";

const dotenv =  require('dotenv').config({path: `${__dirname}/.env`});
const express = require('express');
const fs = require('fs');
const nodeCron  = require('node-cron');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || "3232";

const app = express();

app.get('*', (req, res)=>{
    res.send({
        "Greetings": "Hello World"
    });
})

// schedule tasks to be run on the server   
// nodeCron.schedule("* * * * *", function() {
//     console.log("running a task every minute");
// });

// schedule tasks to be run on the server
// nodeCron.schedule("1 * * * *", function() {
//     console.log("---------------------");
//     console.log("Running Cron Job");
//     fs.unlink("./error.log", err => {
//         if (err) throw err;
//         console.log("Error file succesfully deleted");
//     });
// });

// create mail transporter
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASS
    }
  });

  // sending emails at periodic intervals
  nodeCron.schedule("* * * * *", function(){
    console.log("---------------------");
    console.log("Running Cron Job");
    let mailOptions = {
      from: "jolaosoyusuf@gmail.com",
      to: "jolaosoyusuf16@gmail.com",
      subject: `Not a GDPR update ;)`,
      text: `Hi there, this email was automatically sent by us`
    };
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        throw error;
      } else {
        console.log(info);
        console.log("Email successfully sent!");
      }
    });
  });


app.listen(PORT, ()=>{
    console.log(`App is listening to PORT::: ${PORT}`)
})