const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const ejs = require("ejs");

let cookieParser = require('cookie-parser');
let session = require('express-session');
let morgan = require('morgan');
var favicon = require('static-favicon');
var multer = require('multer');
 



const app= express();
const port= process.env.PORT || 8000;
app.set("view engine","ejs");
app.listen(port,(err)=>{if(err){console.log("Connection error",err)}else{console.log(`Server is running . port number is ${port}`)}});

/*====> mvc pattern design <======*/ 

app.set("views",path.join(__dirname,"public/application/views/"));
app.set("controller",path.join(__dirname,"public/application/controller/"));
app.set("model",path.join(__dirname,"public/application/model/"));
app.set('config', path.join(__dirname, '/public/application/config/'));

app.use(express.static(__dirname + '/public/assets/')); 
 
app.use(favicon());
 // initialize body-parser to parse incoming parameters requests to req.body 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000000000
    }
}));












const mvc={
    'congig':app.locals.settings.config,
    'model':app.locals.settings.model,
    'controller':app.locals.settings.controller,
    'view':app.locals.settings.views

} 

require(mvc.congig+"database")(app,express,mongoose);  
require(mvc.congig+"route")(app,express,mvc); 

