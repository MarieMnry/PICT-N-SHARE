'use strict';

const express = require('express');
const router = express.Router();
let db = require("../db");
let sess;

router.get('/', function(req, res, next){
    res.render('login');
})

router.post('/', function(req, res, next){
    // Création de la session
    sess = req.session;
    console.log(sess);
    let sessLogin = req.body.login; //on vise le champs du formulaire avec son "name=", non pas son ID ou autre
    console.log(sessLogin);

    // Vérification des données, côté serveur
    if(req.body.login.length < 5 || req.body.login.length > 15){
        res.redirect('login');
    }
    if(req.body.password.length < 6){
        res.redirect('login');
    }

    
})

module.exports = router;