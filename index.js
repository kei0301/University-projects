#!/usr/bin/env node

var http = require('http');
var express = require('express');
var app = express();
var cors = require('cors');
const path = require('path');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
// When you have your own Client ID and secret, put down their values here:

var translatedData = "";

app.use(express.static(path.join(__dirname, '/src')));

app.post('/send_data' , function(req,res,next){
    var data = req.body.data;
    console.log(data);
    res.send(data);
})

function translate(text,fromLang,toLang){
    var clientId = "FREE_TRIAL_ACCOUNT";
    var clientSecret = "PUBLIC_SECRET";

    var jsonPayload = JSON.stringify({
        fromLang: fromLang,
        toLang: toLang,
        text: text
    });

    var options = {
        hostname: "api.whatsmate.net",
        port: 80,
        path: "/v1/translation/translate",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-WM-CLIENT-ID": clientId,
            "X-WM-CLIENT-SECRET": clientSecret,
            "Content-Length": Buffer.byteLength(jsonPayload)
        }
    };


    var request = new http.ClientRequest(options);
    request.end(jsonPayload);

    request.on('response', function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log(chunk);
        });
    });
}

app.listen('3000' , ()=> {console.log('server listen 3000 port!')});
