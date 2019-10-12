'use strict';

// REQUIRE Node.js DEPENDENCIES
const connect = require("connect");
const app = connect.createServer(function(req, res){
    console.log("Appel callback 1");
    res.setHeader("X-nom", "Marie");
}, function(req, res){
    console.log("Appel callback2");
    res.end("Bonjour");
});


app.use(connect.favicon('logo.JPG'));
// const { join } = require("path");


//Declare server
// const app = connect();
// const boostrap = require('bootstrap');

//PORT


//ROUTES
// const { home, index } = require("./routage/index");


// app.use('/home');


app.listen(8080);