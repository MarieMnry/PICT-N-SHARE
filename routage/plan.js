'use strict';

const express = require('express');
const router = express.Router();

var box = {};
// recuperer elements de sessions !!

router.get('/', function(req, res, next){
    if(req.session.login){
        res.render("plan.hbs", {login: req.session.login, email: req.session.email});
        box.session = req.session;
        console.log("from plan: " + box.session.login + box.session.email);
    } else {
        console.log("Access denied");
        res.render("home.pug", { message: "Merci de vous identifier !"});
    }
});

module.exports = router;