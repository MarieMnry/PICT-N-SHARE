'use strict';

const express = require('express');
const router = express.Router();
let db = require("../db");

var box = {};
// recuperer elements de sessions !!

router.get('/', function(req, res, next){
    res.render('homepage');
    box.session = req.session;
    console.log('from homepage: ' + box.session.login);
})

module.exports = router;
