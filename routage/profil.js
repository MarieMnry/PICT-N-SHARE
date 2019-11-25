'use strict';

const express = require('express');
const router = express.Router();
let db = require("../db");

var box = {};
// recuperer elements de sessions !!

router.get('/', function(req, res, next){
    if(req.session.login){
        res.render("profil.hbs", {login: req.session.login, email: req.session.email});
        box.session = req.session;
        console.log("from profil: " + box.session.login + box.session.email);

    } else {
        console.log("Access denied");
        res.render("home.pug", { message: "Merci de vous identifier !"});
    }
});

router.post('/', function(req, res, next){
    if(req.xhr){
        console.log('youhou AJAX');
    }
})


module.exports = router;
