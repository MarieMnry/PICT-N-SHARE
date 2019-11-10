'use strict';

const express = require('express');
const router = express.Router();
let db = require("../db");
let sess;

router.get('/', function(req, res, next){
    res.render('signup');
})

router.post('/', function(req, res, next){
    // Création de la session
    sess = req.sess;
    console.log(sess);
    let sessLogin = req.body.login;
    console.log(sessLogin);
    let sessEmail = req.body.email;
    console.log(sessEmail);

    // Vérification des données, côté serveur
    if(req.body.login.length < 5 || req.body.login.length > 15){
        res.redirect('signup');
    }
    if(req.body.password.length < 6){
        res.redirect('signup');
    }

    // Envoi d'un mail de confirmation d'inscription
    
})

module.exports = router;